import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { movimentacao } from '../utils/moks';

export default function Item({ preco, nome, tipo}) {

    const validacao = tipo ==='despesa' ? `- R$ ${preco}` : `+ R$ ${preco}`;

    return (
        <View style={styles.container}>
            <Text style={styles.preco}>{validacao}</Text>
            <Text style={styles.divider}>|</Text>
            <Text style={styles.nome}>{nome}</Text>
            <FontAwesome style={styles.circle} name="circle" size={24} color={ tipo === 'despesa' ? '#ff7675' : '#00b894'} />
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
        marginVertical: 10,
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
