import mongoose from "mongoose";


const RouteSchema = new mongoose.Schema({
    busName: {
        type: String,
        required: true,
    },
    busNumber:{
        type: String,
        required: true,
    },
    busType:{
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    depart: {
        type: String,
        required: true,
    },
    arrival: {
        type: String,
        required: true,
    },
    fare: {
        type: String,
        required: true,
    },
    stops: [String]
})
export default mongoose.model("Route", RouteSchema)