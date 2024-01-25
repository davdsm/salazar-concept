"use client";

import { useState } from "react";

import Services from "@/app/components/services";
import Talk from "@/app/components/talk";

export const services = [
  {
    id: 1,
    name: "Photography",
    img: "/logo.svg",
    details: [
      "Fotografia editorial 1",
      "Fotografia editorial 2",
      "Fotografia editorial 3",
      "Fotografia editorial 4",
      "Fotografia editorial 5",
      "Fotografia editorial 6",
    ],
  },
  {
    id: 2,
    name: "Design",
    img: "/logo.svg",
    details: [
      "Fotografia editorial 1",
      "Fotografia editorial 2",
      "Fotografia editorial 3",
      "Fotografia editorial 4",
      "Fotografia editorial 5",
      "Fotografia editorial 6",
    ],
  },
  {
    id: 3,
    name: "Video",
    img: "/logo.svg",
    details: [
      "Fotografia editorial 1",
      "Fotografia editorial 2",
      "Fotografia editorial 3",
      "Fotografia editorial 4",
      "Fotografia editorial 5",
      "Fotografia editorial 6",
    ],
  },
  {
    id: 4,
    name: "Communication",
    img: "/logo.svg",
    details: [
      "Fotografia editorial 1",
      "Fotografia editorial 2",
      "Fotografia editorial 3",
      "Fotografia editorial 4",
      "Fotografia editorial 5",
      "Fotografia editorial 6",
    ],
  },
  {
    id: 5,
    name: "Website",
    img: "/logo.svg",
    details: [
      "Fotografia editorial 1",
      "Fotografia editorial 2",
      "Fotografia editorial 3",
      "Fotografia editorial 4",
      "Fotografia editorial 5",
      "Fotografia editorial 6",
    ],
  },
  {
    id: 6,
    name: "Marketing",
    img: "/logo.svg",
    details: [
      "Fotografia editorial 1",
      "Fotografia editorial 2",
      "Fotografia editorial 3",
      "Fotografia editorial 4",
      "Fotografia editorial 5",
      "Fotografia editorial 6",
    ],
  },
];

export default function Form() {
  const [servicesSelected, setServicesSelected] = useState(
    services.map(({ name, details }) => ({
      service: name,
      selected: [details[details.length - 1]],
    }))
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();

    console.log({
      servicesSelected,
      firstName: event.target[0].value,
      lastName: event.target[1].value,
      email: event.target[2].value,
      interested: event.target[3].value,
      message: event.target[4].value,
    });
  };

  return (
    <>
      <Services
        servicesSelected={servicesSelected}
        changeSelectedServices={(newServices) =>
          setServicesSelected(newServices)
        }
      />

      <Talk handleSubmit={handleSubmit} />
    </>
  );
}
