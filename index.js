import Express from "express";
import axios from 'axios'
import getData from "./getdata.js";
import cors from 'cors'
import 'dotenv/config'
import fetchSheetData from "./fetch_data_all.js"

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
const getArtf = getData( process.env.GOOGLE_SHEET_ARTF )
const getOvse = getData( process.env.GOOGLE_SHEET_OVSE )
const getPero = getData( process.env.GOOGLE_SHEET_PERO )
const getJudi = getData( process.env.GOOGLE_SHEET_JUDI )
const getComm = getData( process.env.GOOGLE_SHEET_COMM )
const getNgo = getData( process.env.GOOGLE_SHEET_NGO )

const apiKey = process.env.API_KEY;
const sheetLinks = [
    process.env.GOOGLE_SHEET_BOOK,
    process.env.GOOGLE_SHEET_FOCUS,
    process.env.GOOGLE_SHEET_AV,
    process.env.GOOGLE_SHEET_ELEC,
    process.env.GOOGLE_SHEET_GOVP,
    process.env.GOOGLE_SHEET_GOVA,
    process.env.GOOGLE_SHEET_LEGC,
    process.env.GOOGLE_SHEET_POPY,
    process.env.GOOGLE_SHEET_ARTF,
    process.env.GOOGLE_SHEET_OVSE,
    process.env.GOOGLE_SHEET_PERO,
    process.env.GOOGLE_SHEET_JUDI,
    process.env.GOOGLE_SHEET_COMM,
    process.env.GOOGLE_SHEET_NGO,
];


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
app.get( "/artf" , async( req  , res)=>{
    res.send( await getArtf.then( res=> res() ) )
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

app.get("/search", async(req, res) => {
    const { query } = req;
    if(query?.query) {
        try {
            const results = await fetchSheetData(sheetLinks, apiKey, query.query);
            const output = { BOOK:[], FOCUS:[], AV:[], ELEC:[], GOVP:[], GOVA:[], LEGC:[], POPY:[], OVSE:[], PERO:[], JUDI:[], COMM:[], NGO:[], ARTF:[] };

            results.forEach((i) => {
                switch (i.sheet) {
                    case "BOOK?majorDimension=ROWS":
                        output.BOOK.push(i);
                        break;
                    case "_FOCUS?majorDimension=ROWS":
                        output.FOCUS.push(i);
                        break;
                    case "AV?majorDimension=ROWS":
                        output.AV.push(i);
                        break;
                    case "ELEC?majorDimension=ROWS":
                        output.ELEC.push(i);
                        break;   
                    case "GOVP?majorDimension=ROWS":
                        output.GOVP.push(i);
                        break;
                    case "GOVA?majorDimension=ROWS":
                        output.GOVA.push(i);
                        break; 
                    case "LEGC?majorDimension=ROWS":
                        output.LEGC.push(i);
                        break;
                    case "JUDI?majorDimension=ROWS":
                        output.JUDI.push(i);
                        break;
                    case "POPY?majorDimension=ROWS":
                        output.POPY.push(i);
                        break;
                    case "OVSE?majorDimension=ROWS":
                        output.OVSE.push(i);
                        break;   
                    case "PERO?majorDimension=ROWS":
                        output.PERO.push(i);
                        break;     
                    case "COMM?majorDimension=ROWS":
                        output.COMM.push(i);
                        break;
                    case "NGO?majorDimension=ROWS":
                        output.NGO.push(i);
                        break;
                    case "ARTF?majorDimension=ROWS":
                        output.ARTF.push(i);
                        break;    
                    default:
                        break;
                }
            });
            res.json(output);
        } catch(error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(400).json({ error: "Query parameter is required" });
    }
});

app.listen(port)