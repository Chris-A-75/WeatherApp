import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
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
  var fetched;
  
  fetch(`https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}&lat=33.8478564&lon=35.5491985`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      fetchedTemp = data.current.temp;
      fetchedTemp = parseInt(fetchedTemp + 1);
      setTemp(fetchedTemp);
      fetchedMain = data.current.weather[0].main;
      setMain(fetchedMain);
      fetchedLike = data.current.feels_like;
      fetchedLike = parseInt(fetchedLike + 1);
      setLike(fetchedLike);;
      fetchedHumid = data.current.humidity;
      setHumidity(fetchedHumid);
    })
  return (
    <View style={styles.container}>
      <Text style={styles.main}>{displayTemp}°</Text>
      <Text style={styles.paragraph}>The weather is {displayMain}</Text>
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
  }
})