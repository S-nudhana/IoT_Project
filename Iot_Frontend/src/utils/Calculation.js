import VeryGood from "/assets/image/01_VeryGood.png";
import Good from "/assets/image/02_Good.png";
import Moderate from "/assets/image/03_Moderate.png";
import Unhealthy from "/assets/image/04_Unhealthy.png";
import VeryUnhealthy from "/assets/image/05_VeryUnhealthy.png";
import nodata from "/assets/image/NoData.jpg";

export const check_Picture = (pm) => {
  if (pm === 0 || pm === null || pm === "No Data") {
    return nodata;
  } else if (pm >= 75.1) {
    return VeryUnhealthy;
  } else if (pm >= 37.6) {
    return Unhealthy;
  } else if (pm >= 25.1) {
    return Moderate;
  } else if (pm >= 15.1) {
    return Good;
  } else {
    return VeryGood;
  }
};

export const check_AQI_Catagory = (pm) => {
  if (pm == 0 || pm == null || pm == "No Data") {
    return "No Data";
  } else if (pm >= 75.1) {
    return "Very Unhealthy";
  } else if (pm >= 37.6) {
    return "Unhealthy";
  } else if (pm >= 25.1) {
    return "Moderate";
  } else if (pm >= 15.1) {
    return "Good";
  } else {
    return "Very Good";
  }
};

export const pm25_aqi = (pm) => {
  if (pm == null || pm == 0) {
    return "No Data";
  }
  return pm;
};
