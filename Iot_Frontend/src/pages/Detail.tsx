import { useEffect, useState, useCallback } from "react";
import { useParams, ScrollRestoration } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackBTN from "../components/BackBTN";

import axiosInstance from "../utils/axiosInstance";
import { allSensor } from "../utils/allSensor";
import { AQI_Catagory } from "../utils/Catagory";
<<<<<<< HEAD
import type { Sensor } from "../types/sensor";
=======

import { theme } from "../theme";

interface Sensor {
  buildingRoom: string;
  building: string;
  floor: number;
  key: string | string[];
  chart: string;
}
>>>>>>> e1a83c5a6cbf76995885224a37c909eed2ca8dc2

export default function Detail() {
  const { building, floor, room } = useParams();
  const [pmData, setPmData] = useState<Record<string, any>>({});
  const [outDoorPmData, setOutDoorPmData] = useState<Record<string, any>>({});
  const pmInfo = AQI_Catagory(pmData[Object.keys(pmData)[0]] ?? null);
  const pmOutdoorInfo = AQI_Catagory(
    outDoorPmData[Object.keys(outDoorPmData)[0]] ?? null
  );
  const indoorBuilding: Sensor[] = allSensor.filter(
    (item) => room && item.buildingRoom === room && item.building === building && item.floor === Number(floor)
  );
  const outdoorBuilding: Sensor[] = allSensor.filter(
    (item) => item.outdoor === true && indoorBuilding[0]?.building === item.building
  );
  const sameSensor: boolean = indoorBuilding[0]?.key === outdoorBuilding[0]?.key;

  const fetchData = useCallback(
    async (keys: string | string[], type: string) => {
      try {
        const keyString = Array.isArray(keys) ? keys.join(",") : keys;
        const response = await axiosInstance.get(`/pm/getPm?id=${keyString}`);
        if (type === "outdoor") {
          setOutDoorPmData((prevData: any) => ({
            ...prevData,
            [keyString]: response.data.data,
          }));
          return;
        }
        setPmData((prevData: any) => ({
          ...prevData,
          [keyString]: response.data.data,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    []
  );
  useEffect(() => {
    const keys = Array.isArray(indoorBuilding[0]?.key)
      ? indoorBuilding[0]?.key
      : [indoorBuilding[0]?.key];
    fetchData(keys, "indoor");
    if (sameSensor) return;
    const outdoorKeys = Array.isArray(outdoorBuilding[0]?.key)
      ? outdoorBuilding[0]?.key
      : [outdoorBuilding[0]?.key];
    fetchData(outdoorKeys, "outdoor");
  }, [fetchData]);

  return (
    <Box>
      <ScrollRestoration />
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
          pt: "80px",
        }}
      >
        <Box sx={{
          width: { xs: "85%", sm: "93%", lg: "92%" },
          [theme.breakpoints.up('xxl')]: { width: '85%' },
        }}>
          <BackBTN />
        </Box>
        <Box
          sx={{
            width: { xs: "85%", sm: "93%", lg: "92%" },
            [theme.breakpoints.up('xxl')]: { width: '85%' },
            height: "auto",
            padding: "20px",
            bgcolor: "white",
            borderRadius: "20px",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "space-between" },
            alignItems: { xs: "center", sm: "start" },
            gap: "20px",
            mb: "30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              gap: "30px",
            }}
          >
            <img
              src={pmInfo.image}
              alt="AQI picture"
              className="w-[230px] h-[230px] rounded-full"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: { xs: "center", sm: "start" },
                gap: "7px",
              }}
            >
              <Typography
                sx={{ fontSize: "24px", fontWeight: "600", color: "#336699" }}
              >
                {indoorBuilding[0]?.buildingRoom}
              </Typography>
              <Typography
                sx={{
                  color: "#343333",
                  fontSize: "48px",
                  fontWeight: "600",
                }}
              >
                {pmInfo.pm}
                <Typography component="sub"> µg/m³</Typography>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                คุณภาพอากาศอยู่ในเกณฑ์{" "}
                <span className="font-semibold" style={{ color: pmInfo.color }}>
                  {pmInfo.description}
                </span>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Typography sx={{ fontWeight: "500" }}>
                  คำแนะนำ:{" "} {pmInfo.recommend}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: sameSensor ? "none" : "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: { xs: "100%", md: "auto" },
              height: "fit-content",
              borderRadius: "15px",
              padding: "10px 20px 20px",
              bgcolor: "#336699",
              color: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Typography
                sx={{
                  pt: "5px",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                {outdoorBuilding[0]?.buildingRoom}
              </Typography>
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: "500",
                }}
              >
                {pmOutdoorInfo.pm}
              </Typography>
              <Typography component="sub"> µg/m³</Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "400",
                mt: "5px",
              }}
            >
              คุณภาพอากาศ{" "}
              <span
                className="font-semibold"
                style={{ color: pmOutdoorInfo.color }}
              >
                {pmOutdoorInfo.description}
              </span>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "85%", sm: "93%", lg: "92%" },
            [theme.breakpoints.up('xxl')]: { width: '85%' },
            height: "auto",
            padding: "20px",
            bgcolor: "white",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: "10px", md: "20px" },
            mb: "30px",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "18px", md: "24px" },
              fontWeight: "600",
              display: "flex",
              alignItems: "start",
              gap: "5px",
            }}
          >
            ประวัติของดัชนีคุณภาพอากาศ
            <Typography component="sub"> (µg/m³)</Typography>
          </Typography>
          {indoorBuilding[0]?.chart ? (
            <iframe
              src={indoorBuilding[0]?.chart}
              className="w-full h-[300px] md:h-[500px]"
            ></iframe>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>*ไม่มีข้อมูลประวัติของดัชนีคุณภาพอากาศ</Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
