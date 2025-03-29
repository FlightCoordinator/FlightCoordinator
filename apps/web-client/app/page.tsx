import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/base-ui/button";

import { landingNavigation } from "@/shared/constants/navigation";

const LandingPage = () => {
  return (
    <div className="w-dvw h-dvh bg-[url('/images/background.jpg')] bg-cover bg-[center_center]">
      <header className="bg-accent/40">
        <div className="w-[1256px] max-[1256px]:w-full m-auto flex flex-row items-center justify-between px-[20px] py-[10px]">
          <Link className="flex flex-row items-center justify-start gap-2 overflow-hidden" href="/">
            <Image src="/images/logo_bordered.png" alt="Flight Coordinator Logo" width={50} height={50} />
            <h1 className="text-2xl leading-none tracking-tight font-semibold select-none">
              Flight <br /> Coordinator
            </h1>
          </Link>
          <div className="flex flex-row items-center justify-center gap-[30px]">
            <nav className="flex flex-row items-center justify-center gap-[5px]">
              {landingNavigation.map((item) => (
                <Link key={item.key} href={item.link} target={item.isExternal ? "_blank" : "_self"}>
                  <Button variant="ghost" className="cursor-pointer">
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
            <Link href="/app">
              <Button className="cursor-pointer">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="h-[calc(100%-114px)] w-[1256px] max-[1256px]:w-full m-auto flex flex-col items-center justify-center">
        <h1 className="text-[50px] font-semibold tracking-tight leading-tight drop-shadow-lg">
          Effortless Flight Management,
        </h1>
        <h1 className="text-[50px] font-semibold tracking-tight leading-tight drop-shadow-lg">One Click Away</h1>
      </div>
      <footer className="bg-accent/40 px-[20px] py-[10px]">
        <div className="w-[1256px] max-[1256px]:w-full m-auto text-center">
          FlightCoordinator is an Open Source project and licensed under{" "}
          <Link
            href="https://github.com/FlightCoordinator/FlightCoordinator/blob/main/LICENSE"
            className="font-semibold tracking-tight">
            MIT License
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
