import { View, ScrollView, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SaldoInfo from '../components/Saldo';
import Item from '../components/ItemMove';
import { AddMovimentacoes, handleLogout } from '../utils/funcoesMovimentacoes';
import AddMMovimentacao from '../components/AddMovimentacao';


export default function HomeScreen() {
    const [saldo, setSaldo] = useState(0.25);
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [receitasTotais, setReceitasTotais] = useState(0);
    const [despesasTotais, setDespesasTotais] = useState(0);

    const carregarMovimentacoes = async () => {
        const armazenadas = await AsyncStorage.getItem('movimentacoes');
        if (armazenadas) {
            const movimentacoesSalvas = JSON.parse(armazenadas);
            setMovimentacoes(movimentacoesSalvas);
        }
    };

    useEffect(() => {
        carregarMovimentacoes(); 
    }, []);

    const handleNovaMovimentacao = async (novaMovimentacao) => {
        // Atualizar movimentações
        const novasMovimentacoes = [...movimentacoes, novaMovimentacao];
        setMovimentacoes(novasMovimentacoes);

        // Atualizar saldo, receitas e despesas
        if (novaMovimentacao.tipo === 'receita') {
            const novoSaldo = saldo + parseFloat(novaMovimentacao.valor);
            const novasReceitas = receitasTotais + parseFloat(novaMovimentacao.valor);
            setSaldo(novoSaldo);
            setReceitasTotais(novasReceitas);
        } else if (novaMovimentacao.tipo === 'despesa') {
            const novoSaldo = saldo - parseFloat(novaMovimentacao.valor);
            const novasDespesas = despesasTotais + parseFloat(novaMovimentacao.valor);
            setSaldo(novoSaldo);
            setDespesasTotais(novasDespesas);
        }

        // Salvar no AsyncStorage
        await AsyncStorage.setItem('movimentacoes', JSON.stringify(novasMovimentacoes));
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <SaldoInfo saldo={saldo} receitasTotais={receitasTotais} despesasTotais={despesasTotais} />
            </View>

            {/* Passa a função handleNovaMovimentacao como prop */}
            <AddMMovimentacao handleNovaMovimentacao={handleNovaMovimentacao} />


            <FlatList
            style={styles.lista}
                data={movimentacoes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Item
                        preco={item.valor}
                        nome={item.descricao}
                        tipo={item.tipo}
                    />
                )}
            />





        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 38,
    },
    box: {
        width: 327,
        height: 102,
    },
    lista: {
        marginTop: 30,
    }
});
