import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import MainHeader from "./components/MainHeader";
import MenuBar from "./components/MenuBar";
import PlantGallery from "./pages/PlantGallery";
import Shop from "./pages/Shop";
import Profile from "./pages/Profile";
import Toast from "react-native-toast-message";
import { UserApi } from "./api/Api";
import FlashMessage, { showMessage } from "react-native-flash-message";
import Buddy from "./pages/Buddy";

export default function App() {
  const [selectedSection, setSelectedSection] = useState("GardenBuddy");
  const [cart, setCart] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const onPressLogin = () => {
    UserApi.userLogin(username, password).then((response) => {
      showMessage({
        message: "Hello flashbars!",
      });
      setIsLoggedIn(true);
      setUserId(response.data.user_id);
    });
  };
  const onPressForgotPassword = () => {
    // Do something about forgot password operation
  };
  const onPressSignUp = () => {
    // Do something about signup operation
    setModalVisible(true);
  };

  const addToCart = (productId, quantity) => {
    if (cart[productId]) {
      setCart((prevCart) => ({
        ...prevCart,
        [productId]: prevCart[productId] + quantity,
      }));
    } else {
      setCart((prevCart) => ({
        ...prevCart,
        [productId]: quantity,
      }));
    }
    console.log(cart);
  };

  const removeFromCart = (productId) => {
    if (cart[productId]) {
      if (cart[productId] === 1) {
        const newCart = { ...cart };
        delete newCart[productId];
        setCart(newCart);
      } else {
        setCart((prevCart) => ({
          ...prevCart,
          [productId]: prevCart[productId] - 1,
        }));
      }
    }
    console.log(cart);
  };

  const resetCart = () => {
    setCart({});
  };

  const renderSection = () => {
    switch (selectedSection) {
      // case "Plants":
      //   return <PlantGallery userId={userId}></PlantGallery>;
      case "GardenBuddy":
        return <Buddy userId={userId}></Buddy>;
      case "Shop":
        return (
          <Shop
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cart={cart}
            userId={userId}
            resetCart={resetCart}
          ></Shop>
        );
      case "Profile":
        return <Profile userId={userId}></Profile>;
      default:
        return null;
    }
  };

  const createNewUser = (username, password, firstname, lastname) => {
    UserApi.createUser(username, password, firstname, lastname).then(
      (response) => {
        setModalVisible(false);
      }
    );
  };

  return (
    <SafeAreaProvider>
      {!isLoggedIn && (
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to Garden Buddy!</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Username"
              placeholderTextColor="#003f5c"
              onChangeText={(username) => setUsername(username)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="#003f5c"
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressSignUp}>
            <Text style={styles.forgotAndSignUpText}>Signup</Text>
          </TouchableOpacity>
          <FlashMessage />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Sign Up Here!</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Username"
                    placeholderTextColor="#003f5c"
                    onChangeText={(username) => setUsername(username)}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    onChangeText={(password) => setPassword(password)}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="First Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(firstname) => setFirstName(firstname)}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Last Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(lastname) => setLastName(lastname)}
                  />
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() =>
                    createNewUser(username, password, firstname, lastname)
                  }
                >
                  <Text style={styles.textStyle}>Create Account</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
      {isLoggedIn && (
        <ScrollView>
          <MainHeader></MainHeader>
          <MenuBar onSelect={(item) => setSelectedSection(item)} />
          <View>{renderSection()}</View>
        </ScrollView>
      )}
      <Toast />
    </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//   },
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#27ae60",
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#B2BEB5",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgotAndSignUpText: {
    color: "black",
    fontSize: 16,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#2ecc71",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
