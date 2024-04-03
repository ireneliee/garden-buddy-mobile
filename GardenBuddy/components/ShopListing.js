import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Card } from "@rneui/themed";

const ShopListing = ({ shopItemList, onSelectListing }) => {
  const windowWidth = Dimensions.get("window").width;
  const cardWidth = windowWidth / 2 - 20;
  const cardHeight = cardWidth * 1;
  const imageWidth = cardWidth * 0.9;
  const imageHeight = cardHeight * 0.9;
  const placeHolderLink = require("../assets/plantPlaceholder.jpg");
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingTop: 10,
    },
    itemContainer: {
      flex: 1,
      margin: 5,
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      width: cardWidth,
      height: cardHeight,
      justifyContent: "center",
      alignItems: "center",
    },
    itemImage: {
      marginBottom: 10,
    },
    itemDetails: {
      flex: 1,
      alignItems: "center",
    },
    itemName: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
      textAlign: "center",
    },
    itemDescription: {
      marginBottom: 5,
      textAlign: "center",
    },
    itemPrice: {
      fontWeight: "bold",
      marginBottom: 5,
    },
    itemQuantity: {
      fontStyle: "italic",
    },
  });
  const handleSelect = (id) => {
    onSelectListing(id);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelect(item)}>
      <Card containerStyle={styles.itemContainer}>
        <Image
          source={placeHolderLink}
          style={[
            styles.itemImage,
            { width: imageWidth, height: imageHeight, margin: "auto" },
          ]}
          resizeMode="contain"
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>Price: ${item.price}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={shopItemList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
};

export default ShopListing;
