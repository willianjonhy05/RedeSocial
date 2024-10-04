import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function MeuBotao({ title, onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.textButton}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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
});
