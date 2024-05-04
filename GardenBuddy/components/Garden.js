import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Tile } from 'react-native-elements';
import DataTile from "./DataTile";
import { DataApi } from "../api/Api";
import Toast from "react-native-toast-message";


function Garden({ garden, gardenBuddy, userId, handleCloseViewGardenBuddy, addToCart, removeFromCart, cart, resetCart}) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [fertiliserInCart, setFertiliserInCart] = useState(false);
  const [fertiliserId, setFertiliserId] = useState(0);


  useEffect(() => {
    console.clear()
    console.log("Setting interval for garden ID:", garden.id);
    const intervalId = setInterval(() => {
      console.log("Fetching data for garden ID:", garden.id);
      getData();
    }, 30000);  // Ensure this is 60000 milliseconds
  
    return () => {
      console.log("Clearing interval for garden ID:", garden.id);
      clearInterval(intervalId);
    };
  }, [garden.id]);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await DataApi.getUserGardenData(garden.id);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productId, quantity) => {
    if (!cart[productId]) {  // Check if the product is not already in the cart
      addToCart(productId, quantity);
      console.log(cart)
      console.log(fertiliserId)
      Toast.show({
        type: "success",
        text1: "Success",
        text2:
          "Added " + 1 + "x fertiliser to the cart!",
      });
    } else {
      setFertiliserInCart(true)
    }
  };

  
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCloseViewGardenBuddy}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {loading && !data && <ActivityIndicator size="large" color="#2ECC71" />}

        {data && (
          <>
            <DataTile
              name="Height"
              currentValue={data.curr_height}
              currentUnit="cm"
              idealValue={data.curr_height}
              idealUnit="cm"
            />
            <DataTile
              name="Temperature"
              currentValue={data.curr_temperature}
              currentUnit="°C"
              idealValue={data.ideal_temperature}
              idealUnit="°C"
            />
            <DataTile
              name="Moisture"
              currentValue={data.curr_moisture}
              currentUnit="%"
              idealValue={data.ideal_moisture}
              idealUnit="%"
            />
            <DataTile
              name="PH"
              currentValue={data.curr_ph}
              currentUnit="pH"
              idealValue={data.ideal_ph}
              idealUnit="pH"
              onAlert={() => {
                if (data.curr_ph != data.ideal_ph) {
                  let localFertiliserId;
                  if (data.ideal_ph < 6) {
                    localFertiliserId = 4;
                  } else if (data.ideal_ph > 8) {
                    localFertiliserId = 5;
                  } else {
                    localFertiliserId = 3;
                  }
                  const quantityToAdd = 1;
                  console.log(localFertiliserId);  // Log the ID to verify correct value
                  handleAddToCart(localFertiliserId, quantityToAdd);
                  setFertiliserId(localFertiliserId);
                } else if (data.curr_ph == data.ideal_ph){
                  // console.log(fertiliserId);  // Log the ID to verify correct value
                  // removeFromCart(fertiliserId)
                  fertiliserInCart(false)
                }
              }}
            />
            <DataTile
              name="Salinity"
              currentValue={data.curr_salinity}
              currentUnit="SA"
              idealValue={data.ideal_salinity}
              idealUnit="SA"
            />
            <DataTile
              name="Brightness"
              currentValue={data.curr_brightness}
              currentUnit="🔅"
              idealValue={data.curr_brightness}
              idealUnit="🔅"
            />
          </>
        )}
      </View>
      {fertiliserInCart && (
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>
              Your soil pH level is not ideal, fertiliser has been added to your cart!
            </Text>
          </View>
        )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#2ECC71",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2ECC71",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  messageBox: {
    backgroundColor: '#f0f4c3',  // Light green background for visibility
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cddc39',  // A lighter shade for the border
    marginHorizontal: 20,  // Adjusted to align with the grid of tiles
    marginTop: 20,  // Space from the nearest tile
    marginBottom: 10,  // Space from the bottom or next tile    
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'stretch',  // Stretch to align with other tiles width
    flexDirection: 'row',
    flexWrap: "wrap",

  },
  messageText: {
    color: '#33691e',  // Dark green text for contrast
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    flexDirection: 'row',
    flexWrap: "wrap",
  },
});

export default Garden;
