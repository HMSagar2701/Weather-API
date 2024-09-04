const input = document.getElementById("city-name");
const button = document.getElementById("search-button");
const resultDiv = document.getElementById("weather-result");

async function getData(cityName) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=448d29a06b80464cacb41239240409&q=${cityName}&aqi=yes`);
        
        // Handle non-200 responses
        if (!response.ok) throw new Error('City not found');

        return await response.json();
    } catch (error) {
        return { error: error.message };
    }
}

function updateUI(data){
    resultDiv.innerHTML = '';

    if(data.error){
        const errorPara = document.createElement("p");
        errorPara.textContent = `Error: ${data.error}`;
        resultDiv.appendChild(errorPara);
        return;
    }

    const { location, current } = data;

    const heading = document.createElement("h2");
    heading.textContent = `Weather in ${location.name}, ${location.country}`;
    resultDiv.appendChild(heading);

    const tempPara = document.createElement("p");
    tempPara.textContent = `Temperature: ${current.temp_c}°C`;
    resultDiv.appendChild(tempPara);

    const conditionPara = document.createElement("p");
    conditionPara.textContent = `Condition: ${current.condition.text}`;
    resultDiv.appendChild(conditionPara);

    const windPara = document.createElement("p");
    windPara.textContent = `Wind: ${current.wind_kph} kph`;
    resultDiv.appendChild(windPara);
    
    const humidityPara = document.createElement("p");
    humidityPara.textContent = `Humidity: ${current.humidity}%`;
    resultDiv.appendChild(humidityPara);

    const aqiPara = document.createElement("p");
    aqiPara.textContent = `Air Quality Index (AQI): ${current.air_quality.pm2_5.toFixed(2)}`;
    resultDiv.appendChild(aqiPara);
}

button.addEventListener("click", async () => {
    const cityName = input.value.trim();
    if (!cityName) {
        resultDiv.textContent = "Please enter a city name.";
        return;
    }
    const data = await getData(cityName);
    updateUI(data);
});
