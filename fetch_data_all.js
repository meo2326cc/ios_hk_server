import axios from "axios";
import 'dotenv/config'

// 儲存快取資料
let cachedData = {};
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 快取時間5分鐘

export default async function fetchSheetData(sheetLinks, apiKey, keyword) {
    const currentTime = new Date().getTime();
    const searchResults = [];

    // 檢查是否需要重新獲取資料
    if (!lastFetchTime || currentTime - lastFetchTime > CACHE_DURATION) {
        // 重新獲取所有sheet資料
        for (const link of sheetLinks) {
            try {
                const res = await axios.get(link, {
                    headers: { 'X-goog-api-key': apiKey }
                });
                cachedData[link] = res.data.values;
            } catch (error) {
                console.error(`Error fetching ${link}:`, error);
                cachedData[link] = null;
            }
        }
        lastFetchTime = currentTime;
    }

    // 使用快取資料進行搜尋
    for (const link of sheetLinks) {
        const rows = cachedData[link];
        if (!rows || rows.length === 0) continue;

        rows.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell.includes(keyword)) {
                    searchResults.push({
                        sheet: link.split('/')[7],
                        row: rowIndex + 1,
                        column: cellIndex + 1,
                        value: row
                    });
                }
            });
        });
    }

    return searchResults;
}

// 使用範例
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

// fetchSheetData(sheetLinks, apiKey, '社會學')
//     .then(results => {
//         const output = { BOOK:[],FOCUS:[],AV:[],ELEC:[],GOVP:[],GOVA:[],LEGC:[],POPY:[],OVSE:[],PERO:[],JUDI:[],COMM:[],NGO:[] }

//         results.forEach((i)=>{
//             switch (i.sheet) {
//                 case "BOOK?majorDimension=ROWS":
//                     output.BOOK.push(i)
//                     break;
//                 case "_FOCUS?majorDimension=ROWS":
//                     output.FOCUS.push(i)
//                     break;
//                 case "AV?majorDimension=ROWS":
//                     output.AV.push(i)
//                     break;
//                 case "ELEC?majorDimension=ROWS":
//                     output.ELEC.push(i)
//                     break;   
//                 case "GOVP?majorDimension=ROWS":
//                     output.GOVP.push(i)
//                     break;
//                 case "GOVA?majorDimension=ROWS":
//                     output.GOVA.push(i)
//                     break; 
//                 case "LEGC?majorDimension=ROWS":
//                     output.LEGC.push(i)
//                     break;
//                 case "JUDI?majorDimension=ROWS":
//                     output.JUDI.push(i)
//                     break;
//                 case "POPY?majorDimension=ROWS":
//                     output.POPY.push(i)
//                     break;
//                 case "OVSE?majorDimension=ROWS":
//                     output.OVSE.push(i)
//                     break;   
//                 case "PERO?majorDimension=ROWS":
//                     output.PERO.push(i)
//                     break;     
//                 case "COMM?majorDimension=ROWS":
//                     output.COMM.push(i)
//                     break;
//                 case "NGO?majorDimension=ROWS":
//                     output.NGO.push(i)
//                     break;    
//                 default:
//                     break;
//             }
//         })
//         return output
//         //console.log(output)
//     }).catch(console.error);