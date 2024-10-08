import {View, Text, StyleSheet} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Item({preco, nome}){

    return(
        <View style={styles.container}>
        <Text style={styles.preco}>{preco}</Text>
        <Text style={styles.divider}>|</Text>
        <Text>{nome}</Text>
        <FontAwesome style={styles.circle} name="circle" size={24} color="#F3BABD" />
        </View>
    )
}

styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',  
        borderWidth: 1,
        borderColor: '#DDDEDF',
        width: 327,
        height: 49,
        borderRadius: 6,
        
    },

    preco :{
        fontWeight: 'bold',
    },
    divider : {
        color: "#B9BBBC",
    },
    circle:{
        flexDirection: 'column',
        alignContent: 'flex-end',
    }

})