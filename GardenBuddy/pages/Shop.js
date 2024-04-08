import React, { useEffect, useState } from "react";
import { ShopApi } from "../api/Api";
import { ButtonGroup, Icon, Image } from "react-native-elements";
import ShopListing from "../components/ShopListing";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import QuantitySelector from "../components/QuantitySelector";
import Toast from "react-native-toast-message";
import ViewCart from "../components/ViewCart";

const Shop = ({ addToCart, removeFromCart, cart, userId, resetCart }) => {
  const [accessories, setAccessories] = useState([]);
  const [gardenBuddyPacks, setGardenBuddyPacks] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedListing, setSelectedListing] = useState(-1);
  const [displayCart, setDisplayCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const imageWidth = windowWidth * 0.9;
  const imageHeight = windowHeight * 0.4;
  const placeHolderLink = require("../assets/plantPlaceholder.jpg");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await ShopApi.getAllAccessories();
    setAccessories(response.data);

    const response2 = await ShopApi.getAllGardenBuddyPacks();
    setGardenBuddyPacks(response2.data);
  };

  function selectListingToView(listingId) {
    setSelectedListing(listingId);
  }

  const handleAddToCart = () => {
    if (selectedListing !== -1) {
      addToCart(selectedListing.id, quantity);
      Toast.show({
        type: "success",
        text1: "Success",
        text2:
          "Added " + quantity + "x " + selectedListing.name + " to the cart!",
      });
    }
  };

  const handleDisplayCart = () => {
    setDisplayCart(!displayCart);
  };

  return (
    <>
      {!displayCart && (
        <>
          {selectedListing === -1 && (
            <View style={[styles.header, { justifyContent: "flex-end" }]}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleDisplayCart}
              >
                <Icon name="shopping-cart" size={24} color="#2ECC71" />
              </TouchableOpacity>
            </View>
          )}

          {selectedListing !== -1 && (
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => selectListingToView(-1)}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={handleDisplayCart}
              >
                <Icon name="shopping-cart" size={24} color="#2ECC71" />
              </TouchableOpacity>
            </View>
          )}
          {selectedListing === -1 && (
            <>
              <ButtonGroup
                buttons={["View Packs", "View Accessories"]}
                selectedIndex={selectedTab}
                onPress={(value) => {
                  setSelectedTab(value);
                }}
                containerStyle={{ marginBottom: 20, height: 50 }}
              />

              {selectedTab === 0 && (
                <ShopListing
                  shopItemList={gardenBuddyPacks}
                  onSelectListing={selectListingToView}
                />
              )}
              {selectedTab === 1 && (
                <ShopListing
                  shopItemList={accessories}
                  onSelectListing={selectListingToView}
                />
              )}
            </>
          )}
          {selectedListing !== -1 && (
            <>
              <View style={styles.container}>
                <Text style={styles.name}>{selectedListing.name}</Text>
                <Image
                  source={placeHolderLink}
                  style={[
                    { width: imageWidth, height: imageHeight, margin: "auto" },
                  ]}
                  resizeMode="contain"
                />
                <Text style={styles.description}>
                  {selectedListing.description}
                </Text>
                <Text style={styles.price}>
                  Price: ${selectedListing.price}
                </Text>

                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>Quantity:</Text>
                  <QuantitySelector
                    initialValue={1}
                    maxQuantity={selectedListing.quantity}
                    onChange={setQuantity}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#007bff" }]}
                  onPress={handleAddToCart}
                >
                  <Text style={[styles.buttonText, { color: "#fff" }]}>
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
      )}
      {displayCart && (
        <>
          <ViewCart
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cart={cart}
            accessories={accessories}
            gardenBuddyPacks={gardenBuddyPacks}
            handleDisplayCart={handleDisplayCart}
            userId={userId}
            resetCart={resetCart}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    marginRight: 10,
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
});

export default Shop;
