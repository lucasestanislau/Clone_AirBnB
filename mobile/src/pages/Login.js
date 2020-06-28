import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';
/*
Att: Ao usar o IOS quando for digitar nos campos,
o teclado irá ocultar a view, por isso precisamos utilizar
KeyboardAvoidingView
*/
export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user =>{
            if(user){
                navigation.navigate('List');
            }
        })
    }, []);

    async function handleSubmit() {
        const response = await api.post('/sessions', {
            email
        })

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');
    }
    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding"
            style={styles.container}>
            <Image source={logo} />

            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu E-mail"
                    placeholderTextColor="#999"
                    /* teclado com @ */
                    keyboardType="email-address"
                    /* tirar letras maíusculas */
                    autoCapitalize="none"
                    /* tirar o auto complete */
                    autoCorrect={false}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />

                <Text style={styles.label}>Tecnologias *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias"
                    placeholderTextColor="#999"
                    /* Colocar primeira letra maíusculas */
                    autoCapitalize="words"
                    /* tirar o auto complete */
                    autoCorrect={false}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar Spots</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        alignSelf: "stretch",
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 10,
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
})