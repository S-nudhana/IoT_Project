import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";

export default function BackBTN() {
  return (
    <Link
      to="/"
      className="flex my-[10px]"
    >
      <BsChevronLeft className="mt-[3px] stroke-1" />
      <Typography
        sx={{
          ":hover": {
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          },
        }}
      >
        Back
      </Typography>
    </Link>
  );
}
