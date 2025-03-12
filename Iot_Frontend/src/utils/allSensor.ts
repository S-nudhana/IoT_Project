interface Sensor {
    buildingRoom: string;
    building: string;
    floor: number;
    key: string | string[];
    chart: string;
    outdoor?: boolean;
  }
  
  export const allSensor: Sensor[] = [
    {
      buildingRoom: "SIT Lobby",
      building: "SIT",
      floor: 1,
      key: "esp8266_03",
      chart: "https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&from=1741504111239&to=1741590511239&theme=light&panelId=5",
      outdoor: true,
    },
    {
      buildingRoom: "Common Lab 1",
      building: "SIT",
      floor: 1,
      key: "",
      chart: "https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&from=1741504137153&to=1741590537153&theme=light&panelId=33",
    },
    {
      buildingRoom: "Common Lab 2",
      building: "SIT",
      floor: 1,
      key: "Mi-CommonLab2-1_FL1",
      chart: "https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&from=1741504166746&to=1741590566746&theme=light&panelId=35",
    },
    {
      buildingRoom: "Learning Space",
      building: "SIT",
      floor: 2,
      key: "Mi-LearningSpace01_FL2",
      chart: "https://pm25.sit.kmutt.ac.th/d-solo/4-Ef79KHk/pm25_sit_building?orgId=1&refresh=1m&from=1741504199535&to=1741590599535&theme=light&panelId=40",
    },
    {
      buildingRoom: "Dean Office",
      building: "SIT",
      floor: 2,
      key: "Mi-LearningSpace01_FL2",
      chart: "https://pm25.sit.kmutt.ac.th/d-solo/4-Ef79KHk/pm25_sit_building?orgId=1&refresh=1m&from=1741503495445&to=1741589895445&theme=light&panelId=32",
    },
    {
      buildingRoom: "ESRC Office",
      building: "SIT",
      floor: 2,
      key: "Mi-LearningSpace01_FL2",
      chart: "https://pm25.sit.kmutt.ac.th/d-solo/4-Ef79KHk/pm25_sit_building?from=1741503878999&to=1741590278999&orgId=1&theme=light&panelId=44",
    },
    {
      buildingRoom: "Hallway",
      building: "SIT",
      floor: 3,
      key: ["esp8266_08", "CenterHall3_Xiaomi_4", "CenterHall3_Xiaomi_4_Pro_2"],
      chart: "https://pm25.sit.kmutt.ac.th/d-solo/4-Ef79KHk/pm25_sit_building?from=1741503854002&to=1741590254002&orgId=1&theme=light&panelId=8",
    },
    {
      buildingRoom: "Infrastucture Office",
      building: "SIT",
      floor: 4,
      key: ["esp8266_09", "Infra_mi4pro-1", "Infra_mi4pro-2"],
      chart: "https://pm25.sit.kmutt.ac.th/d-solo/4-Ef79KHk/pm25_sit_building?from=1741503820032&to=1741590220032&orgId=1&theme=light&panelId=22",
    },
    {
      buildingRoom: "Classroom",
      building: "SIT",
      floor: 4,
      key: "",
      chart: "",
    },
    {
      buildingRoom: "Dining Room",
      building: "SIT",
      floor: 4,
      key: "Mi-Canteen_FL4",
      chart: "https://pm25.sit.kmutt.ac.th/d-solo/4-Ef79KHk/pm25_sit_building?from=1741503717272&to=1741590117272&orgId=1&panelId=28",
    },
    {
      buildingRoom: "Hallway",
      building: "CB2",
      floor: 3,
      key: "",
      chart: "",
      outdoor: true,
    },
    {
      buildingRoom: "CB 2301",
      building: "CB2",
      floor: 3,
      key: "",
      chart: "",
    },
    {
      buildingRoom: "CB 2303",
      building: "CB2",
      floor: 3,
      key: "CB2303",
      chart:
        "https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=57",
    },
    {
      buildingRoom: "CB 2304",
      building: "CB2",
      floor: 3,
      key: "CB2304",
      chart:
        "https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=60",
    },
    {
      buildingRoom: "CB 2305",
      building: "CB2",
      floor: 3,
      key: "CB2305",
      chart:
        "https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=61",
    },
    {
      buildingRoom: "CB 2306",
      building: "CB2",
      floor: 3,
      key: ["CB2306-1", "CB2306-2"],
      chart:
        "https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=63",
    },
    {
      buildingRoom: "CB 2307",
      building: "CB2",
      floor: 3,
      key: "CB2307",
      chart: "https://pm25.sit.kmutt.ac.th/d-solo/E7a849KHz/pm25_cb2?orgId=1&from=1741504395011&to=1741590795011&theme=light&panelId=37",
    },
    {
      buildingRoom: "CB 2308",
      building: "CB2",
      floor: 3,
      key: ["esp8266_07", "CB2308-1", "CB2308-2"],
      chart:
        "https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=12",
    },
    {
      buildingRoom: "CB 2310",
      building: "CB2",
      floor: 3,
      key: "CB2310",
      chart:
        "https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=69",
    },
    {
      buildingRoom: "CB 2312",
      building: "CB2",
      floor: 3,
      key: "",
      chart:
        "",
    },
    {
      buildingRoom: "CB 2313",
      building: "CB2",
      floor: 3,
      key: "",
      chart: "",
    },
    {
      buildingRoom: "LX Outdoor (FL 10)",
      building: "LX",
      floor: 10,
      key: "",
      chart: "",
      outdoor: true,
    },
    {
      buildingRoom: "Hallway",
      building: "LX",
      floor: 10,
      key: "esp8266_10",
      chart: "https://pm25.sit.kmutt.ac.th/d-solo/urIEV9FHz/pm25_lx10-13?orgId=1&from=1741504613883&to=1741591013883&theme=light&panelId=17",
    },
    {
      buildingRoom: "LX 10/1",
      building: "LX",
      floor: 10,
      key: "esp8266_05",
      chart:
        "https://pm25.sit.kmutt.ac.th/d-solo/wZjkjfa4k/pm2-5_with_esp32?orgId=1&theme=light&panelId=10",
    },
    {
      buildingRoom: "LX 10/2",
      building: "LX",
      floor: 10,
      key: "",
      chart: "",
    },
    {
      buildingRoom: "LX 10/2",
      building: "LX",
      floor: 10,
      key: "",
      chart: "",
    },
    {
      buildingRoom: "LX 10/3",
      building: "LX",
      floor: 10,
      key: "",
      chart: "",
    },
    {
      buildingRoom: "LX 10/4",
      building: "LX",
      floor: 10,
      key: "",
      chart: "",
    },
    {
      buildingRoom: "LX 10/5",
      building: "LX",
      floor: 10,
      key: "",
      chart: "",
    },
    {
      buildingRoom: "Hallway",
      building: "LX",
      floor: 11,
      key: "esp8266_11",
      chart: "https://pm25.sit.kmutt.ac.th/d-solo/urIEV9FHz/pm25_lx10-13?orgId=1&from=1741573132027&to=1741659532027&theme=light&panelId=19",
    },
    {
      buildingRoom: "LX 11/1",
      building: "LX",
      floor: 11,
      key: "esp8266_02",
      chart: "https://pm25.sit.kmutt.ac.th/d-solo/urIEV9FHz/pm25_lx10-13?orgId=1&from=1741504499723&to=1741590899723&theme=light&panelId=6",
    },
    {
      buildingRoom: "LX 11/3",
      building: "LX",
      floor: 11,
      key: "",
      chart: "",
    },
    {
      buildingRoom: "LX 11/4",
      building: "LX",
      floor: 11,
      key: "",
      chart: "",
    },
    {
      buildingRoom: "LX 11/5",
      building: "LX",
      floor: 11,
      key: "",
      chart: "",
    },
    {
      buildingRoom: "Hallway",
      building: "LX",
      floor: 12,
      key: "esp8266_12",
      chart: "https://pm25.sit.kmutt.ac.th/d-solo/urIEV9FHz/pm25_lx10-13?orgId=1&from=1741504711851&to=1741591111851&theme=light&panelId=21",
    },
    {
      buildingRoom: "LX 12/1",
      building: "LX",
      floor: 12,
      key: "esp8266_04",
      chart: "https://pm25.sit.kmutt.ac.th/d-solo/urIEV9FHz/pm25_lx10-13?orgId=1&from=1741504545004&to=1741590945004&theme=light&panelId=4",
    },
    {
      buildingRoom: "LX 12/2",
      building: "LX",
      floor: 12,
      key: "",
      chart: "",
    },
    {
      buildingRoom: "Hallway",
      building: "LX",
      floor: 13,
      key: "",
      chart: "",
    },
    {
      buildingRoom: "LX 13/2",
      building: "LX",
      floor: 13,
      key: "esp8266_05",
      chart: "https://pm25.sit.kmutt.ac.th/d-solo/urIEV9FHz/pm25_lx10-13?orgId=1&from=1741504568403&to=1741590968403&theme=light&panelId=2",
    },
  ];