import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

const ClimaScreen = () => {
    const [climaData, setClimaData] = useState(null);
    const countries = ['Guatemala', 'Belize', 'El Salvador', 'Honduras', 'Nicaragua', 'Costa Rica', 'Panama'];

    useEffect(() => {
        const fetchClimaData = async () => {
            try {
                const responsePromises = countries.map(country =>
                    axios.get(`https://api.weatherapi.com/v1/current.json?key=ba537c85609047c7bfd52703233006&q=${country}&lang=es`)    
                );
                const responses = await Promise.all(responsePromises);
                const climaDataArray = responses.map(response => response.data);
                setClimaData(climaDataArray);
            }   catch (error) {
                console.error(error);
            }
        };

        fetchClimaData();

    }, []);

    if (!climaData) {
        return (
            <View>
                <Text>Cargando...</Text>
            </View>
        )
    }
    
    return (
        <View>
            {climaData.map((clima, index) => (
                <View key={index} style={styles.newsItem}>
                    <Text style={styles.text}>Ubicación: {clima.location.name}, {clima.location.region}, {clima.location.country}</Text>
                    <Text style={styles.text}>Temperatura: {clima.current.temp_c}°C</Text>
                    <Text style={styles.text}>Condición: {clima.current.condition.text}</Text>
                    <Text style={styles.section}>-----------------------------------------------------------</Text>
                </View>
            )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
    },
    newsItem: {
        marginBottom: 20,
    },
    section: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ClimaScreen;