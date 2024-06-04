import nodata from "../assets/NoData.jpg"
import good from "../assets/01-good.png"
import moderate from "../assets/02-moderate.png"
import unhealthyForSensitiveGroup from "../assets/03-unhealthy-for-sensitive.png"
import unhealthy from "../assets/04-unhealthy.png"
import veryUnhealthy from "../assets/05-very-unhealthy.png"
import hazadous from "../assets/06-hazardous.png"

export const check_Picture = (pm) => {
    if (pm == 0 || pm == null || pm == "No Data") {
        return nodata;
    } else if (pm >= 301) {
        return hazadous;
    } else if (pm >= 201) {
        return veryUnhealthy;
    } else if (pm >= 151) {
        return unhealthy;
    } else if (pm >= 101) {
        return unhealthyForSensitiveGroup;
    } else if (pm >= 51) {
        return moderate;
    } else {
        return good;
    }
}

export const check_AQI_Catagory = (pm) => {
    if (pm == 0 || pm == null || pm == "No Data") {
        return "No Data";
    } else if (pm >= 301) {
        return "Hazadous";
    } else if (pm >= 201) {
        return "Very Unhealthy";
    } else if (pm >= 151) {
        return "Unhealthy";
    } else if (pm >= 101) {
        return "Unhealthy for sensitive group";
    } else if (pm >= 51) {
        return "Moderate";
    } else {
        return "Good";
    }
}

export const pm25_aqi = (pm) => {
    if(pm == null || pm == 0){
        return "No Data";
    }
    const c = Math.floor(10 * pm) / 10;
    const a = c < 0 ? 0
        : c < 12.1 ? lerp(0, 50, 0.0, 12.0, c)
            : c < 35.5 ? lerp(51, 100, 12.1, 35.4, c)
                : c < 55.5 ? lerp(101, 150, 35.5, 55.4, c)
                    : c < 150.5 ? lerp(151, 200, 55.5, 150.4, c)
                        : c < 250.5 ? lerp(201, 300, 150.5, 250.4, c)
                            : c < 350.5 ? lerp(301, 400, 250.5, 350.4, c)
                                : c < 500.5 ? lerp(401, 500, 350.5, 500.4, c)
                                    : 500;
    return Math.round(a);
}

const lerp = (ylo, yhi, xlo, xhi, x) => {
    return ((x - xlo) / (xhi - xlo)) * (yhi - ylo) + ylo;
}