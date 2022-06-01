import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [displayTemp, setTemp] = useState('20');
  const [displayMain, setMain] = useState('Clear');
  const [displayLike, setLike] = useState('20');
  const [displayHumidity, setHumidity] = useState('50');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      setLocation(location);
    })();
  }, []);

  const openWeatherKey = `75f7da7b194ffe59242dea1aafd6771a`;
  
  fetch(`https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}&lat=33.8478564&lon=35.5491985`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      fetchedTemp = data.current.temp;
      fetchedTemp = parseInt(fetchedTemp);
      setTemp(fetchedTemp);
      fetchedMain = data.current.weather[0].main;
      fetchedMainDesc = data.current.weather[0].description;
      setMain(fetchedMainDesc);
      fetchedLike = data.current.feels_like;
      fetchedLike = parseInt(fetchedLike);
      setLike(fetchedLike);
      fetchedHumid = data.current.humidity;
      setHumidity(fetchedHumid);
    })
  return (
    <View style={styles.container}>
      <Text style={styles={textAlign: 'left'}}>Today</Text>
      <Text style={styles.main}>{displayTemp}°</Text>
      <Text style={styles.submain}>{displayMain}</Text>
      <Text style={styles.paragraph}>Feels like: {displayLike}°</Text>
      <Text style={styles.paragraph}>Humidity: {displayHumidity}%</Text>
        
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    paddingTop: 100,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  main: {
    fontSize: 90,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 50,
  },
  submain: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 100,
  }
})