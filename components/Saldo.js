import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SaldoInfo({ saldo, receitasTotais, despesasTotais }) {
    return (
        <View style={[ styles.saldoContainer,{backgroundColor : saldo <  0 ? '#ff7675' : '#00b894'}]}>
            <Text style={styles.title}>Saldo Atual</Text>
            <Text style={styles.saldo}>
                R$ {saldo.toFixed(2)}
            </Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    saldoContainer: {
        borderRadius: 8,
        paddingVertical: 27,
    },
    title: {
        fontSize: 14,
        // opacity: 0.65,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#333638'
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
