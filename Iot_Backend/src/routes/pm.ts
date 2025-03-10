import express from "express";
import getPm from "../controller/getPm.ts";

const pmRouter = express.Router();

pmRouter.get("/getPm", getPm);

export default pmRouter;
