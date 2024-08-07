import nodata from "../assets/picture/NoData.jpg";
import good from "../assets/picture/01-good.png";
import moderate from "../assets/picture/02-moderate.png";
import unhealthyForSensitiveGroup from "../assets/picture/03-unhealthy-for-sensitive.png";
import unhealthy from "../assets/picture/04-unhealthy.png";
import veryUnhealthy from "../assets/picture/05-very-unhealthy.png";
import hazadous from "../assets/picture/06-hazardous.png";

export const check_Picture = (pm) => {
  if (pm === 0 || pm === null || pm === "No Data") {
    return nodata;
  } else if (pm >= 250.5) {
    return hazadous;
  } else if (pm >= 150.5) {
    return veryUnhealthy;
  } else if (pm >= 55.5) {
    return unhealthy;
  } else if (pm >= 35.5) {
    return unhealthyForSensitiveGroup;
  } else if (pm >= 12.1) {
    return moderate;
  } else {
    return good;
  }
};

export const check_AQI_Catagory = (pm) => {
  if (pm == 0 || pm == null || pm == "No Data") {
    return "No Data";
  } else if (pm >= 250.5) {
    return "Hazadous";
  } else if (pm >= 150.5) {
    return "Very Unhealthy";
  } else if (pm >= 55.5) {
    return "Unhealthy";
  } else if (pm >= 35.5) {
    return "Unhealthy for sensitive group";
  } else if (pm >= 12.1) {
    return "Moderate";
  } else {
    return "Good";
  }
};

export const pm25_aqi = (pm) => {
  if (pm == null || pm == 0) {
    return "No Data";
  }
  return pm;
};
