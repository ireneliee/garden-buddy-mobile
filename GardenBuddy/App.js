import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import MainHeader from "./components/MainHeader";
import MenuBar from "./components/MenuBar";
import PlantGallery from "./pages/PlantGallery";
import Shop from "./pages/Shop";
import Profile from "./pages/Profile";
import Toast from "react-native-toast-message";

export default function App() {
  const [selectedSection, setSelectedSection] = useState("Plants");
  const [cart, setCart] = useState({});

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

  const renderSection = () => {
    switch (selectedSection) {
      case "Plants":
        return <PlantGallery></PlantGallery>;
      case "Shop":
        return (
          <Shop addToCart={addToCart} removeFromCart={removeFromCart}></Shop>
        );
      case "Profile":
        return <Profile></Profile>;
      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <MainHeader></MainHeader>
        <MenuBar onSelect={(item) => setSelectedSection(item)} />
        <View>{renderSection()}</View>
      </View>
      <Toast />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
