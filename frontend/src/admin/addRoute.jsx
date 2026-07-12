import { useState } from "react"
import api from "../api/axios.js"
export default function AddRoute() {

    const [form, setForm] = useState({
        busName: "",
        busNumber: "",
        busType: "",
        from: "",
        to: "",
        depart: "",
        arrival: "",
        fare: "",
        stops: ""
    })
    const [msg, setMsg] = useState("")

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = {
                ...form,
                stops: form.stops.split(",").map(stop => stop.trim()),
            };

            const res = await api.post("/bus/add-route", data);

            setMsg(res.data.message);

            setForm({
                busName: "",
                busNumber: "",
                busType: "",
                from: "",
                to: "",
                depart: "",
                arrival: "",
                fare: "",
                stops: "",
            });
        } catch (err) {
            setMsg(err.response?.data?.message || "Something went wrong");
        }
    }




    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-cyan-100 flex items-center justify-center py-10 px-4">

            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8">

                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-teal-700">
                        Add Bus Route
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Add a new bus route for Bihar State Local Bus
                    </p>
                </div>

                {/* Success Message */}
                {msg && (
                    <div className="mb-6 rounded-lg bg-green-100 border border-green-300 text-green-700 px-4 py-3">
                        {msg}
                    </div>
                )}

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >

                    <input
                        type="text"
                        name="busName"
                        placeholder="Bus Name"
                        value={form.busName}
                        onChange={handleChange}
                        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    <input
                        type="text"
                        name="busNumber"
                        placeholder="Bus Number"
                        value={form.busNumber}
                        onChange={handleChange}
                        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    <input
                        type="text"
                        name="busType"
                        placeholder="Bus Type"
                        value={form.busType}
                        onChange={handleChange}
                        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    <input
                        type="text"
                        name="fare"
                        placeholder="Fare (₹)"
                        value={form.fare}
                        onChange={handleChange}
                        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    <input
                        type="text"
                        name="from"
                        placeholder="From"
                        value={form.from}
                        onChange={handleChange}
                        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    <input
                        type="text"
                        name="to"
                        placeholder="To"
                        value={form.to}
                        onChange={handleChange}
                        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    <input
                        type="time"
                        name="depart"
                        value={form.depart}
                        onChange={handleChange}
                        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    <input
                        type="time"
                        name="arrival"
                        value={form.arrival}
                        onChange={handleChange}
                        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    {/* Stops */}
                    <textarea
                        name="stops"
                        rows="4"
                        placeholder="Stops (Comma Separated)"
                        value={form.stops}
                        onChange={handleChange}
                        className="md:col-span-2 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                    ></textarea>

                    {/* Button */}
                    <button
                        type="submit"
                        className="md:col-span-2 bg-gradient-to-r from-teal-600 to-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:from-teal-700 hover:to-green-700 transition duration-300 shadow-lg"
                    >
                        Add Route
                    </button>

                </form>
            </div>
        </div>
    );
    
}