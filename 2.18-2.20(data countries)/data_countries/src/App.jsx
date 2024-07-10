import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import network from './Components/network'
import SearchBox from './Components/search'
import Content from './Components/content'
import Weather from './Components/weather'



function App() {
  const [data,setData]=useState([])
  const [value,setValue]=useState("")
  const [query,setQuery]=useState("")
  const [content,setContent]=useState([])
  const [condition,setConditions]=useState(0)
  const [contentTemp,setContentTemp]=useState([])
  const [weather,setWeather]=useState({})


const changeHandler=(event)=>{
  setValue(event.target.value)
}
const search=(event)=>{
  event.preventDefault()
  setQuery(value.toLowerCase())
}



const FetchDetails=({item})=>{
  console.log("THIS IS EVENT OF FETCHDTAILS",item)
  setConditions()
    let object1={}
    network.getAll().then(response=>{
      object1=response.filter(obj=>{
        let value=obj.name.common
        value=value.toLowerCase()
        return value.includes(item)
      })}).then(()=>{
        setContentTemp(content);
        console.log(content,"THISTHISTHISTHIS")
        setContent(object1);
        setWeather(network.getWeather(item[0].latlng))
        setConditions(5)
      }
      )

}

const goBack=()=>{
  setConditions(1)
  setContent(contentTemp)
  setContentTemp([])
}






useEffect(()=>{

  if(data.length===0){
    network.getAll().then(response=>{(setData(response.map(single=>single.name.common.toLowerCase())))}).catch(error=>{console.log("THIS IS ERROR",error)})
  console.log(data,"THIS IS DATA Retrieved")
  }
  else{
    console.log(query,"This is query")
  const found=data.filter(val=>val.includes(query))
  
  console.log("THIS IS FOUND",found)
  if(found.length>1&found.length<=10){
    console.log(found)
  setContent(found)
  setConditions(1)
  }
  else if(found.length>10){
    setContent([])
    setConditions(2)
    console.log("length greater than 10")
  }
  else if(found.length===1){
    var object1={}
    network.getAll()
    .then(response=>{
        object1=response.filter(obj=>{
            let value=obj.name.common
            value=value.toLowerCase()
            return value.includes(found);
      })
    return network.getWeather(object1[0].latlng);
    })
    .then((response)=>response.json())
    .then(weatherData=>{       
        setWeather(weatherData)
        setContent(object1);
        setConditions(3)
        console.log(content)
      });
        }
  else{
    setConditions(4)
    setContent([])
  }


}},[query])



  return (
    <>  
    <SearchBox Value={value} changeHandler={changeHandler} searchFunction={search}></SearchBox>
    <Content content={content} condition={condition} FetchDetails={FetchDetails} goBack={goBack}/>
    {(condition==3||condition==5)&&<Weather data={weather}/>}
    </>
      
  )
}

export default App
