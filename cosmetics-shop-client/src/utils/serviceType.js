import { AiOutlinePropertySafety } from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa";
import {
  MdOutlineAdfScanner,
  MdOutlineAdminPanelSettings,
  MdOutlineBedroomParent,
  MdOutlineConstruction,
  MdOutlineDesignServices,
  MdOutlineMiscellaneousServices,
} from "react-icons/md";

export const servicesData = [
  {
    id: 1,
    name: "Property Maintenance",
    types: [
      "Total Home Renovation",
      "Home Extension",
      "Fit Out & Interior Design Works",
    ],
    icon: <FaRegBuilding className="text-black text-xl" />,
  },
  {
    id: 2,
    name: "Interior Design",
    types: ["Cabinetry", "Curtain & Blind", "Plaster Ceiling"],
    icon: <MdOutlineDesignServices className="text-black text-xl" />,
  },
  {
    id: 3,
    name: "Property Renovation",
    types: ["Pest Control", "Home Cleaning", "Sofa Cleaning"],
    icon: <MdOutlineConstruction className="text-black text-xl" />,
  },
  {
    id: 4,
    name: "Lease Administration",
    types: [
      "Total Home Renovation",
      "Home Extension",
      "Fit Out & Interior Design Works",
    ],
    icon: <MdOutlineAdminPanelSettings className="text-black text-xl" />,
  },
  {
    id: 5,
    name: "Rent Collection Services",
    types: ["Cabinetry", "Curtain & Blind", "Plaster Ceiling"],
    icon: <MdOutlineBedroomParent className="text-black text-xl" />,
  },
  {
    id: 6,
    name: "Tenant Screening & Placement",
    types: ["Pest Control", "Home Cleaning", "Sofa Cleaning"],
    icon: <MdOutlineAdfScanner className="text-black text-xl" />,
  },
  {
    id: 7,
    name: "Property Inspection",
    types: ["Pest Control", "Home Cleaning", "Sofa Cleaning"],
    icon: <AiOutlinePropertySafety className="text-black text-xl" />,
  },
  {
    id: 7,
    name: "Legal Services",
    types: ["Pest Control", "Home Cleaning", "Sofa Cleaning"],
    icon: <MdOutlineMiscellaneousServices className="text-black text-xl" />,
  },
];
