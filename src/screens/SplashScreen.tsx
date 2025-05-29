import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ConstantImage } from '../utils/Images';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

function SplashScreen(): React.JSX.Element {
const { backgroundColor, textColor } = useTheme();
const navigation = useNavigation<SplashScreenNavigationProp>();

useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image source={ConstantImage.newReport} style={styles.icons}/>
      <Text style={[styles.text, { color: textColor }]}>Welcome to News Article</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16
  },
  icons : {
    width: 100,
    height: 100,

  }
});

export default SplashScreen;