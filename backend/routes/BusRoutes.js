import express from "express";

import {
    addBus,
    addRoute,
    searchBus,
    getBusRoute
} from "../controller/busController.js";

const router = express.Router();

router.post("/add-bus", addBus);

router.post("/add-route", addRoute);

router.get("/search", searchBus);
router.get("/:id", getBusRoute);

export default router;