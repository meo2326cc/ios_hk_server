import Express from "express";
import axios from 'axios'
import getData from "./getdata.js";
import cors from 'cors'
import 'dotenv/config'

const app = Express()
const port = process.env.PORT
const getBook = getData( process.env.GOOGLE_SHEET_BOOK )
const getFocus = getData( process.env.GOOGLE_SHEET_FOCUS )
const getAv = getData( process.env.GOOGLE_SHEET_AV )
const getElec = getData( process.env.GOOGLE_SHEET_ELEC )
const getGovp = getData( process.env.GOOGLE_SHEET_GOVP )
const getGova = getData( process.env.GOOGLE_SHEET_GOVA )
const getLegc = getData( process.env.GOOGLE_SHEET_LEGC )
const getPopy = getData( process.env.GOOGLE_SHEET_POPY )
const getCrea = getData( process.env.GOOGLE_SHEET_CREA )
const getOvse = getData( process.env.GOOGLE_SHEET_OVSE )
const getPero = getData( process.env.GOOGLE_SHEET_PERO )
const getJudi = getData( process.env.GOOGLE_SHEET_JUDI )
const getComm = getData( process.env.GOOGLE_SHEET_COMM )
const getNgo = getData( process.env.GOOGLE_SHEET_NGO )


app.use(cors())
app.get( "/" , ( req ,res )=>{
    res.send("successful")
} )
app.get( "/book" , async( req , res )=>{
    res.send( await getBook.then(res=> res() ) )
})
app.get( "/focus" , async( req , res )=>{
    res.send( await getFocus.then(res=> res() ) )
} )
app.get( "/av" , async( req , res )=>{
    res.send( await getAv.then(res=> res() ) )
} )
app.get( "/elec" , async( req  , res)=>{
    res.send( await getElec.then( res=> res() ) )
})
app.get( "/govp" , async( req  , res)=>{
    res.send( await getGovp.then( res=> res() ) )
})
app.get( "/gova" , async( req  , res)=>{
    res.send( await getGova.then( res=> res() ) )
})
app.get( "/legc" , async( req  , res)=>{
    res.send( await getLegc.then( res=> res() ) )
})
app.get( "/popy" , async( req  , res)=>{
    res.send( await getPopy.then( res=> res() ) )
})
app.get( "/crea" , async( req  , res)=>{
    res.send( await getCrea.then( res=> res() ) )
})
app.get( "/ovse" , async( req  , res)=>{
    res.send( await getOvse.then( res=> res() ) )
})
app.get( "/pero" , async( req  , res)=>{
    res.send( await getPero.then( res=> res() ) )
})
app.get( "/judi" , async( req  , res)=>{
    res.send( await getJudi.then( res=> res() ) )
})
app.get( "/comm" , async( req  , res)=>{
    res.send( await getComm.then( res=> res() ) )
})
app.get( "/ngo" , async( req  , res)=>{
    res.send( await getNgo.then( res=> res() ) )
})

app.listen( port ) 