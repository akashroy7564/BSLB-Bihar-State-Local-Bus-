import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
    BusName: {
        type: String,
        required: true,
    },
    busNumber: {
        type: String,
        required: true,
    },
    busType: {
        type: String,
        required: true,
    },

}, {
    timeStamps: true
})
export default mongoose.model("Bus", BusSchema)