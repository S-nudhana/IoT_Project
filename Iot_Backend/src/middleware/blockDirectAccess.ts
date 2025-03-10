import { Request, Response, NextFunction } from "express";

export const blockDirectAccess = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin || req.headers.referer;
    if (!origin) {
        res.status(403).type("text/plain").send("Forbidden");
        return;
    }
    if (origin !== process.env.PRODUCTION_ORIGIN && origin !== process.env.DEVELOPMENT_ORIGIN) {
        res.status(403).type("text/plain").send("Forbidden");
        return;
    }
    next();
};
