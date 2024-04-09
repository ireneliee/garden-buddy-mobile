import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const MenuBar = ({ onSelect }) => {
  const [selectedItem, setSelectedItem] = useState("Home");

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleSelect("GardenBuddy")}
      >
        <Text
          style={[
            styles.menuItemText,
            selectedItem === "GardenBuddy" && styles.selectedText,
          ]}
        >
          GardenBuddies
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleSelect("Shop")}
      >
        <Text
          style={[
            styles.menuItemText,
            selectedItem === "Shop" && styles.selectedText,
          ]}
        >
          Shop
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleSelect("Profile")}
      >
        <Text
          style={[
            styles.menuItemText,
            selectedItem === "Profile" && styles.selectedText,
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#2ecc71", // Green color
    borderTopWidth: 1,
    borderTopColor: "#27ae60", // Darker green for border
    paddingBottom: 10,
  },
  menuItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 16,
    color: "#fff", // White color for text
  },

  selectedText: {
    fontWeight: "bold",
  },
});

export default MenuBar;
