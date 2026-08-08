import { useEffect, useState } from "react";
import { FaBus } from "react-icons/fa";
import api from "../api/axios";
import { Link } from "react-router";
import { RxDotsVertical } from "react-icons/rx";

export default function HomePage() {

    const [busDetail, setBusDetail] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        from: "",
        to: "",
    });

    const [openMenu, setOpenMenu] = useState(false);

    const { from, to } = form;

    // Load previous search from localStorage
    useEffect(() => {
        const data = localStorage.getItem("busSearch");

        if (data) {
            try {
                const parsed = JSON.parse(data);

                setBusDetail(parsed.buses || []);
                setForm(parsed.form || {
                    from: "",
                    to: ""
                });

            } catch (err) {
                console.error("LocalStorage error:", err);
                localStorage.removeItem("busSearch");
            }
        }
    }, []);

    // Input change
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Search Bus
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await api.get(
                `/bus/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
            );

            console.log("Bus API response:", res.data);

            setBusDetail(res.data.buses || []);

            localStorage.setItem(
                "busSearch",
                JSON.stringify({
                    buses: res.data.buses || [],
                    form,
                })
            );

        } catch (err) {
            console.error("Bus search error:", err);

            setBusDetail([]);

        } finally {
            // This ALWAYS runs
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-green-100">

            {/* Header */}
            <div className="bg-white shadow-md py-8 px-4">

                <button
                    onClick={() => setOpenMenu(!openMenu)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <RxDotsVertical className="text-2xl text-gray-600" />
                </button>

                {openMenu && (
                    <div className="absolute top-14 right-4 w-48 bg-white rounded-lg shadow-xl border z-50 overflow-hidden">

                        <Link to="/developer">
                            <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
                                🏠 Developer
                            </button>
                        </Link>

                        <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
                            ⭐ Favorite Routes
                        </button>

                        <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
                            📍 Live Tracking
                        </button>

                    </div>
                )}

                <div className="max-w-md mx-auto text-center">

                    <FaBus className="mx-auto text-5xl text-green-600" />

                    <h1 className="text-3xl font-bold mt-3 text-gray-800">
                        Bihar Bus Route
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Find buses between any two locations
                    </p>

                </div>

            </div>

            {/* Main Content */}
            <div className="max-w-md mx-auto px-4 py-6">

                {/* Search Form */}
                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <input
                            name="from"
                            type="text"
                            placeholder="Enter From Location"
                            value={form.from}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />

                        <input
                            name="to"
                            type="text"
                            placeholder="Enter To Location"
                            value={form.to}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full text-white py-3 rounded-xl font-semibold transition ${loading
                                ? "bg-green-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                                }`}
                        >

                            {loading ? (
                                <div className="flex justify-center items-center gap-2">

                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                                    Searching...

                                </div>
                            ) : (
                                "Search Bus"
                            )}

                        </button>

                    </form>

                </div>

                {/* Search Result */}
                <div className="bg-green-100 rounded-2xl shadow-lg mt-6 p-5">

                    <h2 className="text-xl font-semibold border-b pb-3 mb-4">
                        Search Result
                    </h2>

                    {/* Scrollable Area */}
                    <div className="h-[420px] overflow-y-auto pr-2 space-y-4">

                        {loading ? (

                            /* Loading */
                            <div className="flex flex-col justify-center items-center h-full">

                                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>

                                <p className="mt-4 text-gray-600 font-medium">
                                    Finding buses...
                                </p>

                            </div>

                        ) : busDetail.length > 0 ? (

                            /* Bus Results */
                            busDetail.map((bus) => (

                                <Link
                                    key={bus._id}
                                    to={`/bus/${bus._id}`}
                                    className="block"
                                >

                                    <div className="bg-gray-50 border rounded-xl p-4 hover:shadow-md transition">

                                        {/* Top */}
                                        <div className="flex justify-between items-center">

                                            <div>

                                                <h3 className="text-gray-500 text-sm">
                                                    {bus.busName}
                                                </h3>

                                                <p className="text-lg font-bold text-gray-800">
                                                    {bus.busNumber}
                                                </p>

                                            </div>

                                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                {bus.busType}
                                            </span>

                                        </div>

                                        {/* Route */}
                                        <div className="flex justify-between items-center mt-4 bg-white border rounded-lg p-3">

                                            <div className="text-center">

                                                <p className="text-xs text-gray-500">
                                                    From
                                                </p>

                                                <h4 className="font-semibold text-gray-800 capitalize">
                                                    {bus.from}
                                                </h4>

                                            </div>

                                            <div className="flex-1 mx-4">

                                                <div className="border-t-2 border-dashed border-gray-300 relative">

                                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-1 text-lg">
                                                        🚌
                                                    </span>

                                                </div>

                                            </div>

                                            <div className="text-center">

                                                <p className="text-xs text-gray-500">
                                                    To
                                                </p>

                                                <h4 className="font-semibold text-gray-800 capitalize">
                                                    {bus.to}
                                                </h4>

                                            </div>

                                        </div>

                                        {/* Time */}
                                        <div className="flex justify-between items-center mt-4">

                                            <div className="text-center">

                                                <p className="text-xs text-gray-500">
                                                    Departure
                                                </p>

                                                <h4 className="font-bold text-green-600">
                                                    {bus.depart}
                                                </h4>

                                            </div>

                                            <div className="text-gray-400 text-2xl">
                                                🕒
                                            </div>

                                            <div className="text-center">

                                                <p className="text-xs text-gray-500">
                                                    Arrival
                                                </p>

                                                <h4 className="font-bold text-red-500">
                                                    {bus.arrival}
                                                </h4>

                                            </div>

                                        </div>

                                    </div>

                                </Link>

                            ))

                        ) : (

                            /* No Results */
                            <div className="flex items-center justify-center h-full text-gray-500 text-center">
                                Search a route to view available buses.
                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}