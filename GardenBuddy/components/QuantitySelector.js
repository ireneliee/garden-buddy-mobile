import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const QuantitySelector = ({ initialValue, maxQuantity, onChange }) => {
  const [quantity, setQuantity] = useState(initialValue);

  const handleIncrement = () => {
    if (quantity + 1 < maxQuantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      onChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      onChange(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="-" onPress={handleDecrement} />
      <Text style={styles.quantity}>{quantity}</Text>
      <Button title="+" onPress={handleIncrement} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default QuantitySelector;
