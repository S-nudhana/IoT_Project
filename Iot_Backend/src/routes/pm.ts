import express from "express";
import getPm from "../controller/getPm";

const pmRouter = express.Router();

try {
  pmRouter.get("/getPm", getPm);
}
catch (error) {
    console.error("Error setting up pmRouter:", error);
}
// pmRouter.get("/getPm", getPm);

export default pmRouter;
