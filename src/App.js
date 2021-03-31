import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useLayoutEffect, useState, useEffect} from "react";


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import LinearProgress from '@material-ui/core/LinearProgress';




const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: "50%",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop:'30'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  loading: {
    display: "flex",
    flexDirection: "column",

    paddingTop: 20,
  
  },
  loadingBar: {
    marginTop: 20,
  }
  
});




 export default function App() {

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;


  

  const [weather, setWeather] = useState();


 
  const getWeatherData = async (location)=>{
    const url  ='https://weather-proxy.freecodecamp.rocks/api/current?lat='+Number(location.lat)+'&lon='+Number(location.long);
    const weatherData = await axios.get(url);
    console.log(weatherData.data);

    setWeather(weatherData.data);
  }
  const [loc, setLoc] = useState({});


  useEffect(() => {

    if(loc.hasOwnProperty("lat")){
      console.log('Do something after loc has changed', loc);
      getWeatherData(loc)

     
    }
    
 }, [loc]);








  useLayoutEffect(()=>{
    console.log("haha")
    
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLoc({long:position.coords.longitude, lat:position.coords.latitude});

      
      
      
    });
  
  
  }, [])


  


  return (
    <div className="App">
       <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          Weather Today
        </Typography>
        { weather !== undefined ? 
        <div>

            
              <img src={weather.weather[0].icon} alt={"error loading weather data" }></img>
              <Typography className={classes.pos} color="textSecondary">
              {"Feels like: " + JSON.stringify(weather.main.feels_like)}
            </Typography>
         </div>

         :
        <div className={classes.loading}>
            <LinearProgress className={classes.loadingBar}/>
            <LinearProgress color="secondary" className={classes.loadingBar}/>
        </div>
     

        }
       
       
      
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>

    </div>
  );
}


