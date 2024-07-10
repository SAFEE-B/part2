import  { useState } from 'react';
import Filter from "./components/Filter"
import Input from "./components/Input"
import Persons from "./components/Persons"
import { useEffect } from 'react';
import axios from 'axios';
import network  from './components/Communication';
import Notification from './components/Notification'
import './index.css'

const App = () => {
  useEffect(()=>{
    network.getInitial().then(data=>setPersons(data))}
    ,[])



  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [errorNotification,setErrorNotification]=useState(null);

  const notificationToggle=(message)=>{
    setErrorNotification(message);
    setTimeout(() => {setErrorNotification(null)
      
    }, 6000);
  }


  const addInput = (event) => {
    event.preventDefault();
    //checks if the name already exists in the phonebook
    
    if(persons.some(person=>person.name === newName)){
      //name in phonebook
      if(window.confirm(`${newName} is already added to phoneBook, replace the old number with new one?`)){
        //replace the number for the name
        let replacingObj;
        const tempPerson=persons.map(person=>
          {
            if(person.name === newName){
            person.number=newNum;
            replacingObj=person;
            }
            return person;
          }
        )

          setPersons(tempPerson);
          network.dataUpdate(replacingObj.id,replacingObj);
          setNewName('');
          setNewNum('');
      }
    }else{
    const idVal=Date.now().toString();
    const tempObj = { name: newName, number: newNum ,id: `${idVal}`}; 
    const isDuplicate = persons.some((obj) => obj.name === tempObj.name);

    if (isDuplicate) {
      notificationToggle(`${newName} already exists in the phonebook`);
      setNewName('');
      setNewNum('');
    } else {
      notificationToggle(`${newName} added to PhoneBook`);
      network.dataPost(tempObj)
      setPersons([...persons, tempObj]);
      setNewName('');
      setNewNum('');
    }
  
  }
}

  const search = () => {
    return persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));
  };

  const changeHandler = (event) => {
    setNewName(event.target.value);
  };

  const changeHandler1 = (event) => {
    setNewNum(event.target.value);
  };

  const changeHandler2 = (event) => {
    setNewFilter(event.target.value);
  };
  const deletePerson=(id)=>{
    if(window.confirm(`Do you really want to delete this ?`))
      {
        network.dataDelete(id).then((promise) => {
          setPersons(persons.filter(person => person.id !== id));
          notificationToggle(`Information of ${id} removed`);

        }).catch(promise=>{
          const ResponseStatus=promise.response.status;
          if(ResponseStatus===404){
            notificationToggle(`Information of ${id} has already been removed from the server by other User`);
          }
          else{
            notificationToggle(`Information of ${id} removed`);
          }})
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorNotification}/>
      <Filter newFilter={newFilter} changeHandler2={changeHandler2}/>
      <Input newName={newName} newNum={newNum} changeHandler={changeHandler} changeHandler1={changeHandler1} addInput={addInput}/>
      <h2>Numbers</h2>
      <Persons person={persons} search={search} deletePerson={deletePerson}/>
    </div>
  );
};

export default App;
