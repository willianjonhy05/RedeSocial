import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Não se esqueça de limpar o storage no logout
import { FlatList } from 'react-native-gesture-handler';
import MeuBotao from '../components/MeuBotao';
import MeuInput from '../components/MeuInput';
import { carregarMovimentacoes, AddMovimentacoes, handleLogout } from '../utils/funcoesMovimentacoes';
import SaldoInfo from '../components/Saldo';

export default function HomeScreen({ navigation, setIsLoggedIn }) {
    const [saldo, setSaldo] = useState(0.25);
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [novaMovimentacao, setNovaMovimentacao] = useState('');
    const [receitasTotais, setReceitasTotais] = useState(0)
    const [despesasTotais, setDespesasTotais] = useState(0)

    // Carregar movimentações do AsyncStorage quando a tela é montada
    useEffect(() => {
        carregarMovimentacoes(setMovimentacoes);
    }, []);



    return (
        <ScrollView style={styles.container}>
            <SaldoInfo saldo={saldo} receitasTotais={receitasTotais} despesasTotais={despesasTotais} />

            <View style={styles.containerButton}>
                <MeuBotao
                    title="Nova Receita"
                    onPress={() => AddMovimentacoes(novaMovimentacao, movimentacoes, setMovimentacoes, setNovaMovimentacao)}
                />
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Despesas')}>
                    <Text style={styles.textButton}>Nova Despesa</Text>
                </TouchableOpacity>
                <MeuBotao
                    title="Logout"
                    onPress={() => handleLogout(setIsLoggedIn, navigation)}
                />
            </View>

            <View style={styles.ContainerList}>
                <MeuInput
                    value={novaMovimentacao}
                    onChangeText={setNovaMovimentacao}
                    placeholder="Nova Entrada"
                />
            </View>


            <FlatList
                data={movimentacoes}
                renderItem={({ item }) => <Text style={styles.item}>R$ {item}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,

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
        width: "95%",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    item: {
        fontSize: 18,
        marginTop: 10,
    }
});
