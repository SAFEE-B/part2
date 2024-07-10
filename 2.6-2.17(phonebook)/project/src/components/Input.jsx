import Filter from "./Filter"

const Input=({newName,newNum,changeHandler,changeHandler1,addInput})=>{
    return(
        <form onSubmit={addInput}>
        <div>
          name: <input value={newName} onChange={changeHandler} />
        </div>
        <div>
          phone: <input value={newNum} onChange={changeHandler1} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
      </form>
    )
}

export default Input