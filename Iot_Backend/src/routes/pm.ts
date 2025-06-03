import express from "express";
import { getPm } from "../controller/pmController";

const pmRouter = express.Router();

pmRouter.get("/getPm", (req, res, next) => {
  Promise.resolve(getPm(req, res)).catch(next);
});

export default pmRouter;
