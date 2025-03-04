import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useParams, ScrollRestoration } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BackBTN from "../Components/BackBTN";

import { allSensor } from "../utils/allSensor";
import { AQI_Catagory } from "../utils/Calculation";

interface Sensor {
  buildingRoom: string;
  building: string;
  floor: number;
  key: string | string[];
  chart: string;
}

export default function Detail() {
  const { Building } = useParams();
  const [pmData, setPmData] = useState<Record<string, any>>({});

  const pmInfo = AQI_Catagory(pmData[Object.keys(pmData)[0]] ?? null);
  const pmOutdoorInfo = AQI_Catagory(pmData[Object.keys(pmData)[1]] ?? null);
  const building: Sensor[] = allSensor.filter(
    (item) => item.buildingRoom === Building
  );
  const outdoorBuilding: Sensor[] = allSensor.filter(
    (item) => item.outdoor === true && building[0]?.building === item.building
  );
  const sameSensor:boolean = building[0]?.key === outdoorBuilding[0]?.key;

  const fetchData = useCallback(async (keys: string | string[]) => {
    try {
      const keyString = Array.isArray(keys) ? keys.join(",") : keys;
      const response = await axiosInstance.get(`/pm/getPm?id=${keyString}`);
      setPmData((prevData: any) => ({
        ...prevData,
        [keyString]: response.data.data,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    allSensor.forEach((card) => {
      const keys = Array.isArray(card.key) ? card.key : [card.key];
      fetchData(keys);
    });
  }, [fetchData]);

  return (
    <Box>
      <ScrollRestoration />
      <Navbar />
      <Box sx={{ pt: "90px" }}>
        <BackBTN />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "85%",
            height: "auto",
            padding: "20px",
            bgcolor: "white",
            borderRadius: "20px",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "space-between" },
            alignItems: { xs: "center", md: "start" },
            gap: "20px",
            mb: "30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <img
              src={pmInfo.image}
              alt="AQI picture"
              className="w-[250px] h-[250px] rounded-full"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "7px",
              }}
            >
              <Typography
                sx={{ fontSize: "24px", fontWeight: "600", color: "#336699" }}
              >
                {building[0]?.buildingRoom}
              </Typography>
              <Typography
                sx={{
                  color: "#343333",
                  fontSize: "48px",
                  fontWeight: "600",
                }}
              >
                {pmInfo.pm}
                <Typography component="sub"> µg/m³</Typography>
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
              <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                <Typography>คำแนะนำ:</Typography>
                <Typography>{pmInfo.recommend}</Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: sameSensor? "none" : "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: { xs: "100%", md: "250px" },
              height: "fit-content",
              borderRadius: "15px",
              padding: "20px",
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
                <Typography component="sub"> µg/m³</Typography>
              </Typography>
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
      </Box>
      <Footer />
    </Box>
  );
}
