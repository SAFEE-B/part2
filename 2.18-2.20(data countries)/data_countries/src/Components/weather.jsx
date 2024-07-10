const Weather=({data})=>{
    console.log(data,"THIS IS DATA FROM WEATHER COMPONENT")
    return(
        <>
        <h1>Weather : </h1>
        <p>Temp: {data.main.temp/10} C</p>
        <p> {data.weather[0].main} ({data.weather[0].description}) </p>
        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
        <p>Wind : {data.wind.speed}m/s </p>
        </>
    )
}
export default Weather