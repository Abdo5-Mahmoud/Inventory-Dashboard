"use client";
import { FormInput } from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { SettingData } from "@/data/data";
import { useState } from "react";

export function SettingsForm() {
  const [data, setData] = useState(SettingData);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <form
      name="settings form"
      id="Setting"
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      <FormInput
        label="Store Name"
        type="text"
        name="name"
        id="name"
        value={data.storeName}
        onChange={(e) => setData({ ...data, storeName: e.target.value })}
      />

      <FormInput
        label="Store Email"
        type="email"
        name="email"
        id="email"
        value={data.storeEmail}
        onChange={(e) => setData({ ...data, storeEmail: e.target.value })}
      />

      <FormInput
        label="Timezone"
        type="timezone"
        name="timezone"
        id="timezone"
        value={data.storeTimeZone}
        onChange={(e) => setData({ ...data, storeTimeZone: e.target.value })}
      />
      <FormInput
        label="currency"
        type="text"
        name="currency"
        id="currency"
        value={data.storeCurrency}
        onChange={(e) => setData({ ...data, storeCurrency: e.target.value })}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
