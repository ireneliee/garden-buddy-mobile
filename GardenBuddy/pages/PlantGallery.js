import React, { useState }  from 'react';
import PlantListing from '../components/PlantListing';
import IndividualPlant from '../components/IndividualPlant';
import { StyleSheet, View } from 'react-native';
import GardenList from '../data/GardenList';

const PlantGallery = () => {
    const [gallery, setGallery] = useState(true);
    const [chosenPlant, setChosenPlant] = useState(1);

    const postSelecting = (id) => {
        setChosenPlant(id);
        setGallery(false);
    };

    const renderSection = () => {
        if (gallery) {
            return <PlantListing gardenList = { GardenList } onSelectPlant = {(id) => postSelecting(id)} ></PlantListing>
        } else {
            return <IndividualPlant plantId = { chosenPlant }></IndividualPlant>
        }
      };

    return (
        <View>
          {renderSection()}
        </View>
    );
};


export default PlantGallery;