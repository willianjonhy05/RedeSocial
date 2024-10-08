import AsyncStorage from '@react-native-async-storage/async-storage';


export const AddMovimentacoes = async (novaMovimentacao, movimentacoes, setMovimentacoes, setNovaMovimentacao) => {
    if (novaMovimentacao.trim() === '') return; // Prevenir entradas vazias
    try {
        const atualizarMovimentacoes = [...movimentacoes, novaMovimentacao];
        setMovimentacoes(atualizarMovimentacoes);
        setNovaMovimentacao('');
        await AsyncStorage.setItem('MovimentacoesFinanceiras', JSON.stringify(atualizarMovimentacoes));
    } catch (error) {
        console.error("Erro ao adicionar movimentação", error);
    }
};

export const handleLogout = async (setIsLoggedIn, navigation) => {
    try {
        await AsyncStorage.removeItem('loggedIn'); // Limpa o status de login no AsyncStorage
        setIsLoggedIn(false); // Atualiza o estado global de login
        navigation.replace('Welcome'); // Navega para a tela de boas-vindas
    } catch (error) {
        console.error("Erro ao fazer logout", error);
    }
};
