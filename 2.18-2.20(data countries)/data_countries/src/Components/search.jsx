const SearchBox=({Value,changeHandler,searchFunction})=>{
    return(
        <>
        <div><h1>Find Countries</h1> 
            <form onSubmit={searchFunction}>
                <input value={Value} onChange={changeHandler}/>
                <button>Find</button>
            </form>
        </div>
        </>
    )
}
export default SearchBox;