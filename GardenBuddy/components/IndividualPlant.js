import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Card, Button, Icon } from '@rneui/themed';
import GardenList from '../data/GardenList';

const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth * 0.5 - 20;

const IndividualPlant = ({ plantId }) => {
    var plantDataFiltered = GardenList.filter(item => item.gardenId == plantId);
    var plantData = plantDataFiltered[0];

    if (!plantData) {
        return null;
    }

    return (
        <ScrollView>
            <Card style={styles.itemContainer}>
                <Image source={plantData.imageLink} style={styles.itemImage} />
                <Card.Divider></Card.Divider>
                <Card.Title >{plantData.plantName}</Card.Title>
            </Card>
            <Card>
                <Card.Title>Soil Moisture Level</Card.Title>
                <Text style = {styles.numericalValue}>0.00 %</Text>
            </Card>
            <Card>
                <Card.Title>Soil pH Level</Card.Title>
                <Text style = {styles.numericalValue}>0.00 pH</Text>
            </Card>
            <Card>
                <Card.Title>Air Temperature</Card.Title>
                <Text style = {styles.numericalValue}>0.00 °C</Text>
            </Card>
            <Card>
                <Card.Title>Soil Salinity Level</Card.Title>
                <Text style = {styles.numericalValue}>0.00 mS/cm</Text>
            </Card>
        </ScrollView>
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
        height: 200,
        marginBottom: 5,
      },

    numericalValue: {
        textAlign: 'center',
        fontSize: '50rem',
    }
});

export default IndividualPlant;