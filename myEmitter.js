import {EventEmitter} from "node:events"
import { setTimeout } from "node:timers/promises"

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
    console.log(`Email generated for ${customer.email}`)
}

//Registering the emitterExample:
emailRequestEmitter.on("emailRequest", generateEmail)
emailRequestEmitter.on("emailRequest", () => console.log("This is the second event emitter"))
emailRequestEmitter.on("emailRequest", () => console.log("This is the third event emitter"))



// Emit the event
emailRequestEmitter.emit("emailRequest", customerDetails)

setTimeout(2000);
