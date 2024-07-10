import axios from "axios";

const baseUrl="http://localhost:3001/persons"


//this funciton calls all the values from the database to stored initially in persons object
const getInitial=()=>{
    const allInitial=axios.get(baseUrl)
    .then(response=>response.data)
    .catch(error=>{console.log("Failed to load initial data")})
    return allInitial
}
//this posts the objects when we add a person to the phonebook
const dataPost=(object)=>{
    return axios.post(baseUrl,object)
    .then(response=>response.data)
    .catch(error=>{console.log("Failed to post data")})
}

//this deletes an object from the phonebook
const dataDelete=(id)=>{
    return axios.delete(baseUrl+'/'+id)

}

//when we add matching names and chose to replace phoneNumbers, this makes the put request
const dataUpdate=(id,object)=>{
    return axios.put(baseUrl+'/'+id,object).then(response=>response.data).catch(error=>{console.log("Error in PUT request")})
}
export default {dataPost,getInitial,dataDelete,dataUpdate}