import { Request, Response } from "express";
import influx from "../services/connect";
import type { PmRecord } from "../types/pm";

export async function getPm(req: Request, res: Response): Promise<Response> {
  const ids: string[] = req.query.id ? req.query.id.toString().split(",") : [];
  const now: Date = new Date();

  try {
    const promises: Promise<PmRecord[]>[] = ids.map((id: string) =>
      influx.query(`SELECT * FROM "${id}" WHERE sensor='PM2.5' ORDER BY time DESC LIMIT 1`).then((result: any) => {
        return result.map((record: any) => ({
          time: record.time.toISOString(),
          value: record.value,
        }));
      })
    );

    const results: PmRecord[][] = await Promise.all(promises);
    let divider: number = 0;

    if (results.every((result) => Array.isArray(result) && result.length > 0)) {
      const values: number[] = results.map((result) => {
        const record = result[0];
        const recordTime = new Date(record.time);
        const timeDiff = (now.getTime() - recordTime.getTime()) / (1000 * 60);
        if (timeDiff > 30) return 0;
        divider = record.value === 0 ? divider : divider + 1;
        return record.value;
      });

      const avg = Math.round(values.reduce((sum, val) => sum + val, 0) / divider);

      return res.json({ success: true, data: avg });
    } else {
      return res.json({ success: false, data: null, error: "No data found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ success: false, data: null, error: "Internal server error" });
  }
}
