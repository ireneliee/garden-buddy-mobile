import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ShopApi } from "../api/Api";
const Shop = () => {
  const [accessories, setAccessories] = useState([]);
  const [gardenBuddyPacks, setGardenBuddyPacks] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await ShopApi.getAllAccessories();
    console.log(response.data);
    setAccessories(response.data);

    const response2 = await ShopApi.getAllGardenBuddyPacks();
    console.log(response2.data);
    setGardenBuddyPacks(response2.data);
  };

  return (
    <View>
      <Text>This is your shop</Text>
      <>testest</>

      {accessories &&
        accessories.map((acc) => {
          return <>{acc.id}</>;
        })}

      {gardenBuddyPacks &&
        gardenBuddyPacks.map((pack) => {
          return <>{pack.id}</>;
        })}
    </View>
  );
};

export default Shop;
