import * as HeroIcons from "react-icons/hi";
import * as HeroIcons2 from "react-icons/hi2";
import * as FaIcons from "react-icons/fa";
import * as MaterialDesignIcons from "react-icons/md";

export const Icons = {
  icons: {
    HeroIcons: [
      "HiAcademicCap",
      "HiAtSymbol",
      "HiBeaker",
      "HiBell",
      "HiBookOpen",
      "HiBriefcase",
      "HiCake",
      "HiGift",
      "HiCalculator",
      "HiCamera",
      "HiChartPie",
      "HiCloud",
      "HiCog",
      "HiCurrencyEuro",
      "HiHome",
      "HiKey",
    ],
    HeroIcons2: [
      "HiBanknotes",
      "HiBolt",
      "HiBugAnt",
      "HiBuildingLibrary",
      "HiBuildingStorefront",
      "HiCalendarDays",
      "HiChatBubbleLeftRight",
      "HiComputerDesktop",
      "HiCpuChip",
      "HiDevicePhoneMobile",
      "HiFaceSmile",
      "HiFaceFrown",
      "HiGlobeEuropeAfrica",
      "HiLanguage",
    ],
    FaIcons: ["FaCodeBranch", "FaFileCode"],
    MaterialDesignIcons: [
      "MdOutlineSportsGymnastics",
      "MdOutlineDirectionsBike",
      "MdOutlineDownhillSkiing",
      "MdOutlineAccessibility",
      "MdFitnessCenter",
      "MdFavorite",
      "MdFastfood",
      "MdFlight",
      "MdFlightTakeoff",
      "MdHeadset",
      "MdNetworkWifi2Bar",
      "MdPhotoCamera",
      "MdRocketLaunch",
    ],
  },

  getIcons() {
    return Object.keys(this.icons).flatMap((iconGroup) => {
      return this.icons[iconGroup].map((icon) => {
        const payload = { name: icon, origin: iconGroup };

        if (iconGroup === "HeroIcons") payload.icon = HeroIcons[icon];
        if (iconGroup === "HeroIcons2") payload.icon = HeroIcons2[icon];
        if (iconGroup === "FaIcons") payload.icon = FaIcons[icon];
        if (iconGroup === "MaterialDesignIcons")
          payload.icon = MaterialDesignIcons[icon];

        return payload;
      });
    });
  },

  getIcon(name) {
    if (!name) return null;
    const iconObj = this.getIcons().find((icon) => icon.name === name);
    return iconObj?.icon ?? null;
  },
};
