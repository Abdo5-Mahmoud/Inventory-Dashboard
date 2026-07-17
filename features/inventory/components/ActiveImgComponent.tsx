"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export function ActiveImgComponent({
  thumbnail,
  images,
  title,
}: {
  thumbnail: string;
  images: string[];
  title: string;
}) {
  const [activeImg, setActiveImg] = useState(thumbnail);
  function handleActiveImg(img: string) {
    setActiveImg(img);
    // console.log("activeImg", activeImg);
  }
  return (
    <div className="flex relative flex-col gap-6 items-center">
      <div className="relative">
        <Image
          src={activeImg}
          alt={title}
          width={358}
          height={358}
          loading="lazy"
          className="object-cover rounded-xl border border-border bg-popover"
        />
        <span className="absolute right-1 top-3 px-3 py-1 rounded-sm border-2 bg-popover/90 border-border text-muted-foreground">
          3D view unavailable
        </span>
      </div>
      <div className="flex overflow-x-auto overflow-y-hidden gap-4 justify-start w-full no-scrollbar">
        {images.map((img, indx) => {
          return (
            <Button
              key={img}
              variant={"outline"}
              onClick={() => handleActiveImg(img)}
              className={`${activeImg == img || (indx == 0 && activeImg == thumbnail) ? " border-success" : ""}`}
            >
              <Image
                src={img}
                alt={`${title}${indx}`}
                width={80}
                height={80}
                loading="lazy"
              />
            </Button>
          );
        })}
      </div>
    </div>
  );
}
