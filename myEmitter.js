import {EventEmitter} from "node:events"

//Mock customer
const customerDetails = {
    fullName: "Meryl Sheep",
    email: "baaaahhaaah@gmail.com",
    phone: 7186797862
}

//Create the emitter
const emailRequestEmitter = new EventEmitter()

//Defining the listening function
function generateEmail(customer){
    console.log(`Email generated for ${customer.fullName}`)
}

//Registering the emitterExample:
emailRequestEmitter.on("emailRequest", generateEmail)

// Emit the event
emailRequestEmitter.emit("emailRequest", customerDetails)
