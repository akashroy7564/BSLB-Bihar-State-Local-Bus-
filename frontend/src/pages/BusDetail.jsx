import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import api from "../api/axios";

export default function BusDetails() {

    const { id } = useParams();

    const [bus, setBus] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchBus = async () => {

            const res = await api.get(`/bus/${id}`);
            setBus(res.data.bus);

        };

        fetchBus();

    }, [id]);

    if (!bus) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">


<div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-b-3xl shadow-xl">
    <div className="max-w-4xl mx-auto px-5 py-6">

        {/* Top Row */}
        <div className="flex items-center justify-between">

            {/* Back Button */}
            <button
                onClick={() => navigate("/")}
                className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition flex items-center justify-center"
            >
                <FaArrowLeft className="text-xl text-white" />
            </button>

            {/* Bus Type */}
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold">
                {bus.busType}
            </span>

        </div>

        {/* Route */}
        <div className="mt-8">

            <div className="flex items-center justify-between">

                <div className="text-center">
                    <p className="text-sm text-green-100 uppercase tracking-wide">
                        From
                    </p>

                    <h2 className="text-2xl font-bold capitalize">
                        {bus.from}
                    </h2>

                    <p className="text-green-100 mt-1">
                        {bus.depart}
                    </p>
                </div>

                {/* Route Line */}
                <div className="flex-1 mx-5">

                    <div className="flex items-center">

                        <div className="flex-1 border-t-2 border-dashed border-white/60"></div>

                        <div className="mx-3 w-12 h-12 rounded-full bg-white text-green-600 flex items-center justify-center shadow-lg text-2xl">
                            🚌
                        </div>

                        <div className="flex-1 border-t-2 border-dashed border-white/60"></div>

                    </div>

                </div>

                <div className="text-center">
                    <p className="text-sm text-green-100 uppercase tracking-wide">
                        To
                    </p>

                    <h2 className="text-2xl font-bold capitalize">
                        {bus.to}
                    </h2>

                    <p className="text-green-100 mt-1">
                        {bus.arrival}
                    </p>
                </div>

            </div>

        </div>

        {/* Bottom Info */}
        <div className="mt-8 grid grid-cols-3 gap-4">

            <div className="bg-white/15 backdrop-blur-md rounded-xl py-3 text-center">
                <p className="text-xs text-green-100">Bus No.</p>
                <p className="font-semibold mt-1">{bus.busNumber}</p>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-xl py-3 text-center">
                <p className="text-xs text-green-100">Fare</p>
                <p className="font-semibold mt-1">₹ {bus.fare}</p>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-xl py-3 text-center">
                <p className="text-xs text-green-100">Stops</p>
                <p className="font-semibold mt-1">
                    {bus.stops.length}
                </p>
            </div>

        </div>

    </div>
</div>




            <div className="max-w-4xl mx-auto">

                {/* Bus Information Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <div className="flex justify-between items-start">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                {bus.busName}
                            </h1>

                            <p className="text-gray-500 mt-1">
                                {bus.busNumber}
                            </p>
                        </div>

                        <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold
                        ${bus.busType.toLowerCase() === "government"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                        >
                            {bus.busType}
                        </span>

                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-8">

                        <div className="text-center">
                            <p className="text-gray-500">Departure</p>

                            <h2 className="text-2xl font-bold text-green-600">
                                {bus.depart}
                            </h2>
                        </div>

                        <div className="flex items-center justify-center">

                            <div className="text-4xl">
                                🚌
                            </div>

                        </div>

                        <div className="text-center">
                            <p className="text-gray-500">Arrival</p>

                            <h2 className="text-2xl font-bold text-red-500">
                                {bus.arrival}
                            </h2>
                        </div>

                    </div>

                    <div className="mt-8 flex justify-between border-t pt-4">

                        <div>
                            <p className="text-gray-500">
                                Fare
                            </p>

                            <h3 className="text-xl font-bold text-green-700">
                                ₹ {bus.fare}
                            </h3>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Total Stops
                            </p>

                            <h3 className="text-xl font-bold">
                                {bus.stops.length}
                            </h3>
                        </div>

                    </div>

                </div>

                {/* Route Timeline */}

                <div className="bg-white rounded-2xl shadow-lg mt-8 p-6">

                    <h2 className="text-2xl font-bold mb-8">
                        Bus Route
                    </h2>

                    <div className="relative">

                        {bus.stops.map((stop, index) => (

                            <div
                                key={index}
                                className="flex items-start gap-5 pb-8 relative"
                            >

                                {/* Timeline */}

                                <div className="flex flex-col items-center">

                                    <div className="w-5 h-5 rounded-full bg-green-600 border-4 border-green-200"></div>

                                    {index !== bus.stops.length - 1 && (
                                        <div className="w-1 h-16 bg-green-300"></div>
                                    )}

                                </div>

                                {/* Stop Name */}

                                <div className="pt-[-2px]">

                                    <h3 className="text-lg font-semibold">
                                        {stop}
                                    </h3>

                                    <p className="text-gray-500 text-sm">
                                        Stop {index + 1}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}