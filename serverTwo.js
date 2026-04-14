import http from 'node:http'
import {getDataFromDB} from "./db.js"
import { sendJSONResponse } from './sendJSONResponse.js'
import { getDataByPathParams } from './getDataByPathParams.js'

const PORT = 3000


const server = http.createServer( async (req, res) =>{

    const destinations = await getDataFromDB()

    if(req.url === "/api" && req.method === "GET"){
        
        sendJSONResponse(res, 200, destinations)
        
    } else if(req.url.startsWith("/api/continent") && req.method === "GET"){
        //Because nodejs does not have a built in method to extract a potential
        //path parameter, I will have to do it manually
        const continent = req.url.split("/").pop() //Extracting the last element
        
        const filteredData = getDataByPathParams(destinations, "continent", continent)
        
        sendJSONResponse(res, 200, filteredData)
        

    } else if(req.url.startsWith("/api/country") && req.method === "GET"){
        //Because nodejs does not have a built in method to extract a potential
        //path parameter, I will have to do it manually
        const country = req.url.split("/").pop() //Extracting the last element
        console.log(country)
        
        const filteredData = getDataByPathParams(destinations, "country", country)

        sendJSONResponse(res, 200, filteredData)

    }else {
        res.setHeader("Content-Type", "application/json")
        res.statusCode = 404
        res.end(JSON.stringify({
            error: "Not Found", 
            message: "The requested route does not exist"
        }))
    }

})

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})