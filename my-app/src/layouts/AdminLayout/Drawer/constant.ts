import {
  Users,
  CalendarCheck,
  CreditCard,
  Truck,
  FileText,
  MapPin,
  Hotel,
  MicOffIcon,
  ActivityIcon,
} from "lucide-react";
import { CombinedCollapseMenuType } from "./types";

export const CORE_ITEMS: CombinedCollapseMenuType[] = [
  {
    type: "menu",
    icon: CalendarCheck,
    name: "Packages",
    url: "/",
    isActive: false,
    menuItems: [
      {
        name: "Add New Package",
        icon: CalendarCheck,
        url: "/packages/new",
      },
      {
        name: "View Featured",
        icon: CalendarCheck,
        url: "/packages/featured",
      },
    ],
  },
  {
    type: "menu",
    icon: Truck,
    name: "Vehicle Rental",
    isActive: false,
    url: "/vehicle-rental",
    menuItems: [
      {
        name: "Add Rental",
        icon: Truck,
        url: "/vehicle-rental/new",
      },
      {
        name: "Rental Providers",
        icon: Users,
        url: "/vehicle-rental/providers",
      },
    ],
  },
  {
    type: "normal",
    icon: ActivityIcon,
    name: "Agencies",
    url: "/admin/agencies",
  },
  {
    type: "normal",
    icon: Hotel,
    name: "Hotels",
    url: "/agencies",
  },
  {
    type: "normal",
    icon: Users,
    name: "Users",
    url: "/users",
  },
  {
    type: "collapsible",
    icon: CalendarCheck,
    isActive: false,
    name: "Bookings",
    items: [
      {
        name: "Package",

        url: "/bookings/package",
      },
      {
        name: "Vehicle Rental",

        url: "/bookings/vehicle-rental",
      },
    ],
  },
  {
    type: "collapsible",
    icon: CreditCard,
    isActive: false,
    name: "Payments",
    items: [
      {
        name: "Package",

        url: "/payments/package",
      },
      {
        name: "Vehicle Rental",

        url: "/payments/vehicle-rental",
      },
    ],
  },
];

export const CONTENT_ITEMS: CombinedCollapseMenuType[] = [
  {
    type: "menu",
    icon: FileText,
    name: "Blogs",
    url: "/blogs",
    isActive: false,
    menuItems: [
      {
        name: "Add New Blog",
        icon: FileText,
        url: "/blogs/new",
      },
      {
        name: "View Featured",
        icon: FileText,
        url: "/blogs/featured",
      },
    ],
  },
  {
    type: "menu",
    icon: MapPin,
    name: "Destinations",
    url: "/destinations",
    isActive: false,
    menuItems: [
      {
        name: "Add New Destination",
        icon: MapPin,
        url: "/destinations/new",
      },
      {
        name: "View Featured",
        icon: MapPin,
        url: "/destinations/featured",
      },
    ],
  },
  {
    type: "normal",
    icon: FileText,
    name: "Reviews",
    url: "/reviews",
  },
];

export const NAV_USER = {
  name: "Purash Poudel",
  email: "purash123@gmail.com",
  avatar: "/avatars/shadcn.jpg",
};
