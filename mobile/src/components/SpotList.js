import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import api from '../services/api';

function SpotList({ tech, navigation }) {
    const [spots, setSpots] = useState([]);
    useEffect(() => {
        async function loadSpots() {

            const response = await api.get('/spots', {
                params: { tech }
            })

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    function handleNavigate(id) {
        navigation.navigate('Book', {id}); 
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Empresas que usam <Text style={styles.bold}>{tech}</Text>
            </Text>

            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={true}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: 'https://scontent.fcac2-1.fna.fbcdn.net/v/t31.0-0/p640x640/13498015_296600267345223_1667127126225015455_o.jpg?_nc_cat=104&_nc_sid=e007fa&_nc_oc=AQmsgxXItHsyLq7LA8XnXcEjNh0m-rYJ3P2ihwuH8zpdlOF4743Qucyq-6c62x2oXGI&_nc_ht=scontent.fcac2-1.fna&_nc_tp=6&oh=30cc511f8da6b0779cf83e77357a8255&oe=5EDCE66F' }} />

                        <Text style={styles.company}>
                            {item.company}
                        </Text>

                        <Text style={styles.price}>
                            {item.price ? `R$${item.price}/dia` : 'GRATUITO'}
                        </Text> 

                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar Reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    bold: {
        fontWeight: 'bold',
    },
    list: {
        paddingHorizontal: 20,
    },
    listItem: {
        marginRight: 15,
    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#333",
        marginTop: 10,
    },
    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5,
    },
    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        marginTop: 15,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
})

export default withNavigation(SpotList);