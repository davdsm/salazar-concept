"use client";

import { useState } from "react";
import Image from "next/image";

import Close from "@/app/components/icons/close";

import Links from "./links";
import Link from "next/link";
import { openLink } from "../../core";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="text-white z-20 w-full bg-black fixed">
      <nav
        className="container flex items-end justify-end relative py-10"
        aria-label="Global"
      >
        <div className="absolute left-8 -bottom-2">
          <Link
            onClick={(e) => openLink(e, "/")}
            href="/"
            className="m-8 animate__animated animate__fadeInDown"
            style={{ animationDelay: "4800ms !important" }}
          >
            <span className="sr-only">Salazar Concept</span>
            <Image
              src="/logo/logo.svg"
              alt="Salazar Concept"
              height={70}
              width={70}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={toggleMenu}
          >
            Menu
          </button>
        </div>
        <div
          style={{ animationDelay: "4800ms !important" }}
          className="hidden lg:flex lg:gap-x-12 animate__animated animate__fadeInDown"
        >
          <Links handleClick={toggleMenu} />
        </div>
      </nav>

      <div
        className={`lg:hidden ${!isOpen ? "hidden" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 z-10"></div>
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6">
          <div className="flex items-start justify-between">
            <Link
              href="#"
              className="ml-0.5 -mt-3 p-1.5 animate__animated animate__fadeInDown"
              style={{ animationDelay: "4800ms !important" }}
            >
              <span className="sr-only">Salazar Concept</span>
              <Image
                src="/logo/logo.svg"
                alt="Salazar Concept"
                height={70}
                width={70}
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={toggleMenu}
            >
              <span className="sr-only">Close menu</span>

              <Close />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-12 flex flex-col gap-8">
                <Links handleClick={toggleMenu} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
