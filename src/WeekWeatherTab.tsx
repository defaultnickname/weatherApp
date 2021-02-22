import React from "react";
import { WeatherTab } from "./WeatherTab";

interface IProps {
  forecastDataSeries: Array<Iforecastobject>;
}

interface Iforecastobject {
  timepoint: number;
  cloudcover: number;
  temp2m: number;
  weatherType: string;
}

let cloudValues = [
  "0%",
  "0%-6%",
  "6%-19%",
  "19%-31%",
  "31%-44%",
  "44%-56%",
  "56%-69%",
  "69%-81%",
  "81%-94%",
  "94%-100%",
];

export const WeekWeatherTab: React.FC<IProps> = (Props) => {
  let data = Props.forecastDataSeries;
  console.log(data);
  return (
    <>
      <div className="weatherTab">
        <h3 className="Aligner-item--top">Weather for today:</h3>
        <div className="flex-col parent-container ">
          <ul>
            <div>{data[0].timepoint}:00</div>
            <div>
              {data[0].temp2m} {"\u00b0"}
            </div>
            <div className="img-thumb">
              <img
                src={`${process.env.PUBLIC_URL}/assets/${data[0].weatherType}.png`}
              />
              {/*<img src={require(`./assets/clear.png`)}></img>{" "}*/}
              {/* temp, hour, image from props   */}
              <div>Cloud cover:</div>
              <div>
                <div className="div-flex">
                  <img src="https://i.imgur.com/jcwO4XD.png"></img>
                  <div>{cloudValues[data[0].cloudcover]}</div>
                </div>
              </div>
            </div>
          </ul>

          <ul>
            <div>{data[1].timepoint}:00</div>
            <div>
              {data[1].temp2m} {"\u00b0"}
            </div>
            <div className="img-thumb">
              <img
                src={`${process.env.PUBLIC_URL}/assets/${data[1].weatherType}.png`}
              />
              {/* temp, hour, image from props   */}
              <div>Cloud cover:</div>
              <div>
                <div className="div-flex">
                  <img src="https://i.imgur.com/jcwO4XD.png"></img>
                  <div>{cloudValues[data[1].cloudcover]}</div>
                </div>
              </div>
            </div>
          </ul>

          <ul>
            <div>{data[2].timepoint}:00</div>
            <div>
              {data[2].temp2m} {"\u00b0"}
            </div>
            <div className="img-thumb">
              <img
                src={`${process.env.PUBLIC_URL}/assets/${data[2].weatherType}.png`}
              />
              {/* temp, hour, image from props   */}
              <div>Cloud cover:</div>
              <div>
                <div className="div-flex">
                  <img src="https://i.imgur.com/jcwO4XD.png"></img>
                  <div>{cloudValues[data[2].cloudcover]}</div>
                </div>
              </div>
            </div>
          </ul>

          <ul>
            <div>{data[3].timepoint}:00</div>
            <div>
              {data[3].temp2m} {"\u00b0"}
            </div>
            <div className="img-thumb">
              <img
                src={`${process.env.PUBLIC_URL}/assets/${data[3].weatherType}.png`}
              />
              {/* temp, hour, image from props   */}
              <div>Cloud cover:</div>
              <div>
                <div className="div-flex">
                  <img src="https://i.imgur.com/jcwO4XD.png"></img>
                  <div>{cloudValues[data[3].cloudcover]}</div>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};
