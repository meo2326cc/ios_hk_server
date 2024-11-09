import Express from "express";
import axios from 'axios'
import getData from "./getdata.js";
import cors from 'cors'
import 'dotenv/config'

const app = Express()
const port = process.env.PORT
const getBook = getData( process.env.GOOGLE_SHEET_BOOK )
const getCommpost = getData( process.env.GOOGLE_SHEET_COMM_POST )
const getPubl = getData( process.env.GOOGLE_SHEET_COMM_PUBL )
const getElec = getData( process.env.GOOGLE_SHEET_ELEC )
const getGovp = getData( process.env.GOOGLE_SHEET_GOVP )
const getLegc = getData( process.env.GOOGLE_SHEET_LEGC )

console.log(process.env)


app.use(cors())
app.get( "/" , ( req ,res )=>{
    res.send("successful")
} )
app.get( "/book" , async( req , res )=>{
    res.send( await getBook.then(res=> res() ) )
})
app.get( "/commpost" , async( req , res )=>{
    res.send( await getCommpost.then(res=> res() ) )
} )
app.get( "/commpubl" , async( req , res )=>{
    res.send( await getPubl.then(res=> res() ) )
} )
app.get( "/elec" , async( req  , res)=>{
    res.send( await getElec.then( res=> res() ) )
})
app.get( "/govp" , async( req  , res)=>{
    res.send( await getGovp.then( res=> res() ) )
})
app.get( "/legc" , async( req  , res)=>{
    res.send( await getLegc.then( res=> res() ) )
})

app.listen( port ) 