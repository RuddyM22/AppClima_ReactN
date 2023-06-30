import React, { useEffect, useState } from "react";
import { View,Text } from "react-native";
import axios from "axios";

const ClimaScreen = () => {
    const [climaData, setClimaData] = useState(null);
    const countries = ['Guatemala', 'Belize', 'Salvador', 'Honduras', 'Nicaragua', 'Costa Rica', 'Panama'];

    useEffect(() => {
        const fetchClimaData = async () => {
            try {
                const responsePromises = countries.map(country =>
                    axios.get('https://api.weatherapi.com/v1/current.json?key=ba537c85609047c7bfd52703233006&q=${country}&lang=es')    
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
                <View key={index}>
                    <Text>Ubicación: {clima.location.name}, {clima.location.region}, {clima.location.country}</Text>
                    <Text>Temperatura: {clima.current.temp_c}°C</Text>
                    <Text>Condición: {clima.current.condition.text}</Text>
                    <Text>------------------------------------</Text>
                </View>
            )
            )}
        </View>
    );
};

export default ClimaScreen;