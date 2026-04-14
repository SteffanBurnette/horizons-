import http from "node:http"

const server = http.createServer((req, res) =>{

    //The URL constructor takes in as parameters:
    //1. The relative url
    //2. 
    //Returns a url object with all the information needed
    const urlObj = new URL(req.url, `http://${req.headers.host}`)

    //Converting the search parameters into objects
    const queryObj = Object.fromEntries(urlObj.searchParams)

    console.log(urlObj)
    console.log(queryObj)
    res.end()
})

server.listen(3000, () =>{
    console.log("The server is up and running on port 3000")
})