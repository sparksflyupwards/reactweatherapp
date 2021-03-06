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
import transitions from '@material-ui/core/styles/transitions';





const useStyles = makeStyles({
  root: {
    '&:hover': { 
      transform: 'rotate(8deg) translateX(5%)',
      transformOrigin: 'top right',
      transition: 'all .2s ease-in',
     },
    display: "inline-block",
    position:"relative",
    height: "350px",
    width: "400px",
    borderRadius: "5%",
    boxShadow:"-55px 5px 30px -16px #c1c1c1;",
    zIndex: 1,
    

  
  },
    rootBig: {
    display: "inline-block",
    position:"relative",
    top:"-200px",
    right: "auto",
    height: "900px",
    width: "900px",
    transition: "all 2s ease-in",
    borderRadius: "5%",
    boxShadow:"-55px 5px 30px -16px #c1c1c1;",
    zIndex: 1,
    

  
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
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
  const [cards, setCards] = useState([]);
  const [citiesData, setCitiesData] = useState([

  {city:"Aberdeen, Scotland",
  lat:57.9 ,
  long:-2.9 ,
  weather: undefined},
   {city:"Toronto, Canada",
  lat:43.65 ,
  long:-79.38 ,
 weather: undefined},
   {city:"Bremen, Germany",
  lat:53.5,
  long:8.49 ,
 weather: undefined},
   {city:"San Francisco, California",
  lat:37.77,
  long:-122.42 ,
 weather: undefined},
   {city:"Bangkok, Thailand",
  lat:13.45,
  long:100.30 ,
  weather: undefined},


    {city:"Beijing, China",
  lat:39.55 ,
  long:116.25 ,
  weather: undefined},
  {city:"Karachi, Pakistan",
  lat:28.37 ,
  long:-106.5 ,
  weather: undefined},
  {city:"Sydney, Austrailia",
  lat:28.37 ,
  long:-106.5 ,
  weather: undefined},
{city:"Osaka, Japan",
  lat:28.37 ,
  long:-106.5 ,
  weather: undefined},
 {city:"Oaxaca, Mexico",
  lat:28.37 ,
  long:-106.5 ,
  weather: undefined},
    {city:"Chihuahua, Mexico",
  lat:28.37 ,
  long:-106.5 ,
  weather: undefined},
    {city:"Irkutsk, Russia",
  lat:52.30 ,
  long:104.20 ,
  weather: undefined},
    {city:"Liverpool, England",
  lat:53.25,
  long:-3.0 ,
  weather: undefined},
    {city:"Milan, Italy",
  lat:45.27,
  long:9.10 ,
  weather: undefined},

])

 
  const getWeatherData = async (city)=>{
    const api_key = "a0f2d600d2c69d2d10efde01390f208a";
    const url  = `http://api.openweathermap.org/data/2.5/weather?q=${city.city},,&units=metric&appid=${api_key}`
    //'https://weather-proxy.freecodecamp.rocks/api/current?lat='+Number(city.lat)+'&lon='+Number(city.long);
    const weatherData = await axios.get(url);
    console.log(weatherData.data);
    city.weather = weatherData.data;
    city.weather.weather[0].icon = `http://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`
    city.feels_like = city.weather.main.feels_like ? city.weather.main.feels_like : city.weather.main.temp;
    setCitiesData([...citiesData, city]);

  }
  const [loc, setLoc] = useState({});


  useEffect(() => {

    if(loc.hasOwnProperty("lat")){
      console.log('Do something after loc has changed', loc);
      //getWeatherData(loc)

     
    }
    
 }, [loc]);


 useEffect(()=>{
console.log(citiesData)
 }, [citiesData])








  useLayoutEffect(()=>{
    console.log("haha")
    
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      //setLoc({long:position.coords.longitude, lat:position.coords.latitude});

      
      
      
    });

    for(let city of citiesData){
     setCards([...cards, cards.push("root")]);
      getWeatherData(city);
    }
    console.log(cards)




  
  
  }, [])

  const sortWeather = (preference)=>{
    console.log("BEFORe");
    console.log(citiesData);
    const compare = (city_a, city_b) =>{
      //console.log(city_a.city +": "+city_a.weather.main.feels_like+ " vs " + city_b.city +" "+city_b.weather.main.feels_like)


       const temp_city_a =  Number(city_a.weather.main.feels_like),
       temp_city_b =  Number(city_b.weather.main.feels_like);
       console.log(city_a.city);
       console.log(temp_city_a);
       console.log(city_b.city);
       console.log(temp_city_b)
      console.log(temp_city_a < temp_city_b)
      let swap;
      if(temp_city_a < temp_city_b){
        swap = -1;
      }
      else if (temp_city_a > temp_city_b){
        swap = 1;
      }
      else{
        console.log("no swap for "+ city_a.city) 
        swap= 0;
      }

      if (preference === "hot"){
        swap *= -1;
      }

      return swap;
    }
    
    setCitiesData([...new Set([...citiesData].sort(compare))])
      console.log("After");
    console.log(citiesData);
   
  }

  const sortCold = ()=>{
    sortWeather("cold");
  }

    const sortHot= ()=>{
    sortWeather("hot");
  }

  
  
  const weatherCards = citiesData.map((city, idx)=>{
    console.log("pp: "+idx+" "+cards[idx])
    return( <Card id={"card card"+idx} className={cards !== undefined ? classes[cards[idx]] : classes.root}
             variant="outlined" 
             onMouseLeave={()=>{
              let cardCopy = [...cards];
               let card = cardCopy[idx];
               if(card == "rootBig"){
                 card = "root"
               }
               cardCopy[idx] = card;
               setCards(cardCopy)
               
             }}
             onClick={()=>{
               let cardCopy = [...cards];
               let card = cardCopy[idx];
               card = "rootBig";
               cardCopy[idx] = card;
               setCards(cardCopy)
             }
               }>
                    <CardContent >
                      <Typography className={classes.title} color="textPrimary" gutterBottom>
                        {city.city}
                      </Typography>
                      { city.weather !== undefined ? 
                      <div>

                          
                            <img src={city.weather.weather[0].icon} alt={"error loading weather data" }></img>
                          <Typography className={classes.pos} color="textSecondary">
                            {city.weather.weather[0].description}
                          </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                            {"Feels like: " + JSON.stringify(city.weather.main.feels_like)}
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
          </Card>)
  })


  return (
  
      <div className="cardsScroll">
      <div className="sort">
      <button onClick={sortCold}>{"<-Colder"} </button>
       <button onClick={sortHot}>{"Hotter -->"} </button>
      </div>
      
      {weatherCards}
       
  

                  
       

        </div>
  );
}


