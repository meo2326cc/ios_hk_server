import Express from "express";
import axios from 'axios'
import 'dotenv/config'

const app = Express()
const port = process.env.PORT
let data;

(async ()=>{
    try{
        const res = await axios.get( process.env.GOOGLE_SHEET_BOOK ,
        { headers:{ 'X-goog-api-key': process.env.API_KEY }}
        )
        data = res.data.values
        
    }catch(error){
        console.log(error)
    }
})()

app.get( "/" , ( req ,res )=>{
    res.send(data)
} )

app.listen( port )