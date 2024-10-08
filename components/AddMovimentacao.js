import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, Pressable, View, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';



export default function AddMMovimentacao({ handleNovaMovimentacao }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('');


    const handleCadastrar = () => {


        if (!descricao || !data || !hora || !valor || !tipo) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos antes de cadastrar a movimentação.');
            return; // Impede que a movimentação seja cadastrada se faltar algum campo
        }


        // Lógica para cadastrar a movimentação
        const novaMovimentacao = {
            descricao,
            data,
            hora,
            valor,
            tipo
        };

        // Enviar a nova movimentação para o componente pai
        handleNovaMovimentacao(novaMovimentacao);

        // Limpar campos e fechar o modal
        setDescricao('');
        setData('');
        setHora('');
        setValor('');
        setTipo('');
        setModalVisible(false);
    };
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been fechado.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.fullScreenView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Nova Movimentação</Text>

                        <Text style={styles.textLabel}>Descrição</Text>
                        <TextInput
                            style={styles.meuInput}
                            onChangeText={setDescricao}
                            value={descricao}
                            placeholder="Digite a descrição"
                        />

                        <View style={styles.botaoDuplo}>
                            <View style={styles.formUm}>
                                <Text style={styles.textLabel}>Data</Text>
                                <TextInput
                                    style={styles.meuInput}
                                    onChangeText={setData}
                                    value={data}
                                    placeholder="dd/mm/aaaa"
                                />
                            </View>
                            <View style={styles.formUm}>
                                <Text style={styles.textLabel}>Hora</Text>
                                <TextInput
                                    style={styles.meuInput}
                                    onChangeText={setHora}
                                    value={hora}
                                    placeholder="hh:mm"
                                />
                            </View>
                        </View>

                        <Text style={styles.textLabel}>Valor</Text>
                        <TextInput
                            style={styles.meuInput}
                            onChangeText={setValor}
                            value={valor}
                            placeholder="R$ 0,00"
                            keyboardType="numeric"
                        />

                        <Text style={styles.textLabel}>Tipo</Text>
                        <View style={styles.tipoContainer}>
                            <Pressable
                                style={[styles.buttonTipo, tipo === 'receita' && styles.selectedButton]}
                                onPress={() => setTipo('receita')}>
                                <Text style={[styles.textButtonSelect, tipo === 'receita' && styles.selectedText]}>
                                    Receita <FontAwesome name="circle" size={24} color="green" />
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[styles.buttonTipo, tipo === 'despesa' && styles.selectedButton]}
                                onPress={() => setTipo('despesa')}>
                                <Text style={[styles.textButtonSelect, tipo === 'despesa' && styles.selectedText]}>
                                    Despesa <FontAwesome name="circle" size={24} color="red" />
                                </Text>
                            </Pressable>
                        </View>

                        {/* Botões na parte inferior */}
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={styles.buttonCadastrar}
                                onPress={handleCadastrar}>
                                <Text style={styles.textButton}>Cadastrar</Text>
                            </Pressable>

                            <Pressable
                                style={styles.buttonClose}
                                onPress={() => setModalVisible(false)}>
                                <Text style={styles.textButton}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

                <View style={styles.box2}>
                <Text style={styles.title}>Movimentação</Text>
                <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textButton}><AntDesign name="plus" size={18} color="white" /> Movimentação</Text>
                </TouchableOpacity>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        flex: 1,
        padding: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        padding: 30,
    },
    botaoDuplo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    formUm: {
        width: '48%',
    },
    buttonContainer: {
        margin: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 30,
    },
    buttonClose: {
        backgroundColor: 'red',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonCadastrar: {
        backgroundColor: '#333638',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    textLabel: {
        fontSize: 16,
        color: '#333638',
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    meuInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        width: '100%',
    },
    tipoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 5,
    },
    buttonTipo: {
        flex: 1,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#EFF0F0',
        alignItems: 'center',
        marginHorizontal: 10,
        elevation: 2,
        width: '49%',
    },
    textButtonSelect: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedButton: {
        backgroundColor: '#333638',
    },
    title:{
        fontSize: 16,
    },
    button: {
        marginVertical: 5,
        width: 327,
        height: 50,
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
        marginTop: 30,
    },
});
