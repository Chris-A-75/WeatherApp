import React, { useState, useEffect, useRef } from 'react';
import { Text, ScrollView, StyleSheet, SafeAreaView, Animated } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [displayTemp, setTemp] = useState('20');
  const [displayMain, setMain] = useState('Clear');
  const [displayVis, setVis] = useState('10');
  const [displayHumidity, setHumidity] = useState('50');
  const [displayPressure, setPressure] = useState('1000');
  const [displayDew, setDew] = useState('15');
  const [displaySunset, setSunset] = useState('5:00');
  const [displaySunrise, setSunrise] = useState('5:00');

  const fadeAnim = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      setLocation(location);
    })();
  }, []);
  
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  getCurrentTimeFromStamp = function(timestamp,sunSet) {
    var d = new Date(timestamp);
    if (sunSet){
      timeStampCon = (d.getHours() + 2) + ':' + d.getMinutes();
    } 
    else{
      timeStampCon = (d.getHours()) + ':' + d.getMinutes();
    }
    return timeStampCon;
};

  const openWeatherKey = `75f7da7b194ffe59242dea1aafd6771a`;
  fadeIn();
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

      fetchedVis = data.current.visibility / 1000;
      setVis(fetchedVis);

      fetchedHumid = data.current.humidity;
      setHumidity(fetchedHumid);

      fetchedPressure = data.current.pressure;
      setPressure(fetchedPressure);

      fetchedDew = data.current.dew_point;
      setDew(parseInt(fetchedDew));

      fetchedSunset = data.current.sunset;
      setSunset(getCurrentTimeFromStamp(fetchedSunset,true));

      fetchedSunrise = data.current.sunrise;
      setSunrise(getCurrentTimeFromStamp(fetchedSunrise,false));
    })
  return (
    <ScrollView style={styles.container}>
      <Text style={{textAlign: 'center', fontSize: 25, fontWeight: 'bold', marginTop: 70, marginBottom: 50}}>Today</Text>
      <Text style={styles.main}>{displayTemp}°</Text>
      <Text style={styles.submain}>{displayMain}</Text>

      <Animated.View style={[styles.container2,{opacity: fadeAnim}]}>
        <Text style={styles.paragraph}>Sunrise: {displaySunrise} AM</Text>  
        <Text style={styles.paragraph}>Sunset: {displaySunset} PM</Text>
        <Text style={styles.paragraph}>Visibility: {displayVis} km</Text>
        <Text style={styles.paragraph}>Humidity: {displayHumidity}%</Text>
        <Text style={styles.paragraph}>Pressure: {displayPressure} mb</Text>
        <Text style={styles.paragraph}>Dew point: {displayDew}°C</Text>
      </Animated.View>

  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    //paddingTop: 100,
  },
  container2: {
    backgroundColor: '#55c2ed',
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    borderRadius: 10,
  },
  paragraph: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 10,
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