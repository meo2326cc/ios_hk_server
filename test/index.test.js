import getData from "../getdata.js";
import 'dotenv/config'

const paths = [
    process.env.GOOGLE_SHEET_BOOK,
    process.env.GOOGLE_SHEET_COMM_POST,
    process.env.GOOGLE_SHEET_COMM_PUBL,
    process.env.GOOGLE_SHEET_ELEC,
    process.env.GOOGLE_SHEET_GOVP,
    process.env.GOOGLE_SHEET_LEGC,
    process.env.GOOGLE_SHEET_POPY,
    process.env.GOOGLE_SHEET_NGOA,
    process.env.GOOGLE_SHEET_NGOP,
    process.env.GOOGLE_SHEET_OVSE,
    process.env.GOOGLE_SHEET_PERO,
    process.env.GOOGLE_SHEET_UKNA,
]

 test.each( paths )
 ( 'api路徑取得資料' , async( path )=>{
    const test = getData(path)
    const result = await test.then( res => res() )
    expect( await result ).toBeInstanceOf(Array);     
 } , 5000 )