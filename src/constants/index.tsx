import { AiOutlineInstagram, AiOutlineMail } from 'react-icons/ai';

export const cardContent: Array<{
  img: string;
  header: string;
  content: string;
}> = [
  {
    img: '/images/about1.png',
    header: '36 HOURS LONG HACKATHON',
    content:
      'A theme based Hackathon consisting of 5 tracks resulting in 3 Grand winners',
  },
  {
    img: '/images/about2.png',
    header: 'TECH CONFERENCES',
    content:
      'Conference Talks from Top Quality Tech Speakers & Representative from Sponsors',
  },
  {
    img: '/images/about3.png',
    header: 'ENGAGEMENT & NETWORKING',
    content: `A lot more than just a ${"'"}Hackathon${"'"}, more of a tech fest with Engagement Activities`,
  },
];

export const social: Array<{
  link: string;
  icon: JSX.Element;
  name: string;
}> = [
  {
    link: 'https://www.instagram.com/hackfest.dev',
    icon: <AiOutlineInstagram className="h-7 w-7 hover:text-yellow-500" />,
    name: 'Instagram',
  },
  {
    link: 'mailto:admin@hackfest.dev',
    icon: <AiOutlineMail className="h-7 w-7 hover:text-yellow-500" />,
    name: 'E-mail',
  },
];

export const domains: Array<{
  name?: string;
  img?: string;
}> = [{}, {}, {}, {}, {}];

export const siteMetadata = {
  title: 'Hackfest',
  author: 'Technical Team of Hackfest',
  description:
    'Hackfest is a 36h long National level Hackathon at NMAMIT, Nitte coupled with a lot of Interactive Activities & Tech Conference talks!',
  siteUrl: 'https://hackfest.dev',
  email: 'admin@hackfest.com',
  address: 'N.M.A.M. Institute of Technology, Nitte, Kalya, Karnataka 574110',
  instagram: 'hackfest.dev',
};
