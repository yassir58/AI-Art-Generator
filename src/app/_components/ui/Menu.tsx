"use client";
import { useRef } from "react";
import Link from "next/link";
const Menu = () => {
  const ref = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    ref.current?.classList.toggle("translate-x-[100%]");
    overlay.current?.classList.toggle("hidden");
  };
  return (
    <>
      <button className="iconButton fixed right-4 top-4 " onClick={toggleMenu}>
        <img src="/bars.svg" alt="" />
      </button>
      <div
        ref={overlay}
        className="fixed left-0 top-0 z-40 hidden h-[100vh] w-[100vw] bg-black/50 blur-md  duration-200 ease-in"
      ></div>
      <div
        className="fixed right-0 top-0 z-50 h-[100vh] w-[320px] translate-x-[100%] bg-darkBlue duration-200 ease-in"
        ref={ref}
      >
        <button className="iconButton fixed right-[240px] top-4 " onClick={toggleMenu}>
          <img src="/Close-1.svg" alt="" />
        </button>
        <div className="flex flex-col items-start px-6 justify-start gap-3 pt-20">
          <Link className={`sideLink min-w-[250px] text-veryLightGray justify-start gap-4 px-4 font-[500]`} href="/generate">
            <img src="/Magic.svg" alt="" />
             Generate Image
          </Link>
          <Link className={`sideLink min-w-[250px] text-veryLightGray justify-start gap-4 px-4 font-[500]`} href="/feed">
            <img src="/apps.svg" alt="" />
            Feed
          </Link>
          <Link className={`sideLink min-w-[250px] text-veryLightGray justify-start gap-4 px-4 font-[500]`} href="/history">
            <img src="/Time_atack_duotone.svg" alt="" />
            Generation History
          </Link>
          <Link className={`sideLink min-w-[250px] text-veryLightGray justify-start gap-4 px-4 font-[500]`} href="/collection">
            <img src="/Folder_duotone_fill.svg" alt="" />
            My Collection
          </Link>
        </div>
      </div>
    </>
  );
};

export default Menu;
