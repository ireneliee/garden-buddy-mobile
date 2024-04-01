import React, { useEffect, useState } from "react";
import { ShopApi } from "../api/Api";
import { ButtonGroup } from "react-native-elements";
import ShopListing from "../components/ShopListing";

const Shop = () => {
  const [accessories, setAccessories] = useState([]);
  const [gardenBuddyPacks, setGardenBuddyPacks] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await ShopApi.getAllAccessories();
    setAccessories(response.data);

    const response2 = await ShopApi.getAllGardenBuddyPacks();
    setGardenBuddyPacks(response2.data);
  };

  return (
    <>
      <ButtonGroup
        buttons={["View Packs", "View Accessory"]}
        selectedIndex={selectedTab}
        onPress={(value) => {
          setSelectedTab(value);
        }}
        containerStyle={{ marginBottom: 20, height: 20 }}
      />

      {selectedTab === 0 && (
        <ShopListing
          shopItemList={gardenBuddyPacks}
          onSelectListing={(id) => postSelecting(id)}
        />
      )}
      {selectedTab === 1 && (
        <ShopListing
          shopItemList={accessories}
          onSelectListing={(id) => postSelecting(id)}
        />
      )}
    </>
  );
};

export default Shop;
