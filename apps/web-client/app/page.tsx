import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/base-ui/button";
import { Separator } from "@/components/base-ui/separator";

const LandingPage = () => {
  return (
    <div className="w-dvw h-dvh bg-[url('/images/background.jpg')] bg-cover bg-[center_center]">
      <div className="h-[calc(100%-44px)] w-[1256px] max-[1256px]:w-full m-auto flex flex-col items-center justify-center gap-[15px]">
        <div className="flex flex-col items-center justify-start overflow-hidden">
          <Image src="/images/logo_bordered.png" alt="Flight Coordinator Logo" width={70} height={70} />
          <h1 className="text-3xl tracking-tight font-semibold select-none drop-shadow-lg">FlightCoordinator</h1>
        </div>
        <Separator decorative className="bg-primary rounded-md max-w-[450px]" />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[50px] font-semibold tracking-tight leading-tight drop-shadow-lg">
            Effortless Flight Management,
          </h1>
          <h1 className="text-[50px] font-semibold tracking-tight leading-tight drop-shadow-lg">One Click Away</h1>
        </div>
        <Button asChild>
          <Link href="/app">Get Started</Link>
        </Button>
      </div>
      <footer className="bg-accent/40 px-[20px] py-[10px]">
        <div className="w-[1256px] max-[1256px]:w-full m-auto text-center">
          FlightCoordinator is available on{" "}
          <Link href="https://github.com/FlightCoordinator/FlightCoordinator" className="font-semibold tracking-tight">
            GitHub
          </Link>{" "}
          and licensed under{" "}
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
