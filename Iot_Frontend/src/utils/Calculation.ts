import VeryGood from "/image/01_VeryGood.png";
import Good from "/image/02_Good.png";
import Moderate from "/image/03_Moderate.png";
import Unhealthy from "/image/04_Unhealthy.png";
import VeryUnhealthy from "/image/05_VeryUnhealthy.png";
import nodata from "/image/NoData.jpg";

export const AQI_Catagory = (pm: number | null) => {
  if (pm == 0 || pm == null) {
    return {
      pm: 0,
      description: "ไม่พบข้อมูล",
      image: nodata,
      color: "",
      recommend: "ไม่มี",
    };
  } else if (pm >= 75.1) {
    return {
      pm: pm,
      description: "มีผลกระทบอย่างมากต่อสุขภาพ",
      image: VeryUnhealthy,
      color: "#FD6A6A",
      recommend: "ควรสวมใส่หน้าการอนามัยและหลีกเลี่ยงกิจกรรมกลางแจ้งทุกชนิดและพื้นที่ๆ มีมลพอิษทางอากาศสูงหากมีอาการทางสุขภาพควรปรึกษาพบแพทย์"
    };
  } else if (pm >= 37.6) {
    return {
      pm: pm,
      description: "มีผลกระทบต่อสุขภาพ",
      image: Unhealthy,
      color: "#FF9A57",
      recommend: "ควรสวมใส่หน้ากากอนามัยและเลี่ยงกิจกรรมกลางแจ้งทุกชนิดและพื้นที่ๆ มีมลพิศทางอากาศสูงหากมีอาการเช่น ไอ หายใจลำบาก ระคายเคืองตา ควรปรึกษาแพทย์"
    };
  } else if (pm >= 25.1) {
    return {
      pm: pm,
      description: "ปานกลาง",
      image: Moderate,
      color: "#FFD54D",
      recommend: " สามารถทำกิจกรรมกลางแจ้งได้ตามปกติแต่ควรสวมหน้าการอนามัย หากมีอาการเบื้องต้นเช่น ไอ หายใจลำบาก ระคายเคืองตา ควรปรึกษาแพทย์"
    };
  } else if (pm >= 15.1) {
    return {
      pm: pm,
      description: "ดี",
      image: Good,
      color: "#A8E060",
      recommend: "สามารถทำกิจกรรมกลางแจ้งและท่องเที่ยวได้ตามปกติ"
    };
  } else {
    return {
      pm: pm,
      description: "ดีมาก",
      image: VeryGood,
      color: "#36CEF2",
      recommend: "สามารถทำกิจกรรมกลางแจ้งและท่องเที่ยวได้ตามปกติ ",
    };
  }
};