import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MainHeader from './components/MainHeader';
import MenuBar from './components/MenuBar';
import PlantGallery from './pages/PlantGallery';
import Shop from './pages/Shop';
import Profile from './pages/Profile';

export default function App() {

  const [selectedSection, setSelectedSection] = useState('Plants');

  const renderSection = () => {
    switch (selectedSection) {
      case 'Plants':
        return <PlantGallery></PlantGallery>;
      case 'Shop':
        return <Shop></Shop>;
      case 'Profile':
        return <Profile></Profile>;
      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <MainHeader></MainHeader>
        <MenuBar onSelect = {(item) => setSelectedSection(item)}/>
        <View>
          {renderSection()}
        </View>
      </View>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
