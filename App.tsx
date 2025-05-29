/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import DetailedScreen from './src/screens/DetailedScreen';
import { ConstantImage } from './src/utils/Images';


export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Detail: {
    article: {
      title: string;
      source: { name: string };
      publishedAt: string;
      urlToImage?: string;
      description?: string;
      content?: string;
    };
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} 
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Article',
            headerLeft: () => null,
          })}/>
        <Stack.Screen name="Detail" component={DetailedScreen} 
          options={({ navigation }) => ({
          headerShown: true,
          title: 'Article Detail',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={ConstantImage.backArrow} style={styles.icons}/>
            </TouchableOpacity>
          ),
        })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  icons : {
    width: 24,
    height: 24
  }
});

export default App;
