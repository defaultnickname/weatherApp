import React, { useState, useEffect, FormEvent } from "react";

import { WeatherTab } from "./WeatherTab";
import { WeekWeatherTab } from "./WeekWeatherTab";
import CircularProgress from "@material-ui/core/CircularProgress";

import { KeyboardEvent } from "react";

interface Icoordinates {
  lat: number;
  lng: number;
}

interface Iforecastobject {
  timepoint: number;
  cloudcover: number;
  temp2m: number;
  weather: string;
}

interface Iforecast {
  init?: string;
  forecast8days: Array<Iforecastobject>;
}

export const WeatherWrapper: React.FC = (Props) => {
  const apiKey = "accfcf65427e568ecc94d04d134108b9";
  const googleGeocodingKey = "AIzaSyAv2fwRER5xv5hQtqCZmb2hIaKQyTU4ECo";
  const region = "Europe";

  //https://maps.googleapis.com/maps/api/geocode/json?address=krak%C3%B3w&key=AIzaSyAv2fwRER5xv5hQtqCZmb2hIaKQyTU4ECo

  const [data, dataSet] = useState<any>(0);
  const [coordinates, setCoords] = useState<Icoordinates>({ lat: 0, lng: 0 });
  const [forecast, setForecast] = useState<Iforecast>();
  const [currentTime, setTime] = useState<number>(+new Date());
  const [closestForecast, setClosestForecast] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [city, setCity] = useState<string>("Kraków");
  const [query, setQuery] = useState<string>("");

  const unixTimeConverter = (unixTimestamp: number) => {
    var date = new Date(unixTimestamp * 1000);
    var hours = date.getHours();

    var minutes = "0" + date.getMinutes();

    var seconds = "0" + date.getSeconds();

    return hours + ":" + minutes.substr(-2);
  };

  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(true);
      let weatherresponse = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&&ang=pl&appid=${apiKey}`
      );

      let coordinatesresponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleGeocodingKey}`
      );

      let coordResult = await coordinatesresponse.json();
      weatherresponse = await weatherresponse.json();

      dataSet(weatherresponse);
      setCoords(coordResult.results[0].geometry.location);
    }

    fetchMyAPI();
    setQuery("");
  }, [city]);

  useEffect(() => {
    async function fetchMyAPI() {
      let forecastresponse = await fetch(
        `http://www.7timer.info/bin/api.pl?lon=${coordinates.lng}&lat=${coordinates.lat}&product=civil&output=json`
      );

      let forecast = await forecastresponse.json();

      let forecastInit = forecast.init;
      let forecastInitHours = forecastInit.substr(-2);
      let forecastDataseries = forecast.dataseries;
      console.log(forecastInit, "inittime");
      console.log(forecastDataseries, "this is fdts");

      let filteredDataseries = forecastDataseries.map((y: Iforecastobject) => ({
        //filter junk from response
        timepoint: y.timepoint,
        temp2m: y.temp2m,
        weatherType: y.weather,
        cloudcover: y.cloudcover,
      }));

      let dT = Date.parse(
        `${forecastInit.substr(0, 4)}-${forecastInit.substr(
          4,
          2
        )}-${forecastInit.substr(6, 2)}T${forecastInit.substr(-2)}:00:00`
      );

      let next4TimestampsForecast = filteredDataseries.filter(
        (x: Iforecastobject) => {
          console.log(currentTime);

          return (
            currentTime <= dT + x.timepoint * 3600 * 1000 &&
            Math.abs(currentTime - (dT + x.timepoint * 3600 * 1000)) <
              12 * 3600 * 1000 //TODO fix logic to return array of 4 objects
          );
        }
      );

      setForecast({ init: forecastInit, forecast8days: filteredDataseries });
      setTime(+new Date());
      setClosestForecast(next4TimestampsForecast);

      console.log(next4TimestampsForecast);

      setLoading(false);
    }
    fetchMyAPI();
  }, [coordinates]);

  return (
    <>
      <nav className="navbar">
        <div>
          <a href="">
            <img src="https://i.imgur.com/ShoHYyp.png"></img>
            <h1>Simple Weather App</h1>
          </a>
        </div>
        <div>
          <form
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setCity(query);
            }}
          >
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onSubmit={(event: KeyboardEvent<HTMLInputElement>) => {
                event.preventDefault();
                alert("to be implemented");
              }}
            ></input>
          </form>
        </div>
        <div className="align--right">
          <button
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              alert("to be implemented");
            }}
          >
            PL / C
          </button>
        </div>
      </nav>

      <WeatherTab
        city={city}
        temperature={data && Math.round(data.main.temp - 273)}
        windMagnitude={data && data.wind.speed}
        windDirection={data && data.wind.direction}
        weatherType={data && data.weather[0].main}
        weatherTypeImageCode={data && data.weather[0].icon}
        updateTime={data && unixTimeConverter(data.dt)}
      ></WeatherTab>

      {isLoading ? (
        <div className="weatherTab justify-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <WeekWeatherTab forecastDataSeries={closestForecast}></WeekWeatherTab>

          <WeekWeatherTab forecastDataSeries={closestForecast}></WeekWeatherTab>
        </>
      )}
    </>
  );
};
