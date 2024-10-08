import React, { useState , useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
import ReceitasScreen from './Screens/ReceitasScreen';
import DespesasScreen from './Screens/DespesasScreen';
import * as SplashScreen from 'expo-splash-screen'

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() =>{
    setTimeout(async ()=> {
      await SplashScreen.hideAsync();
    },3000)
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Receitas">
          {props => <ReceitasScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Despesas">
          {props => <DespesasScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
