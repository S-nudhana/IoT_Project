import { Typography, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { AQI_Catagory } from "../utils/Calculation";

interface Sensor {
  buildingRoom: string;
  building: string;
  floor: number;
  key: string | string[];
  chart: string;
}

interface CardProps {
  index: number;
  item: Sensor;
  keyString: string;
  pmData: Record<string, any>;
}

export default function Card({ index, item, keyString, pmData }: CardProps) {
  const navigate = useNavigate();
  const pmInfo = AQI_Catagory(pmData[keyString]);

  return (
    <Box
      key={index}
      sx={{
        width: { xs: "330px", md: "320px", lg: "340px" },
        height: "auto",
        backgroundColor: "white",
        borderRadius: "20px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        padding: "20px",
        cursor: "pointer",
        transition: "0.2s ease-in-out",
        ":hover": {
          boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
          transform: "scale(1.01)",
        },
      }}
      onClick={() =>
        navigate(`/detail/${encodeURIComponent(item.buildingRoom)}`)
      }
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <img
          src={pmInfo.image}
          alt="AQI picture"
          className="w-[120px] h-[120px]"
        />
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              color: "#336699",
            }}
          >
            {item.buildingRoom}
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
        </Box>
      </Box>
      <Divider />
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: "500",
          mt: "10px",
        }}
      >
        คุณภาพอากาศ{" "}
        <span className="font-semibold" style={{ color: pmInfo.color }}>
          {pmInfo.description}
        </span>
      </Typography>
    </Box>
  );
}
