import axios from 'axios'

const baseUrl='https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll=()=>{

    return axios.get(baseUrl).then(response=>response.data)
}
const getWeather=(latlng)=>{
    const api_key ="739f4663d920a72dfb5ab2d1328d69c0"
    console.log("API IS",api_key)
    console.log("LATLNG IS: ",latlng)
    let url=`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}`
    console.log("URL IS",url)
    return fetch(url)
        .catch(error => {
            console.error("Error fetching weather data:", error);
            throw error; 
        });
  }

export default {getAll,getWeather}