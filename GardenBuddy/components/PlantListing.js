import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Button, Icon } from '@rneui/themed';


const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth * 0.5 - 20;

const PlantListing = ({ gardenList, onSelectPlant }) => {
    const handleSelect = (id) => {
        onSelectPlant(id);
    };
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress = {() => handleSelect(item.gardenId)}>
            <Card style={styles.itemContainer}>
                <Image source={item.imageLink} style={styles.itemImage} />
                <Card.Divider></Card.Divider>
                <Card.Title>{item.plantName}</Card.Title>
            </Card>
        </TouchableOpacity>

    );
    return (
        <FlatList
            data={gardenList}
            renderItem={renderItem}
            keyExtractor={(item) => item.gardenId.toString()}
            numColumns={1}
        />
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: windowWidth,
    },
    itemImage: {
        width: '100%',
        height: 100,
        marginBottom: 5,
    },
});

export default PlantListing;