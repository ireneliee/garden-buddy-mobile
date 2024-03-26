
import { View, Text, Image, StyleSheet } from 'react-native';

const MainHeader = () => {
  
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/gardenBuddyLogo.png')} 
        style={{ width: 100, height: 50 }} 
      />

      
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


