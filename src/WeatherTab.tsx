import React, { useState, useEffect } from "react";

interface Props {
  city?: number | string;
  time?: string;
  temperature?: number;
  windMagnitude?: number;
  windDirection?: string;
  weatherType?: string;
  weatherTypeImageCode?: string;
  updateTime?: number;
}

export const WeatherTab: React.FC<Props> = (Props) => {
  return (
    <div className="weatherTab">
      <div className="parent-container">
        <div className="Aligner-item--top city-hour">{Props.city}</div>

        <div className="Aligner-item--bottom city-hour">
          Updated: {Props.updateTime}
        </div>
      </div>

      <div className="parent-container">
        <div className="temp">
          {Props.temperature} {"\u00b0"}{" "}
        </div>
      </div>

      <div className="parent-container">
        <div className="todays-thumb">
          <div>{Props.weatherType}</div>
          <img
            src={`http://openweathermap.org/img/wn/${Props.weatherTypeImageCode}@2x.png`}
          ></img>
        </div>

        <div className="Aligner-item--bottom wind">
          <img src="https://icon-library.com/images/wind-icon/wind-icon-19.jpg"></img>
          <div>N {Props.windMagnitude} m/s</div>
        </div>
      </div>
    </div>
  );
};
