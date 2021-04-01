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
    
      
  
      transform: 'translateY(-30%) translateX(-40%)',
      transition: 'all .4s ease-in',
     },
     /*
    maxWidth: 200,
    display: "block",
    transformOrigin: "right top",

    transform: "rotate(90deg) ",
    marginBottom: 400,
    borderRadius: "10%",
    */
    display: "inline-block",

  
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


    //DO STYLING ON HOVER

    let test = document.getElementById("root");

// This handler will be executed only once when the cursor
// moves over the unordered list
test.addEventListener("mouseenter", function( event ) {
  // highlight the mouseenter target
  //event.target.style.background = "red";

  // reset the color after a short delay
  setTimeout(function() {
    event.target.style.color = "";
  }, 500);
}, false);

// This handler will be executed every time the cursor
// is moved over a different list item
test.addEventListener("mouseover", function( event ) {
  // highlight the mouseover target
  let targetNode = event.target;
  while(targetNode.className != "App"){
   if(targetNode.id.includes("card")){
    alert(targetNode.id)
   }
   
   targetNode = targetNode.parentNode;
  }
  //console.log(event.target.parentNode.className)
  if(event.target.className.includes("MuiTypography-root makeStyles-title-4 MuiTypography-body1 MuiTypography-colorTextPrimary MuiTypography-gutterBottom")){
   // event.target.style.transform  = "rotate(-9deg)";
  }
  //event.target.style.transform  = "rotate(90deg) translateY(-10%)";

  // reset the color after a short delay
  setTimeout(function() {
    if(event.target.className.includes("MuiTypography-root makeStyles-title-4 MuiTypography-body1 MuiTypography-colorTextPrimary MuiTypography-gutterBottom")){
      
   // event.target.style.transform  = "rotate(90deg)";
    }

  }, 5000);
}, false);
  
  
  }, [])


  


  return (
    <div className="App">
      <div className="cardsScroll">
            <Card id="card card1" className={classes.root}
             variant="outlined" 
             onMouseEnter={()=>console.log("WE ON CARD 1")}>
                    <CardContent >
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



          <Card id="card card2" 
          onMouseEnter={()=>console.log("WE ON CARD 2")} onMouseExit={()=>alert("card2gone")} className={classes.root} variant="outlined">
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





          <Card id="card card3"  className={classes.root} variant="outlined">
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





          <Card id="card card4"  className={classes.root} variant="outlined">
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
       
       
          <Card id="card card5"  className={classes.root} variant="outlined">
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
    </div>
  );
}


