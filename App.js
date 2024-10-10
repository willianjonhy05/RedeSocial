import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
import ReceitasScreen from './Screens/ReceitasScreen';
import DespesasScreen from './Screens/DespesasScreen';
import * as SplashScreen from 'expo-splash-screen';
import { TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { handleLogout } from './utils/funcoesMovimentacoes';

const Stack = createStackNavigator();

// Prevenir a tela de splash de desaparecer automaticamente
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // UseEffect para garantir que a tela de splash seja escondida após 3 segundos
  useEffect(() => {
    const hideSplashScreen = async () => {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 3000);
    };

    hideSplashScreen();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>

        <Stack.Screen
          name="Home"
          options={({ navigation }) => ({  // Acessando o navigation aqui
            title: 'Home',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => handleLogout(setIsLoggedIn, navigation)} // Passando navigation
                style={{ marginRight: 15 }}
              >
                <Text style={{ color: '#007AFF', fontSize: 16 }}>
                  <MaterialCommunityIcons name="logout" size={24} color="black" />
                </Text>
              </TouchableOpacity>
            ),
          })}
        >
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
