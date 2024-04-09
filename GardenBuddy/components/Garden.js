import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function Garden({ garden, gardenBuddy, userId, handleCloseViewGardenBuddy }) {
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
      Garden {garden.id}
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
});
export default Garden;
