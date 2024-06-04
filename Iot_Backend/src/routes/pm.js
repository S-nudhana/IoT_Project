import express from "express";
import getPm from "../controller/getPm.js";

const pmRouter = express.Router();

pmRouter.get("/getPm", getPm);

export default pmRouter;
