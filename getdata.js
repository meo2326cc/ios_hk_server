import axios from 'axios'
import 'dotenv/config'

const getData = async ( path )=>{

    let result
    
    try{
        const res = await axios.get( path ,
        { headers:{ 'X-goog-api-key': process.env.API_KEY }}
        )
        result = res.data.values
        
    }catch(error){
        console.log( path )
        console.log('--ERROR--')
        console.log(error)
    }

    return async function() { return result } 

}

export default getData