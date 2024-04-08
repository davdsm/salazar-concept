import { useEffect, useState } from "react";

import PocketBase from "pocketbase";

import { API_URL } from "@/app/utils";

import Services from "@/app/components/home/form/services";
import Talk from "@/app/components/home/form/talk";

export type Service = {
  id: string;
  name: string;
  details: string[];
  selected: string[];
  isVisible: boolean;
};

let defaultServices: any;

export default function Form() {
  const [services, setServices] = useState<Service[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      const pb = new PocketBase(API_URL);

      const categories = await pb
        .collection("Categories")
        .getFullList({ sort: "order" });

      const subCategories = await pb.collection("SubCategories").getFullList();

      const items = categories.map(({ isVisible, id, name }) => {
        const details = subCategories
          .filter(({ isVisible, category }) => isVisible && category === id)
          .sort((a, b) => a.order - b.order)
          .map(({ name }) => name);

        return { id, name, details, selected: [], isVisible };
      });

      defaultServices = items;
      setServices(items as any);
    };

    fetchServices();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let serviceDetailsHtml = `${services.map(
      (service) =>
        service.selected.length &&
        `
      <li>
        ${service.name}
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
      setServices(defaultServices);
      setMessage("A sua mensagem foi enviada!");
      event.target.reset();
    } else {
      setMessage("Algo correu mal! Tente novamente dentro de alguns minutos.");
    }
  };

  return (
    <>
      <Services
        services={services}
        changeSelectedServices={(newServices) => setServices(newServices)}
      />

      <Talk handleSubmit={handleSubmit} message={message} />
    </>
  );
}
