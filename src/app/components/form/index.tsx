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

const initialValues = services.map(({ name, details }) => ({
  service: name,
  selected: [details[details.length - 1]],
}));

export default function Form() {
  const [servicesSelected, setServicesSelected] = useState(initialValues);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let serviceDetailsHtml = `${servicesSelected.map(
      (service) => `
      <li>
        ${service.service}
        <ul>
          ${service.selected.map((detail) => `<li>${detail}</li>`)}
        </ul>
      </li>
    `
    )}`;

    const response = await fetch("http://api.davdsm.pt:8030/sendMail", {
      method: "POST",
      body: JSON.stringify({
        sender: "geral@davdsm.pt",
        receiver: {
          email: "nunoazevedo295@gmail.com",
          name: "name",
        },
        subject: "Assunto",
        message: `<ul>
          <li>First Name: ${event.target[0].value}</li>
          <li>Last Name: ${event.target[1].value}</li>
          <li>Email: ${event.target[2].value}</li>
          <li>Interested: ${event.target[3].value}</li>
          <li>Message: ${event.target[4].value}</li>
          <li>
            Serviços selecionados:
            <ul>
                ${serviceDetailsHtml.replaceAll(",", "")}
            </ul>
          </li> 
         
        </ul>`,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        davdsmKey: "d41d8cd98f00b204e9800998ecf8427e",
      },
    });

    if (response.status === 200) {
      setServicesSelected(initialValues);
      setMessage("Submetido com sucesso!");
      event.target.reset();
    } else {
      setMessage("Algo correu mal!");
    }
  };

  return (
    <>
      <Services
        servicesSelected={servicesSelected}
        changeSelectedServices={(newServices) =>
          setServicesSelected(newServices)
        }
      />

      <Talk handleSubmit={handleSubmit} message={message} />
    </>
  );
}
