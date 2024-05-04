import React, { useEffect, useState } from "react";
import { GardenApi } from "../api/Api";
import { StyleSheet, View, Text, Modal, TextInput } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";
import Garden from "../components/Garden";

const Buddy = ({ addToCart, removeFromCart, cart, userId, resetCart }) => {
  const [gardenBuddies, setGardenBuddies] = useState([]);
  const [gardens, setGardens] = useState([]);
  const [gardenTypes, setGardenTypes] = useState([]);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [addGardenModalVisible, setAddGardenModalVisible] = useState(false);
  const [serialId, setSerialId] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedBuddy, setSelectedBuddy] = useState(-1);
  const [selectedGardenBuddyToView, setSelectedGardenBuddyToView] =
    useState(-1);
  const [selectedGardenToView, setSelectedGardenToView] = useState(-1);

  useEffect(() => {
    if (userId) {
      getData();
    }
  }, [registerModalVisible, addGardenModalVisible]);

  const getData = async () => {
    try {
      const response = await GardenApi.getGardenBuddiesByUserId(userId);
      let gardenBuddiesData = response.data.reverse();
      setGardenBuddies(gardenBuddiesData);

      if (gardenBuddiesData.length > 0) {
        let lst = [];
        for (let i = 0; i < gardenBuddiesData.length; i++) {
          let buddyId = gardenBuddiesData[i].id;
          const response2 = await GardenApi.getGardenByGardenBuddyId(buddyId);
          lst.push(response2.data);
        }
        setGardens(lst);
      }

      const response3 = await GardenApi.getAllGardenTypes();
      setGardenTypes(response3.data);
      console.log(response3.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterBuddy = async () => {
    if (serialId.trim() === "" || serialId.length !== 8) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "The serial ID should be only 8 characters long!",
      });
      return;
    }

    try {
      const response = await GardenApi.registerGardenBuddy(userId, serialId);
      console.log(response.data);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "GardenBuddy is successfully registered!",
      });
    } catch (error) {
      console.log(error);
    }
    setSerialId("");
    setRegisterModalVisible(false);
  };

  const handleOpenAddGardenTypeModal = (buddyIdx) => {
    setAddGardenModalVisible(true);
    setSelectedBuddy(buddyIdx);
  };

  const handleCloseAddGardenTypeModal = () => {
    setAddGardenModalVisible(false);
    setSelectedBuddy();
  };

  const handleAddGardenToGardenBuddy = async () => {
    if (selectedOption < 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select an option!",
      });
      return;
    }

    try {
      const response = await GardenApi.createGarden(
        gardenBuddies[selectedBuddy].id,
        selectedOption
      );

      setSelectedBuddy(-1);
      setSelectedOption("");
      setAddGardenModalVisible(false);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Successfully added Garden!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenViewGardenBuddy = (idx) => {
    setSelectedGardenBuddyToView(gardenBuddies[idx]);
    setSelectedGardenToView(gardens[idx]);
  };

  const handleCloseViewGardenBuddy = () => {
    setSelectedGardenBuddyToView(-1);
    setSelectedGardenToView(-1);
  };

  return (
    <View style={styles.container}>
      {selectedGardenToView === -1 && (
        <>
          <Button
            icon={<Icon name="add" color="white" />}
            title="Register New Buddy"
            onPress={() => setRegisterModalVisible(true)}
            buttonStyle={styles.addButton}
          />
          {gardenBuddies.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Looks like you do not have a garden buddy registered yet!
              </Text>
            </View>
          )}
          {gardenBuddies.map((item, index) => (
            <Card key={index} containerStyle={styles.cardContainer}>
              <Card.Title>Garden Buddy {item.id}</Card.Title>
              <Card.Divider />
              <ListItem>
                <ListItem.Content>
                  <ListItem.Subtitle>
                    Registered on: {item.date_registered}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    Serial Id: {item.serial_id}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              {gardens[index] && Object.keys(gardens[index]).length !== 0 ? (
                <Button
                  title="View"
                  buttonStyle={styles.viewButton}
                  onPress={() => handleOpenViewGardenBuddy(index)}
                />
              ) : (
                <Button
                  icon={<Icon name="add" color="white" />}
                  title="Add Garden"
                  onPress={() => handleOpenAddGardenTypeModal(index)}
                  buttonStyle={styles.addButton}
                />
              )}
            </Card>
          ))}
          <Modal
            animationType="slide"
            transparent={true}
            visible={registerModalVisible}
            onRequestClose={() => setRegisterModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Register new Buddy</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Serial Id"
                  onChangeText={(text) => setSerialId(text)}
                  value={serialId}
                />

                <Button title="Register" onPress={handleRegisterBuddy} />
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={addGardenModalVisible}
            onRequestClose={handleCloseAddGardenTypeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add Garden</Text>

                <Picker
                  selectedValue={selectedOption}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedOption(itemValue)
                  }
                >
                  {gardenTypes.map((type, index) => (
                    <Picker.Item
                      key={index}
                      label={type.plant_name}
                      value={type.id}
                    />
                  ))}
                </Picker>

                <Button
                  title="Add"
                  onPress={() => handleAddGardenToGardenBuddy()}
                />
              </View>
            </View>
          </Modal>
        </>
      )}

      {selectedGardenToView !== -1 && (
        <>
          <Garden
            garden={selectedGardenToView}
            gardenBuddy={selectedGardenBuddyToView}
            userId={userId}
            handleCloseViewGardenBuddy={handleCloseViewGardenBuddy}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cart={cart}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
  },
  addButton: {
    marginBottom: 10,
    backgroundColor: "green",
  },
  cardContainer: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5, // Add elevation for a shadow effect
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: "80%",
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
  },
  picker: {
    width: "80%",
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Buddy;
