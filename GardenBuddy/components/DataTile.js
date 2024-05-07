import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Tile = ({
  name,
  currentValue,
  currentUnit,
  idealValue,
  idealUnit,
  onAlert,
  threshold,
  haveIdeal,
}) => {
  let tileStyle = null;
  if (haveIdeal && currentValue != null && name != "PH") {
    tileStyle =
      currentValue < idealValue - threshold ? styles.redTile : styles.greenTile;
  } else if (haveIdeal && currentValue != null && name == "PH") {
    tileStyle =
      currentValue > idealValue - threshold ? styles.redTile : styles.greenTile;
  } else {
    tileStyle = styles.greenTile;
  }

  useEffect(() => {
    if (currentValue !== idealValue) {
      onAlert && onAlert();
    }
  }, [currentValue, idealValue, onAlert]);

  return (
    <View style={[styles.tile, tileStyle]}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.currentValue}>
        {currentValue} {currentUnit}
      </Text>
      {haveIdeal && (
        <Text style={styles.idealValue}>
          Ideal: {idealValue} {idealUnit}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: "45%",
    margin: "2.5%",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  currentValue: {
    fontSize: 20,
    marginBottom: 5,
  },
  idealValue: {
    fontSize: 14,
  },
  greenTile: {
    backgroundColor: "#2ECC71",
  },
  redTile: {
    backgroundColor: "#E74C3C",
  },
});

export default Tile;