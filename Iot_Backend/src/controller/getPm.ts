import { Request, Response } from "express";
import influx from "../services/connect";

interface PmRecord {
  time: string;
  value: number;
}

const getPm = async (req: Request, res: Response): Promise<void> => {
  const ids: string[] = req.query.id ? (req.query.id as string).split(",") : [];
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
    if (results.every((result: PmRecord[]) => Array.isArray(result) && result.length > 0)) {
      const values: number[] = results.map((result: PmRecord[]) => {
        const record: PmRecord = result[0];
        const recordTime: Date = new Date(record.time);
        const timeDifference: number = (now.getTime() - recordTime.getTime()) / (1000 * 60);
        if (timeDifference > 30) {
          return 0;
        }
        divider = record.value === 0 ? divider : divider + 1;
        return record.value;
      });
      const averageValue: number = Math.round(values.reduce((sum, value) => sum + value, 0) / divider);
      res.json({
        success: true,
        data: averageValue,
      });
    } else {
      res.json({
        success: false,  
        data: null,
        error: "No data found",
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      data: null,
      error: error,
    });
  }
};

export default getPm;
