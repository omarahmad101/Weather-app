const apiKey = "458c86f195e205240e8d44e9f536442e";

const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`
        ];

        weatherDataEl.innerHTML = `
            <div id="icon">
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
            </div>
            <div class="temperature">${temperature}°C</div>
            <div class="description">${description}</div>
            <div class="details">
                ${details.map(detail => `<div>${detail}</div>`).join('')}
            </div>
        `;

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        weatherDataEl.innerHTML = "Failed to retrieve weather data. Please try again.";
    }
}
 