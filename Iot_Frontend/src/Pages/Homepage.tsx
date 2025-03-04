import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Card from "../Components/Card";

import { allSensor } from "../utils/allSensor";
import axiosInstance from "../utils/axiosInstance";

interface Sensor {
  buildingRoom: string;
  building: string;
  floor: number;
  key: string | string[];
  chart: string;
}

export default function App() {
  const [value, setValue] = useState<string>("SIT");
  const [floor, setFloor] = useState<number[]>([]);
  const [selectedFloor, setSelectedFloor] = useState<number>(0);
  const [pmData, setPmData] = useState<Record<string, any>>({});

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

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
    const floor = getFloor(newValue);
    setFloor(floor);
    setSelectedFloor(floor[0]);
  };

  const getFloor = (building: string) => {
    const sensor: Sensor[] = allSensor.filter(
      (item) => item.building === building
    );
    const floorList: number[] = sensor.map((item) => item.floor);
    return [...new Set(floorList)];
  };

  useEffect(() => {
    const floor = getFloor(value);
    setFloor(floor);
    setSelectedFloor(floor[0]);
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Header />
      </Box>
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "85%",
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
        }}
      >
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: "500",
          }}
        >
          เลือกอาคารเรียน
        </Typography>
        <FormControl
          sx={{
            my: "10px",
            width: "full",
            display: { xs: "flex", sm: "none" },
          }}
        >
          <Select
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              const floor = getFloor(e.target.value);
              setFloor(floor);
              setSelectedFloor(floor[0]);
            }}
          >
            <MenuItem value={"SIT"}>อาคารเทคโนโลยีสารสนเทศ (SIT)</MenuItem>
            <MenuItem value={"CB2"}>อาคารเรียนรวม 2 (CB2)</MenuItem>
            <MenuItem value={"LX"}>อาคารเรียนรู้พหุวิทยาการ (Lx)</MenuItem>
          </Select>
        </FormControl>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mt: {lg:"10px"},
            display: { xs: "none", sm: "block" },
          }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="อาคารเทคโนโลยีสารสนเทศ (SIT)" value={"SIT"} sx={{fontSize: "16px"}}/>
            <Tab label="อาคารเรียนรวม 2 (CB2)" value={"CB2"} sx={{fontSize: "16px"}}/>
            <Tab label="อาคารเรียนรู้พหุวิทยาการ (Lx)" value={"LX"} sx={{fontSize: "16px"}}/>
          </Tabs>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "10px",
            m: {xs: "10px 0 20px 0", sm: "20px 0"},
          }}
        >
          {floor.map((item, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: selectedFloor === item ? "#336699" : "#EAE7E4",
                color: selectedFloor === item ? "white" : "#6E6E6E",
                borderRadius: "50px",
                padding: { xs: "3px 18px", md: "3px 25px" },
                fontSize: "16px",
                fontWeight: "400",
                alignContent: "center",
                cursor: "pointer",
                transition: "0.2s ease-in-out",
                ":hover": {
                  bgcolor: selectedFloor === item ? "" : "#d1cfcd",
                },
              }}
              onClick={() => setSelectedFloor(item)}
            >
              ชั้น {item}
            </Box>
          ))}
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: {xs: "center", md: "flex-start"},
          gap: "20px",
          m: "10px 0 40px",
        }}>
          {allSensor
            .filter(
              (item) =>
                item.building === value && item.floor === selectedFloor
            )
            .map((item, index) => {
              const keyString = Array.isArray(item.key)
                ? item.key.join(",")
                : item.key;
              return (
                <Card index={index} item={item} keyString={keyString} pmData={pmData}/>
              );
            })}
        </Box>
      </Box>
      <Box sx={{ zIndex: 3 }}>
        <Footer />
      </Box>
    </>
  );
}
