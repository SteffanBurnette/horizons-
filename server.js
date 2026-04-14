import http from 'node:http'
import { getDataFromDB } from "./db.js"
import { sendJSONResponse } from "./sendJSONResponse.js"
import { getDataByPathParams } from "./getDataByPathParams.js"

const PORT = 3000

const server = http.createServer( async (req, res) =>{
    const destinations = await getDataFromDB()

    const urlObj = new URL(req.url, `http://${req.headers.host}`)

    const queryObj = Object.fromEntries(urlObj.searchParams)

    console.log(queryObj)

    if(urlObj.pathname === "/api" && req.method === "GET"){

        let filteredDestinations = destinations
        sendJSONResponse(res, 200, filteredDestinations)
    } else if(req.url.startsWith("/api/content") && req.method === "GET"){

        const continent = req.url.split("/").pop()
        const filteredData = getDataByPathParams(destinations, "continent", continent)
        sendJSONResponse(res, 200, filteredData)

    } else if(req.url.startsWith("/api/country") && req.method === "GET"){
        
        const country = req.url.split("/").pop()
        const filteredData = getDataByPathParams(destinations, "country", country)
        sendJSONResponse(res, 200, filteredData)
    }else{
        res.end()
    }
})

server.listen(PORT, ()=>{
    console.log("The server is listening to port 3000")
})