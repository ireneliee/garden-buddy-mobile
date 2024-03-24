import { Header } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SpeedDial } from '@rneui/themed';

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
    marginBottom: 10
  },
});

export default MainHeader;


