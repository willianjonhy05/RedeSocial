import React, { useEffect, useState } from 'react';
import { View, Text, TextInput,  StyleSheet, Alert, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconImage from '../assets/icon.png'


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Verifica se o usuário já está logado
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('loggedIn');
        if (loggedIn === 'true') {
          navigation.replace('Home');
        }
      } catch (error) {
        console.error("Erro ao verificar status de login:", error);
      }
    };
    checkLoginStatus();
  }, [navigation]);

  const handleLogin = async () => {
    if (email === 'admin@admin.com' && password === 'admin123') {
      try {
        await AsyncStorage.setItem('loggedIn', 'true');
        navigation.replace('Home');
      } catch (error) {
        console.error("Erro ao salvar status de login:", error);
        Alert.alert('Erro', 'Não foi possível efetuar o login.');
      }
    } else {
      Alert.alert('Erro', 'Email ou senha incorretos.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={IconImage} style={styles.image}/>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}><Text style={styles.text}>Login</Text></TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 70,
},
  title: {
    fontSize: 24,
    marginBottom:20,
    textAlign: 'center',
},
  input:{
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: '#ccc',
    width : '75%',
    marginVertical: 7,
},
   button : {
    marginTop: 16,
    backgroundColor: '#0984e3',
    width: '75%',
    alignItems: 'center',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
   },
   text :{
    color: 'white'
   },
   image: {
    width: 111,
    height: 143,
    bottom: 40,
   }
})