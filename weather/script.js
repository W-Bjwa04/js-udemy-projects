document.addEventListener('DOMContentLoaded',()=>{
    const inputCity = document.querySelector('#city-input')
    const getBtn = document.querySelector("#find-btn")
    const cityName = document.querySelector('#city-name')
    const weatherInfo = document.querySelector('#weather')
    const cloudStatus = document.querySelector('#cloud-status')
    const errorStatus = document.querySelector('#error-msg')
    const dataContainer = document.querySelector('#details')

    const WEATHER_API = 'f936d0a1dc2f6b66877166c75175e215'

    getBtn.addEventListener('click',async()=>{
        // get the input city name 

        const cityToFind = inputCity.value.trim()

        // if no city is entered 

        if(!cityToFind){
            return 
        }

        // else if city name is entered 

        try {

            const weatherResponse = await getWeather(cityToFind)

            displayWeather(weatherResponse)
            
        } catch (error) {
            
            callError()
        }
    })


    // function to get weather data 

    async function getWeather(city){


        

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API}`,{
            method:'GET'
        })

        
        // if no city is found from server 
        if(!(response.ok)){
            
            throw new Error("City Not Found")
        }

        // else all of 

        const weatherData = await response.json()

        return weatherData

    }   


    // function for display weather 

    function displayWeather(data){

        const {name,main,weather} = data

        cityName.textContent= name

        // Convert temperature to Celsius
        const temperatureInCelsius = Math.ceil((main.temp - 273.15).toFixed(2)); // Convert Kelvin to Celsius
        weatherInfo.textContent = `Temperature: ${temperatureInCelsius} °C`; // Display temperature in Celsius

        cloudStatus.textContent = weather[0].description
        // make the display of details to actice and error to zero 
        errorStatus.classList.add('error-hidden')
        dataContainer.classList.remove('data-hidden')


        // empty the input field 

        inputCity.value=''
    }


    // function for display error message 

    function callError(){

       
        
        errorStatus.classList.remove('error-hidden')
        dataContainer.classList.add('data-hidden')

    }
})