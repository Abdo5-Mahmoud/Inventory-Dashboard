import { SettingProps, User } from "./types";

export const userData: User = {
  id: "1",
  name: "John Doe",
  role: "Super admin",
  email: "[EMAIL_ADDRESS]",
  image: "https://example.com/john-doe.jpg",
  bio: "Software Engineer",
  location: "New York",
};

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
