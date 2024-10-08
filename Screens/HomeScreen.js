import {View, ScrollView, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SaldoInfo from '../components/Saldo';
import MeuBotao from '../components/MeuBotao';
import Item from '../components/ItemMove';
import { carregarMovimentacoes, AddMovimentacoes, handleLogout } from '../utils/funcoesMovimentacoes';


export default function HomeScreen(){
    const [saldo, setSaldo] = useState(0.25);
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [novaMovimentacao, setNovaMovimentacao] = useState('');
    const [receitasTotais, setReceitasTotais] = useState(0)
    const [despesasTotais, setDespesasTotais] = useState(0)

    useEffect(() => {
        carregarMovimentacoes(setMovimentacoes);
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.box}>
            <SaldoInfo saldo={saldo} receitasTotais={receitasTotais} despesasTotais={despesasTotais} />
            </View>
            
            <MeuBotao
            style={styles.box2}
            text={'Movimentação'}
            title={'Movimentação'}
            />
            <Item preco={'-14.00'} nome={'Hambúrguer'}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        position: 'fixed',
        paddingTop: 38,
    },
    box: {
        width: 327,
        height: 102,
    },
})