"use client";

import { useState } from "react";

import Services from "@/app/components/home/form/services";
import Talk from "@/app/components/home/form/talk";

export const services = [
  {
    id: 1,
    name: "Communication",
    img: "/logo/logo.svg",
    details: [
      "Advertising",
      "Brand Communication",
      "Copywriting",
      "Social Media",
      "Corporative Communication ",
      "Content Creation",
      "Press Release",
    ],
  },
  {
    id: 2,
    name: "Design",
    img: "/logo/logo.svg",
    details: [
      "Flyers",
      "Posters",
      "Communication Design",
      "Graphic Design",
      "Logos",
      "Brand Book",
      "Graphic Line",
      "Product Design",
      "Packaging Design",
      "Motion Graphic ",
      "3D",
    ],
  },
  {
    id: 3,
    name: "Website",
    img: "/logo/logo.svg",
    details: [
      "Content + Copywriting",
      "Development",
      "UI",
      "UX",
      "SEO",
      "Google Ads",
      "Web Design",
      "E-mail Marketing",
      "Web Analytics",
    ],
  },
  {
    id: 4,
    name: "Video",
    img: "/logo/logo.svg",
    details: [
      "Storytelling",
      "Promotional",
      "Insitutional",
      "Social Media (Reels + Tik Tok)",
    ],
  },
  {
    id: 5,
    name: "Photography",
    img: "/logo/logo.svg",
    details: ["Event", "Product", "Live Model", "Studio", "Product Styling"],
  },
  {
    id: 6,
    name: "Marketing",
    img: "/logo/logo.svg",
    details: [
      "Product Marketing",
      "Creative Direction",
      "Planning",
      "Remarketing",
      "Strategy",
      "Data Analysis",
      "Social Media Ads",
      "E-commerce and Online Sales",
      "Market Research",
      "Social Media Management",
      "Campaign Creation",
    ],
  },
];

const initialValues = services.map(({ name }) => ({
  service: name,
  selected: [],
}));

export default function Form() {
  const [servicesSelected, setServicesSelected] =
    useState<{ service: string; selected: string[] }[]>(initialValues);
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
          email: "samuel_david_8@hotmail.com",
          name: "name",
        },
        subject: "🔔 Email do website!",
        message: `<ul>
          <li>Nome: ${event.target[0].value}</li>
          <li>Apelido: ${event.target[1].value}</li>
          <li>Email: ${event.target[2].value}</li>
          <li>Interesses: ${event.target[3].value}</li>
          <li>Mensagem: ${event.target[4].value}</li>
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
      setMessage("A sua mensagem foi enviada!");
      event.target.reset();
    } else {
      setMessage("Algo correu mal! Tente novamente dentro de alguns minutos.");
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
