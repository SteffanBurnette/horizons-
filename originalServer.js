import http from 'node:http'
import {getDataFromDB} from "./db.js"

const PORT = 3000

const animal = {
    type: "Tiger",
    nickName: "El Tigre"
}

console.log(JSON.stringify(animal))


const server = http.createServer( async (req, res) =>{

    const destinations = await getDataFromDB()

    //Responding to a specified url endpoint
    //Only executes the code if the endpoint is invoked  
    if(req.url === "/api"){
        console.log("You have hit the /api endpoint")
    }

    //Responiding the a specified endpoint & specific method equest type
    if(req.url === "/api" && req.method === "GET"){
        //Used to specify/label the type of data being sent
        res.setHeader("Content-Type", "application/json")

        //Setting the status code
        res.statusCode = 200

        console.log("You have hit the /api endpoint with a GET request!")
        res.write(JSON.stringify(destinations))
    }else{
        //Handling errors if the route called is not found
        res.setHeader("Content-Type", "application/json")
        res.statusCode = 404
        res.end(JSON.stringify({error: "not found", message: "The requested route does not exist"}))
    }

    //When you use res.write you need to include res.end so that the browser
    //knows that the resonse has eneded
    res.write("This is written form the write method \n")
    res.write("This is written form the write method \n")




    res.end("Hello from the server of 3k", "utf8", () => console.log("Response ended")) //sends data over http and then ends the response



})

server.listen(PORT, ()=>{
    console.log(`Server is runnin on port ${PORT}`)
})