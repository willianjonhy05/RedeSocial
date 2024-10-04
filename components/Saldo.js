import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SaldoInfo({ saldo, receitasTotais, despesasTotais }) {
    return (
        <View>
            <Text style={styles.title}>Saldo Atual</Text>
            <Text style={[styles.saldo, { color: saldo > 0 ? 'green' : 'red' }]}>
                R$ {saldo.toFixed(2)}
            </Text>
            <Text style={styles.label}>Receitas Totais: R$ {receitasTotais}</Text>
            <Text style={styles.label}>Despesas Totais: R$ {despesasTotais}</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
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
});
