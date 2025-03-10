import { Typography, Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";

import { AQI_Catagory } from "../utils/Catagory";

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
  const pmInfo = AQI_Catagory(pmData[keyString]);

  return (
    <Link to={`/detail/${encodeURIComponent(item.buildingRoom)}`}>
      <Box
        key={index}
        sx={{
          width: { xs: "330px", sm: "365px", md: "320px", lg: "330px" },
          height: "auto",
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.05)",
          padding: "20px",
          cursor: "pointer",
          transition: "0.2s ease-in-out",
          ":hover": {
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            transform: "scale(1.01)",
          },
        }}
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
            className="w-[110px] h-[110px] mb-[15px] rounded-xl"
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
              <Typography component="sub"> µg/m³</Typography>
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
    </Link>
  );
}