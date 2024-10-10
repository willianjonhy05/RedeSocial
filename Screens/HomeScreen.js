import { View, SectionList, Text, StyleSheet, ScrollView } from 'react-native';
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
            const data = movimentacao.data; // Campo 'data' no formato 'DD/MM/AAAA'

            // Verificar se a data está no formato esperado
            const [dia, mes, ano] = data.split('/');
            const dataFormatada = `${ano}-${mes}-${dia}`; // Formatar para 'AAAA-MM-DD' para facilitar ordenação

            if (!acc[dataFormatada]) {
                acc[dataFormatada] = [];
            }
            acc[dataFormatada].push(movimentacao);
            return acc;
        }, {});

        // Transformar o objeto em um array de seções e ordenar por data
        return Object.keys(grupos)
            .sort((a, b) => new Date(b) - new Date(a))
            .map((dataFormatada) => {
                const [ano, mes, dia] = dataFormatada.split('-');
                const dataOriginal = `${dia}/${mes}/${ano}`; // Voltar ao formato 'DD/MM/AAAA'
                return {
                    title: dataOriginal,
                    data: grupos[dataFormatada],
                };
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <SaldoInfo saldo={saldo} receitasTotais={receitasTotais} despesasTotais={despesasTotais} />
            </View>

            {/* Passa a função handleNovaMovimentacao como prop */}
            <AddMMovimentacao handleNovaMovimentacao={handleNovaMovimentacao} />

            <ScrollView>
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
            </ScrollView>
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
