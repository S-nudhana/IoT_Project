import { useState, useEffect, useCallback } from "react";
import { Typography, Box } from "@mui/material";
import { Link, ScrollRestoration } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

import { allSensor } from "../utils/allSensor";

import { check_Picture } from "../utils/Calculation";

export default function PmDisplay() {
  const [pmData, setPmData] = useState({});
  const fetchData = useCallback(async (keys) => {
    try {
      const keyString = Array.isArray(keys) ? keys.join(",") : keys;
      const response = await axiosInstance.get(`/pm/getPm?id=${keyString}`);
      setPmData((prevData) => ({
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

  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  const category = () => {
    if (selectedCategory === null) return "All Building";
    return `${selectedCategory} Building`;
  };

  const buildingStyle = (building) => {
    switch (building) {
      case "SIT":
        return "#ecbd4d";
      case "CB2":
        return "#498bb9";
      case "Lx":
        return "#DF5935";
    }
  };

  return (
    <Box>
      <ScrollRestoration />
      <Box
        sx={{
          padding: { xs: "2% 2% 2% 5%", lg: "2% 4% 2% 4%", xl: "2% 7% 2% 7%" },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: "#406695",
            fontSize: { xs: "20px", lg: "22px" },
            textDecoration: "underline",
            textUnderlineOffset: "2px",
            fontWeight: 700,
          }}
        >
          {category()}
        </Typography>
        <Box sx={{ py: { xs: "20px", sm: "0" } }}>
          <button
            onClick={() => handleCategoryClick(null)}
            className="text-sm mx-[7px] py-[3px] bg-[#6BAB6E] rounded-[15px] w-[70px] text-white duration-300 hover:bg-[#558858] hover:duration-300 shadow-md"
          >
            {" "}
            All{" "}
          </button>
          <button
            onClick={() => handleCategoryClick("SIT")}
            className="text-sm mx-[7px] py-[3px] bg-[#ecbd4d] rounded-[15px] w-[70px] text-white duration-300 hover:bg-[#BC973D] hover:duration-300 shadow-md"
          >
            {" "}
            SIT{" "}
          </button>
          <button
            onClick={() => handleCategoryClick("CB2")}
            className="text-sm mx-[7px] py-[3px] bg-[#498bb9] rounded-[15px] w-[70px] text-white duration-300 hover:bg-[#3A6F94] hover:duration-300 shadow-md"
          >
            {" "}
            CB2{" "}
          </button>
          <button
            onClick={() => handleCategoryClick("Lx")}
            className="text-sm mx-[7px] py-[3px] bg-[#DF5935] rounded-[15px] w-[70px] text-white duration-300 hover:bg-[#B2472A] hover:duration-300 shadow-md"
          >
            {" "}
            Lx{" "}
          </button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "25px",
        }}
      >
        {allSensor
          .filter((card) =>
            selectedCategory ? card.building === selectedCategory : true
          )
          .map((data, index) => {
            const keyString = Array.isArray(data.key)
              ? data.key.join(",")
              : data.key;
            return (
              <Link
                to={`/detail/${encodeURIComponent(data.buildingRoom)}`}
                key={index}
              >
                <Box
                  sx={{
                    width: {
                      xs: "370px",
                      sm: "350px",
                      md: "430px",
                      lg: "430px",
                      xl: "460px",
                    },
                    height: "auto",
                    background: "white",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "30px",
                    p: "18px",
                    alignContent: "center",
                    transition: ".3s",
                    border: "2px solid transparent",
                    cursor: "pointer",
                    ":hover": {
                      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                      transform: "scale(1.01)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <img
                      src={check_Picture(pmData[keyString] == 0 || pmData[keyString] == null ? "No Data" : pmData[keyString])}
                      className="w-[auto] h-[130px] rounded-[17px]"
                      alt="AQI Level"
                    />
                    <Box
                      sx={{
                        pl: "30px",
                        alignContent: "space-around",
                        justifyContent: "space-around",
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{ fontSize: "20px", fontWeight: "500" }}
                      >
                        {data.buildingRoom}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          width: "60px",
                          backgroundColor: buildingStyle(data.building),
                          borderRadius: "15px",
                          color: "white",
                          textAlign: "center",
                          fontSize: "15px",
                          py: "3px",
                          my: "7px",
                        }}
                      >
                        {data.building}
                      </Typography>
                      <Typography
                        variant="h1"
                        sx={{
                          fontSize: { xs: "38px", lg: "50px" },
                          fontWeight: 500,
                          color: "black",
                        }}
                      >
                        {pmData[keyString] == 0 || pmData[keyString] == null ? "No Data" : pmData[keyString]}
                        <span className={`pl-[10px] text-[20px] font-normal text-[#777676] ${pmData[keyString] ? "" : "hidden"}`}>
                          µg/m³
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Link>
            );
          })}
      </Box>
    </Box>
  );
}