import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { TiWeatherStormy } from "react-icons/ti";
import { TiWeatherCloudy } from "react-icons/ti";

function Weather() {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("Nigeria");
  const [temp, setTemp] = useState(38.21);
  const [emoji, setEmoji] = useState("☀");
  const [error, setError] = useState("Please Enter City");
  const [errorColor, setErrorColor] = useState("black");
  const [margin, setMargin] = useState(20);

  const API_KEY = "34240502cdc180bdffd010ab4d992eac";

  // handle Input Change

  function handleInput(event) {
    setInput(event.target.value);
  }

  // handle Click

  async function fetchData() {
    const errorMessage = "City Not Found";
    const response = await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${API_KEY}&q=${input}&units=metric`
      )
      .then((res) => {
        if (!res) {
          throw new Error("City Not Found");
        } else {
          console.log(res.data);
          setCity(res.data.name);
          setTemp(res.data.main.temp);
          setError("Success");
          setErrorColor("black");
          setMargin(75);
          temp < 20
            ? setEmoji(<TiWeatherStormy />)
            : setEmoji(<TiWeatherCloudy />);
        }
      })
      .catch((error) => {
        setError(errorMessage);
        console.error(error);
        setErrorColor("red");
        setMargin(35);
      });

    setInput("");
  }

  function handleClick(e) {
    e.preventDefault();
    fetchData();
  }

  return (
    <>
      <div className="weather-container">
        <div className="weather-info">
          <h1>Weather Map</h1>
          <div className="input-field">
            <input
              type="text"
              placeholder="Enter City"
              value={input}
              onChange={handleInput}
            />
            <CiSearch
              className="search-icon"
              onClick={() => handleClick(event)}
            />
          </div>
          <div className="display">
            <div className="city-name">{city}</div>
            <div className="temp">{temp}°C</div>
            <div className="emoji">{emoji}</div>
          </div>
          <div
            className="error"
            style={{ color: errorColor, marginLeft: margin }}
          >
            {error}
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
