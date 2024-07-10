const Persons=({person,search,deletePerson})=>{
    return(
    <ul>
        {search().map((person, id) => (
          <li key={id}>{person.name} {person.number} <button onClick={()=>deletePerson(person.id)}>delete</button></li>
        ))}
      </ul>
    )
}
export default Persons