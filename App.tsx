import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Api from './src/services/api';

export default function App() {
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUf] = useState('');

  async function buscarCep() {
    if (cep == '') {
      Alert.alert('Cep inválido!');
      setCep('');
    }
    try {
      const response = await Api.get(`/${cep}/json/`);
      setLogradouro(response.data.logradouro);
      setBairro(response.data.bairro);
      setLocalidade(response.data.localidade);
      setUf(response.data.uf);
    } catch (error) {
      console.log('ERRO' + error);
    }
  }
  return (
    <View style={styles.containerPrincipal}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Buscador de Cep</Text>
      </View>
      <View style={styles.containerCep}>
        <TextInput
          style={{
            borderColor: '#000000',
            borderWidth: 2,
            width: 200,
            fontSize: 18,
            marginTop: 30,
            marginEnd: 20,
            borderRadius: 10,
            padding: 15,
          }}
          value={cep}
          onChangeText={text => setCep(text)}
          placeholder="Cep"
        />
        <TouchableOpacity style={styles.botaoBuscar} onPress={buscarCep}>
          <Text style={styles.textoBotaoBuscar}>Buscar</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.caixaTexto}
        value={logradouro}
        onChangeText={text => setLogradouro(text)}
        placeholder="Logradouro"
      />
      <TextInput
        style={styles.caixaTexto}
        value={bairro}
        onChangeText={text => setBairro(text)}
        placeholder="Bairro"
      />
      <TextInput
        style={styles.caixaTexto}
        value={localidade}
        onChangeText={text => setLocalidade(text)}
        placeholder="Cidade"
      />
      <TextInput
        style={{
          borderColor: '#000000',
          borderWidth: 2,
          width: 100,
          fontSize: 18,
          marginTop: 10,
          marginEnd: 20,
          borderRadius: 10,
          marginHorizontal: 20,
          padding: 15,
        }}
        value={uf}
        onChangeText={text => setUf(text)}
        placeholder="Estado"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    flexDirection: 'column',
  },
  topBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#018787da',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 20,
  },
  containerCep: {
    flexDirection: 'row',
    height: 100,
    marginHorizontal: 20,
  },
  botaoBuscar: {
    backgroundColor: '#018786',
    width: 120,
    height: 70,
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
  },
  textoBotaoBuscar: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  caixaTexto: {
    borderColor: '#000000',
    borderWidth: 2,
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 20,
  },
});
