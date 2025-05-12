document.addEventListener("DOMContentLoaded" ,function() {
    const searchButton = document.getElementById("searchButton");

    function updateData(data){
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".city").innerHTML = data.name;

        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

        const weatherIcon = document.querySelector(".weather-icon");
        const condition = data.weather[0].main;

        if(condition == "Clouds"){
            weatherIcon.src = "clouds.png";
        }
        else if(condition == "Clear"){
            weatherIcon.src = "clear.png";
        }
        else if(condition == "Rain"){
            weatherIcon.src = "rain.png";
        }
        else if(condition == "Drizzle"){
            weatherIcon.src = "drizzle.png";
        }
        else if(condition == "Mist"){
            weatherIcon.src = "mist.png";
        }
    }

    async function checkWeather(cityName){
        try{
            const apiKey = "346ad3fe413ad5ba6da873c3713f7f9a";
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const response = await fetch(apiUrl);
            if(!response.ok){
                alert("Unable to fetch the Data");
                throw new Error("Unable to fetch the Data");
            }
            const data = await response.json(); 
            console.log(data);

            updateData(data);
        }
        catch(error){
            console.log(error);
        }
        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    searchButton.addEventListener('click' ,function(){
        const cityNameInput = document.getElementById("input-city");
        const cityName = cityNameInput.value;

        checkWeather(cityName);
    })
})