import Bus from "../model/bus.js";
import Route from "../model/route.js";


// Add New Bus
export const addBus = async (req, res) => {
    try {

        const bus = await Bus.create(req.body);

        res.status(201).json({
            success: true,
            message: "Bus Added Successfully",
            bus
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// Add Route
export const addRoute = async (req, res) => {

    try {

        const route = await Route.create(req.body);

        res.status(201).json({
            success: true,
            message: "Route Added Successfully",
            route
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Search Bus
// export const searchBus = async (req, res) => {

//     try {

//         const { stops} = req.query;

//         if (!stops) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Please provide from and to locations"
//             });

//         }

//         const buses = await Route.find({
//             stops: new RegExp(`^${stops}$`, "i"),
//             stops: new RegExp(`^${stops}$`, "i")
//         }).populate("busId");

//         res.status(200).json({
//             success: true,
//             total: buses.length,
//             buses
//         });

//     } catch (error) {

//         res.status(500).json({
//             success: false,
//             message: error.message
//         });

//     }

// };


export const searchBus = async (req, res) => {
    try {
        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).json({
                success: false,
                message: "Please provide both from and to locations"
            });
        }

        // Find routes containing both stops
        const routes = await Route.find({
            stops: {
                $all: [
                    new RegExp(`^${from}$`, "i"),
                    new RegExp(`^${to}$`, "i")
                ]
            }
        });

        // Keep only routes where from comes before to
        const buses = routes.filter(route => {
            const fromIndex = route.stops.findIndex(
                stop => stop.toLowerCase() === from.toLowerCase()
            );

            const toIndex = route.stops.findIndex(
                stop => stop.toLowerCase() === to.toLowerCase()
            );

            return (
                fromIndex !== -1 &&
                toIndex !== -1 &&
                fromIndex < toIndex
            );
        });

        res.status(200).json({
            success: true,
            total: buses.length,
            buses
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get Single Bus Route
export const getBusRoute = async (req, res) => {
    try {

        const bus = await Route.findById(req.params.id);

        if (!bus) {
            return res.status(404).json({
                success: false,
                message: "Bus not found"
            });
        }

        res.status(200).json({
            success: true,
            bus
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};