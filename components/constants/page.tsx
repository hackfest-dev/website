import { AiOutlineInstagram, AiOutlineMail } from "react-icons/ai";

export const cardContent: Array<{
  img: string;
  header: string;
  content: string;
}> = [
  {
    img: "/assets/about1.png",
    header: "36 HOURS LONG HACKATHON",
    content:
      "A theme based Hackathon consisting of 5 tracks resulting in 3 Grand winners",
  },
  {
    img: "/assets/about2.png",
    header: "TECH CONFERENCES",
    content:
      "Conference Talks from Top Quality Tech Speakers & Representative from Sponsors",
  },
  {
    img: "/assets/about3.png",
    header: "ENGAGEMENT & NETWORKING",
    content: `A lot more than just a ${"'"}Hackathon${"'"}, more of a tech fest with Engagement Activities`,
  },
];

export const social: Array<{
  link: string;
  icon: JSX.Element;
  name: string;
}> = [
  {
    link: "https://www.instagram.com/hackfest.dev",
    icon: <AiOutlineInstagram className="h-7 w-7 hover:text-yellow-500" />,
    name: "Instagram",
  },
  {
    link: "mailto:admin@hackfest.dev",
    icon: <AiOutlineMail className="h-7 w-7 hover:text-yellow-500" />,
    name: "E-mail",
  },
];

export const domains: Array<{
  name: string;
  image: string;
  description: string;
  prize: number | null;
}> = [
  {
    name: "Fintech",
    image: "/metaverse.svg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis modi dolor qui atque vero libero odit, tempora dolores impedit ut!",
    prize: 10000,
  },
  {
    name: "Sustainable Development",
    image: "/metaverse.svg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis modi dolor qui atque vero libero odit, tempora dolores impedit ut!",
    prize: 10000,
  },
  {
    name: "Healthcare",
    image: "/metaverse.svg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis modi dolor qui atque vero libero odit, tempora dolores impedit ut!",
    prize: 10000,
  },
  {
    name: "Metaverse",
    image: "/metaverse.svg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis modi dolor qui atque vero libero odit, tempora dolores impedit ut!",
    prize: 10000,
  },
  {
    name: "Logistics & Supply Chain",
    image: "/metaverse.svg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis modi dolor qui atque vero libero odit, tempora dolores impedit ut!",
    prize: 10000,
  },
  {
    name: "Open Innovation",
    image: "/metaverse.svg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis modi dolor qui atque vero libero odit, tempora dolores impedit ut!",
    prize: null,
  },
];
