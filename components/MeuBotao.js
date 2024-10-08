import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MeuBotao({text, title, onPress }) {
    return (
        <View style={styles.box2}>
        <Text>{text}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <AntDesign name="plus" size={18} color="white" />
            <Text style={styles.textButton}>{title}</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    title:{
        fontSize: 16,
    },
    button: {
        width: 327,
        height: 50,
        marginVertical: 10,
        backgroundColor: '#333638',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    textButton: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 15,
    },
    box2:{
        marginTop: 55,
    }
});
