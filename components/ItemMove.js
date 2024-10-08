import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Item({ preco, nome }) {
    return (
        <View style={styles.container}>
            <Text style={styles.preco}>{preco}</Text>
            <Text style={styles.divider}>|</Text>
            <Text style={styles.nome}>{nome}</Text>
            <FontAwesome style={styles.circle} name="circle" size={24} color="#F3BABD" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#DDDEDF',
        width: 327,
        height: 49,
        borderRadius: 6,
        paddingHorizontal: 10, // Adicionado para espaçamento interno
    },
    preco: {
        fontWeight: 'bold',
        marginRight: 7, // Espaçamento de 7px entre o preço e o divisor
    },
    divider: {
        color: "#B9BBBC",
        marginHorizontal: 5, // Espaçamento de 7px entre o divisor e o nome
    },
    nome: {
        flex: 1, // Faz o nome ocupar o espaço disponível
    },
    circle: {
        marginLeft: 'auto', // Garante que o ícone fique totalmente à direita
    }
});
