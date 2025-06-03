import { Request, Response } from "express";
import { fetchLatestPmRecords } from "../models/pmModel";

export async function getPm(req: Request, res: Response): Promise<Response> {
  const ids: string[] = req.query.id ? req.query.id.toString().split(",") : [];
  const now = new Date();

  try {
    const averageValue = await fetchLatestPmRecords(ids, now);

    if (averageValue !== null) {
      return res.json({ success: true, data: averageValue });
    }

    return res.json({ success: false, data: null, error: "No data found" });
  } catch (err) {
    console.error("Error fetching PM data:", err);
    return res.status(500).json({ success: false, data: null, error: "Internal server error" });
  }
}
