import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation, setIsLoggedIn }) {
    const [saldo, setSaldo] = useState(0.25);
    const handleLogout = () => {
        setIsLoggedIn(false);
        navigation.replace('Welcome');
    };

    return (


        <View style={styles.container}>
            <Text style={styles.title}>Saldo Atual</Text>
            <Text style={[styles.saldo, { color: saldo > 0 ? 'green' : 'red' }]}>
                R$ {saldo.toFixed(2)}
            </Text>
            <Text style={styles.label}>Receitas Totais: R$ { }</Text>
            <Text style={styles.label}>Despesas Totais: R$ { }</Text>
            <StatusBar style="auto" />

            <View style={styles.containerButton}>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Receitas')}>
                    <Text style={styles.textButton}>Nova Receita</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Despesas')}>
                    <Text style={styles.textButton}>Nova Despesa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.textButton}>Logout</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
      },
      title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
      saldo: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',

      },
      label: {
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center'
      },
      containerButton:{
        display: 'flex',
        flexDirection: 'row',
        
      },
      button: {
        width: '30%',
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5
      },
      textButton: {
        color: "#fff",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15
      }
});
