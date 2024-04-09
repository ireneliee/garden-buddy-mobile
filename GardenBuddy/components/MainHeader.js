
import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useState } from "react";


const MainHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogOut = () => {
    setIsLoggedIn(false);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/gardenBuddyLogo.png')} 
        style={{ width: 100, height: 50 }} 
      />
      {/* <button
        id="logout-button"
        onClick={onLogOut}
      >
        Log out
      </button> */}
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center'
  },
});

export default MainHeader;


