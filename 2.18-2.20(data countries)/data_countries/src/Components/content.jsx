



const ShowData=({content})=>{
    let language=content[0].languages
        let langarr=[]
        for(let key in language){
            langarr.push(language[key])
        }
    return(
        <div>
                <h1>{content[0].name.common}</h1>
                <p>Capital: {content[0].capital}</p>
                <p>Area: {content[0].area}</p>
                <br/>
                <h3>languages</h3>
                <ul>
                    {langarr.map((value,index)=><li key={index}>{value}</li>)}
                </ul>
                <img src={content[0].flags.png} width="10%" alt="" />
            </div>
    )

}



const Content=({condition,content,FetchDetails,goBack})=>{
    console.log("this is content passed",content)
    if(condition===0){
        return(
            <div>
                Search Countries...
            </div>
        )
    }
    else if(condition===1){
        return(
            <ul>
                {content.map((item,index)=><><li key={index}>{item}</li><button onClick={()=>FetchDetails({item})}>Show More</button></>)}
            </ul>
        )
    }
    else if(condition===2){
        return<div>3u3u
        Too many matches, specify another filter
    </div>
    }
    else if(condition===3){
        console.log(content[0].latlng,"LATLNGGGG")

        
        
        return(
            <>
            <ShowData content={content}/>
            </>
            
        )
    }
    else if(condition===4){
        return(
            <div>
                No record Found...
            </div>
        )
        
    }
    else if(condition===5){
            if(content.length===0){
        return(
            <div>
                WAIT
            </div>
        )
    }
        else{
            return(
                <div>
                    <br/>
                    <button onClick={goBack}>Go Back</button>
                    <ShowData content={content}/>
                </div>
            )

        }
    }
    else{
        return(
            <div>
                <h1>WAIT...</h1>
            </div>
        )
    }
}
    export default Content