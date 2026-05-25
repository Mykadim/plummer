export const BUSINESS = {
  name: "Crystal Drain & Plumbing",
  phone: "(289) 949-8248",
  phoneHref: "tel:+12899498248",
  rating: 4.9,
  reviewCount: 693,
  area: "Toronto and nearby areas",
  tagline: "24/7 Emergency Plumbing & Drain Services",
  verified: true,
  backgroundCheck: true,
};

export const HERO_SLIDES = [
  {
    src: "/images/hero-1.png",
    alt: "Crystal Drain service fleet in Toronto",
    subtitle: "24/7 Emergency Service",
    title: "Toronto's Trusted Plumbing Team",
  },
  {
    src: "/images/hero-2.png",
    alt: "Professional plumbers at work",
    subtitle: "Licensed & Insured",
    title: "Expert Repairs You Can Count On",
  },
  {
    src: "/images/hero-3.png",
    alt: "Drain camera inspection",
    subtitle: "Advanced Diagnostics",
    title: "See the Problem Before We Fix It",
  },
  {
    src: "/images/hero-4.png",
    alt: "Emergency flood response",
    subtitle: "Fast Response",
    title: "Basement Floods? We're On Our Way",
  },
];

export const HOURS = [
  { day: "Monday", open: "7:00 AM", close: "8:00 PM", isOpen: true },
  { day: "Tuesday", open: "7:00 AM", close: "8:00 PM", isOpen: true },
  { day: "Wednesday", open: "7:00 AM", close: "8:00 PM", isOpen: true },
  { day: "Thursday", open: "7:00 AM", close: "8:00 PM", isOpen: true },
  { day: "Friday", open: "7:00 AM", close: "8:00 PM", isOpen: true },
  { day: "Saturday", open: "7:00 AM", close: "8:00 PM", isOpen: true },
  { day: "Sunday", open: "7:00 AM", close: "8:00 PM", isOpen: true },
];

export const HIGHLIGHTS = [
  "Family-owned and operated",
  "Locally owned and operated",
  "Professional service",
  "Workmanship guarantee",
  "24/7 emergency response",
];

export type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
};

export const SERVICES: Service[] = [
  {
    id: "install-faucet",
    name: "Install faucet",
    category: "Plumbing",
    description: "Professional faucet installation for kitchens and bathrooms.",
    image: "/images/service-faucet.png",
  },
  {
    id: "install-shower",
    name: "Install shower",
    category: "Plumbing",
    description: "Complete shower installation and fixture upgrades.",
    image: "/images/service-shower.png",
  },
  {
    id: "install-toilet",
    name: "Install toilet",
    category: "Plumbing",
    description: "Toilet installation with proper sealing and testing.",
    image: "/images/service-toilet.png",
  },
  {
    id: "repair-faucet",
    name: "Repair faucet",
    category: "Plumbing",
    description: "Fix leaks, drips, and worn faucet components.",
    image: "/images/service-faucet.png",
  },
  {
    id: "repair-pipe",
    name: "Repair pipe",
    category: "Plumbing",
    description: "Pipe repair for leaks, bursts, and corrosion.",
    image: "/images/service-pipe.png",
  },
  {
    id: "repair-sewer",
    name: "Repair sewer",
    category: "Plumbing",
    description: "Sewer line repair, backup response, and diagnostics.",
    image: "/images/service-sewer.png",
  },
  {
    id: "repair-shower",
    name: "Repair shower",
    category: "Plumbing",
    description: "Shower valve, head, and drain repairs.",
    image: "/images/service-shower.png",
  },
  {
    id: "repair-toilet",
    name: "Repair toilet",
    category: "Plumbing",
    description: "Toilet repairs including flappers, fills, and seals.",
    image: "/images/service-toilet.png",
  },
  {
    id: "unclog-drain",
    name: "Unclog drain",
    category: "Plumbing",
    description: "Drain clearing for sinks, tubs, and main lines.",
    image: "/images/service-drain.png",
  },
  {
    id: "other",
    name: "Other",
    category: "Plumbing",
    description: "Custom plumbing jobs — describe your issue when booking.",
    image: "/images/hero-2.png",
  },
];

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  tags: string[];
  isLocalGuide?: boolean;
};

export const REVIEWS: Review[] = [
  {
    id: "1",
    author: "Basil Kulikowski",
    rating: 5,
    date: "8 months ago",
    text: "Roman and his team responded quickly to a late night flood at 11:30 pm in our basement. Professional, fast, and thorough.",
    tags: ["sewer backup", "professional work"],
  },
  {
    id: "2",
    author: "Mohsin Khan",
    rating: 5,
    date: "6 months ago",
    text: "Cleared our clog with no issues. Friendly technicians and fair pricing.",
    tags: ["clogged kitchen sink"],
    isLocalGuide: true,
  },
  {
    id: "3",
    author: "Kimberly Karrys",
    rating: 5,
    date: "3 months ago",
    text: "Wonderful experience with Julien. He called back right away and arrived within an hour. We needed a whole new tap and he had one available.",
    tags: ["pipe repair", "professional work"],
  },
  {
    id: "4",
    author: "EM H",
    rating: 5,
    date: "5 months ago",
    text: "Septic pump issue caused water in the basement. Called Sunday morning and someone came within a couple hours. Roman and Vitaliy diagnosed it quickly.",
    tags: ["sewer backup"],
  },
  {
    id: "5",
    author: "Marky Mark",
    rating: 5,
    date: "2 months ago",
    text: "Dwayne was fantastic — fixed our issue efficiently and explained everything clearly.",
    tags: ["professional work"],
  },
  {
    id: "6",
    author: "Olivia Zhang",
    rating: 5,
    date: "4 months ago",
    text: "Ivan diagnosed our basement backup quickly. Very responsive team.",
    tags: ["sewer backup", "professional work"],
    isLocalGuide: true,
  },
  {
    id: "7",
    author: "Angie",
    rating: 5,
    date: "3 months ago",
    text: "Dewayne was fantastic with our clogged kitchen sink. On time and professional.",
    tags: ["clogged kitchen sink"],
  },
];

export const REVIEW_TAGS = [
  { id: "all", label: "All", count: REVIEWS.length },
  { id: "clogged kitchen sink", label: "Clogged kitchen sink", count: 22 },
  { id: "sewer backup", label: "Sewer backup", count: 23 },
  { id: "pipe repair", label: "Pipe repair", count: 7 },
  { id: "professional work", label: "Professional work", count: 42 },
];

export const TIME_SLOTS = [
  "07:00", "07:15", "07:30", "07:45",
  "08:00", "08:15", "08:30", "08:45",
  "09:00", "09:15", "09:30", "09:45",
  "10:00", "10:15", "10:30", "10:45",
  "11:00", "11:15",
  "13:00", "13:15", "13:30", "13:45",
  "14:00", "14:15", "14:30", "14:45",
  "15:00", "15:15", "15:30", "15:45",
  "16:00", "16:15", "16:30", "16:45",
  "17:00", "17:15", "17:30", "17:45",
  "18:00", "18:15", "18:30", "18:45",
  "19:00", "19:15", "19:30", "19:45",
];

export function formatTimeSlot(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

export const GALLERY = [
  { src: "/images/hero-1.png", alt: "Service van — 24/7 Toronto plumbing" },
  { src: "/images/gallery-fleet.png", alt: "Crystal Drain fleet" },
  { src: "/images/hero-2.png", alt: "Indoor plumbing repair" },
  { src: "/images/gallery-trench.png", alt: "Outdoor sewer line work" },
  { src: "/images/hero-3.png", alt: "Drain camera inspection" },
  { src: "/images/service-sewer.png", alt: "Sewer pipe installation" },
  { src: "/images/gallery-handshake.png", alt: "Satisfied customer" },
  { src: "/images/gallery-emergency.png", alt: "24/7 emergency service" },
  { src: "/images/hero-4.png", alt: "Emergency flood response" },
  { src: "/images/service-drain.png", alt: "Drain unclogging service" },
];

export const GALLERY_CAROUSEL = GALLERY.map((g, i) => ({
  ...g,
  title: g.alt,
  subtitle: i === 0 ? "Our Work" : "Crystal Drain & Plumbing",
}));
