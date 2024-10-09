import { View, SectionList, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SaldoInfo from '../components/Saldo';
import Item from '../components/ItemMove';
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
        const novasMovimentacoes = [...movimentacoes, novaMovimentacao];
        setMovimentacoes(novasMovimentacoes);

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

        await AsyncStorage.setItem('movimentacoes', JSON.stringify(novasMovimentacoes));
    };

    // Função para agrupar movimentações por data
    const agruparMovimentacoesPorData = () => {
        const grupos = movimentacoes.reduce((acc, movimentacao) => {
            const data = movimentacao.data; // Supondo que o campo 'data' esteja em formato 'DD/MM/YYYY'
            if (!acc[data]) {
                acc[data] = [];
            }
            acc[data].push(movimentacao);
            return acc;
        }, {});

        // Transformar o objeto em um array de seções
        return Object.keys(grupos).sort((a, b) => new Date(b) - new Date(a)).map((data) => ({
            title: data,
            data: grupos[data],
        }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <SaldoInfo saldo={saldo} receitasTotais={receitasTotais} despesasTotais={despesasTotais} />
            </View>

            {/* Passa a função handleNovaMovimentacao como prop */}
            <AddMMovimentacao handleNovaMovimentacao={handleNovaMovimentacao} />

            <SectionList
                sections={agruparMovimentacoesPorData()}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Item
                        preco={item.valor}
                        nome={item.descricao}
                        tipo={item.tipo}
                    />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
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
    header: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 20,
        backgroundColor: '#f4f4f4',
        paddingVertical: 2,
        paddingHorizontal: 5,
        alignSelf: 'stretch',
        textAlign: 'left',
    },
});
