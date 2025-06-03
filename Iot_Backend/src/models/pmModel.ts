import influx from "../services/connect";
import type { PmRecord } from "../types/pm";

export async function fetchLatestPmRecords(ids: string[], now: Date): Promise<number | null> {
  const promises: Promise<PmRecord[]>[] = ids.map((id: string) =>
    influx.query(`SELECT * FROM "${id}" WHERE sensor='PM2.5' ORDER BY time DESC LIMIT 1`).then((result: any) => {
      return result.map((record: any) => ({
        time: record.time.toISOString(),
        value: record.value,
      }));
    })
  );

  const results: PmRecord[][] = await Promise.all(promises);

  if (results.every(result => Array.isArray(result) && result.length > 0)) {
    let divider = 0;

    const values: number[] = results.map(result => {
      const record = result[0];
      const recordTime = new Date(record.time);
      const timeDiffMinutes = (now.getTime() - recordTime.getTime()) / (1000 * 60);

      if (timeDiffMinutes > 30) return 0;

      if (record.value !== 0) divider += 1;
      return record.value;
    });

    if (divider === 0) return null;

    return Math.round(values.reduce((sum, v) => sum + v, 0) / divider);
  }

  return null;
}
