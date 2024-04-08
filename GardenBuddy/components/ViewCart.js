import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import Toast from "react-native-toast-message";
import { ShopApi } from "../api/Api";

const ViewCart = ({
  addToCart,
  removeFromCart,
  cart,
  accessories,
  gardenBuddyPacks,
  handleDisplayCart,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [creditCard, setCreditCard] = useState("");
  const [cvv, setCVV] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");

  const handleCheckout = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setCreditCard("");
    setCVV("");
    setExpirationMonth("");
    setExpirationYear("");
    setIsModalVisible(false);
  };

  const getItemInfo = (id) => {
    const item = accessories.find((acc) => acc.id.toString() === id.toString());
    if (item) {
      return item;
    }
    return gardenBuddyPacks.find(
      (pack) => pack.id.toString() === id.toString()
    );
  };

  const getTotalPrice = () => {
    let total = 0;
    Object.keys(cart).forEach((item) => {
      const cartItem = getItemInfo(item);
      total += cartItem.price * cart[item];
    });
    return total.toFixed(2);
  };

  const handleValidation = () => {
    const creditCardRegex = /^[0-9]{16}$/;
    const cvvRegex = /^[0-9]{3}$/;
    const expirationRegex = /^[0-9]{4}$/;
    if (!creditCardRegex.test(creditCard)) {
      Toast.show({
        type: "fail",
        text1: "Error",
        text2:
          "Invalid credit card number. Please enter a valid 16-digit number.",
      });
      return false;
    }
    if (!cvvRegex.test(cvv)) {
      Toast.show({
        type: "fail",
        text1: "Error",
        text2: "Invalid CVV. Please enter a valid 3-digit number.",
      });
      return false;
    }
    if (!expirationRegex.test(expirationMonth + expirationYear)) {
      Toast.show({
        type: "fail",
        text1: "Error",
        text2: "Invalid expiration date. Please enter a valid 4-digit number.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      const lineItems = convertCartToLineItems(cart);
      ShopApi.createOrder(lineItems, 1); //TO CHANGE USER ID WHEN WE PASS DOWN AFTER LOGIN IS PUSHED
      handleCloseModal();
    }
  };

  const convertCartToLineItems = (cart) => {
    const lineItems = [];
    Object.keys(cart).forEach((id) => {
      lineItems.push([parseInt(id), cart[id]]);
    });
    return lineItems;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => handleDisplayCart()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={Object.keys(cart)}
        renderItem={({ item, index }) => {
          const cartItem = getItemInfo(item);
          return (
            <View style={styles.item}>
              <Text style={styles.rowNumber}>{index + 1}</Text>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{cartItem.name}</Text>
                <Text style={styles.itemDescription}>
                  {cartItem.description}
                </Text>
                <Text style={styles.itemPrice}>Price: ${cartItem.price}</Text>
                <Text style={styles.itemQuantity}>Quantity: {cart[item]}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(cartItem.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      {Object.keys(cart).length === 0 ? (
        <Text style={styles.emptyCartMessage}>Your cart is empty</Text>
      ) : null}
      <TouchableOpacity
        style={[
          styles.checkoutButton,
          Object.keys(cart).length === 0 && styles.disabledCheckoutButton,
        ]}
        onPress={handleCheckout}
        disabled={Object.keys(cart).length === 0}
      >
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
      <Text style={styles.totalPrice}>Total Price: ${getTotalPrice()}</Text>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Enter Credit Card Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Credit Card Number"
              onChangeText={(text) => setCreditCard(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="CVV"
              onChangeText={(text) => setCVV(text)}
            />
            <View style={styles.expirationInputContainer}>
              <TextInput
                style={[styles.input, styles.expirationInput]}
                placeholder="MM"
                onChangeText={(text) => setExpirationMonth(text)}
                maxLength={2}
              />
              <Text style={styles.slash}>/</Text>
              <TextInput
                style={[styles.input, styles.expirationInput]}
                placeholder="YY"
                onChangeText={(text) => setExpirationYear(text)}
                maxLength={2}
              />
            </View>
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#2ECC71",
    width: 80,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2ECC71",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  rowNumber: {
    fontSize: 16,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 16,
  },
  removeButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  emptyCartMessage: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#ff0000",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  checkoutButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  disabledCheckoutButton: {
    backgroundColor: "#ccc",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#007bff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 20,
  },
  expirationInputContainer: {
    flexDirection: "row",
  },
  expirationInput: {
    flex: 1,
    marginRight: 5,
  },
  slash: {
    alignSelf: "center",
    fontSize: 20,
    marginHorizontal: 5,
  },
});

export default ViewCart;
