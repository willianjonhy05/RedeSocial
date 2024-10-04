import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Não se esqueça de limpar o storage no logout
import { FlatList } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation, setIsLoggedIn }) {
    const [saldo, setSaldo] = useState(0.25);
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [novaMovimentacao, setNovaMovimentacao] = useState('');

    // Carregar movimentações do AsyncStorage quando a tela é montada
    useEffect(() => {
        const carregarMovimentacoes = async () => {
            const salvarMovimentacoes = await AsyncStorage.getItem('MovimentacoesFinanceiras');

            if (salvarMovimentacoes) {
                setMovimentacoes(JSON.parse(salvarMovimentacoes));
            }
        };
        carregarMovimentacoes();
    }, []);

    const AddMovimentacoes = async () => {
        if (novaMovimentacao.trim() === '') return; // Prevenir entradas vazias
        const atualizarMovimentacoes = [...movimentacoes, novaMovimentacao];
        setMovimentacoes(atualizarMovimentacoes);
        setNovaMovimentacao('');
        await AsyncStorage.setItem('MovimentacoesFinanceiras', JSON.stringify(atualizarMovimentacoes));
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('loggedIn'); // Limpa o status de login no AsyncStorage
        setIsLoggedIn(false); // Atualiza o estado global de login
        navigation.replace('Welcome'); // Navega para a tela de boas-vindas
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Saldo Atual</Text>
            <Text style={[styles.saldo, { color: saldo > 0 ? 'green' : 'red' }]}>
                R$ {saldo.toFixed(2)}
            </Text>
            <Text style={styles.label}>Receitas Totais: R$ {}</Text>
            <Text style={styles.label}>Despesas Totais: R$ {}</Text>
            <StatusBar style="auto" />

            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={AddMovimentacoes}>
                    <Text style={styles.textButton}>Nova Receita</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Despesas')}>
                    <Text style={styles.textButton}>Nova Despesa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.textButton}>Logout</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.ContainerList}>
                <TextInput
                    style={styles.Input}
                    placeholder='Nova Entrada'
                    value={novaMovimentacao}
                    onChangeText={setNovaMovimentacao}
                />
            </View>


            <FlatList
                data={movimentacoes}
                renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />

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
        textAlign: 'center',
    },
    containerButton: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        width: '32%',
        marginVertical: 10,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    textButton: {
        color: "#fff",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    ContainerList: {
        justifyContent: 'center',
        marginTop: 20,
    },
    Input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});
