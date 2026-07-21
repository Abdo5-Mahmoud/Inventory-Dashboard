import { SettingProps } from "./types";

export const SettingData: SettingProps = {
  storeName: "Example Store",
  storeDescription: "This is an example store",
  storeLogo: "https://example.com/john-doe.jpg",
  storeEmail: "ex@gmail.com",
  storeTimeZone: "UTC",
  storeCurrency: "USD",
  storeColors: [
    {
      name: "Primary",
      value: "#000000",
    },
    {
      name: "Secondary",
      value: "#000000",
    },
  ],
  timeZone: "(GMT-05:00) Eastern Time (US & Canada)",
};
