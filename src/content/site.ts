/**
 * Single source of truth for every business-specific value.
 * Edit this file only. `null` or empty arrays mean "not confirmed yet",
 * and the site shows an honest fallback instead of inventing anything.
 */

export type SuiteImage = {
  src: string;
  alt: string;
  /** real = photographed at the property. concept = illustration, must be labelled. */
  kind: "real" | "concept";
  caption?: string;
};

export type Suite = {
  id: "ferrari" | "lamborghini" | "porsche" | "jaguar";
  name: string;
  /** Short, editable. Keep to confirmed facts. */
  description: string;
  /** Add real interior photos here. The suite page updates with no code change. */
  images: SuiteImage[];
  /** Only verified amenities. Empty list shows no amenity block. */
  amenities: string[];
  /** Nightly rate. null = "Rate on request". */
  price: { amount: number; currency: string } | null;
};

export type MenuItem = { name: string; price?: number | null; note?: string };
export type RoomRate = { name: string; amount: number };
export type RoomRateGroup = { category: string; rooms: RoomRate[] };

export const site = {
  brand: {
    name: "OJAUTOLOUNGE AND SUITE",
    nameLine1: "OJAUTOLOUNGE",
    nameLine2: "AND SUITE",
    logoSrc: "/brand/logo.png" as string | null,
    headline: "YOUR SPACE. YOUR NIGHT. YOUR ESCAPE.",
    supporting:
      "Automotive-inspired suites, food, drinks and a different kind of Port Harcourt experience.",
  },

  location: {
    city: "Port Harcourt",
    region: "Rivers State, Nigeria",
    address: "No 2 Prince Amadi Close, Behind Nellyval Filling Station, Stadium Road, Port Harcourt",
    landmark: "Behind Nellyval Filling Station",
    addressConfirmed: true,
    branches: [
      {
        name: "Okemini / Rumagholu Branch",
        address: "#10 Okemini Sars Link Road, Opposite Anglican Church, Rumagholu, Port Harcourt, Rivers State",
      },
    ],
  },

  contact: {
    whatsappNumber: "2347075091867",
    phone: "0707 509 1867",
    instagram: null as string | null,
  },

  rates: {
    mainBranch: [
      {
        category: "Apartment",
        rooms: [{ name: "2 Bedroom Apartment", amount: 110000 }],
      },
      {
        category: "Super Deluxe Room",
        rooms: [
          { name: "Lamborghini", amount: 40000 },
          { name: "Rolls-Royce", amount: 40000 },
          { name: "Jaguar", amount: 40000 },
        ],
      },
      {
        category: "Deluxe Room",
        rooms: [
          { name: "Ferrari", amount: 35000 },
          { name: "Chrysler", amount: 35000 },
          { name: "Porsche", amount: 35000 },
        ],
      },
      {
        category: "Executive Room",
        rooms: [
          { name: "Benz", amount: 30000 },
          { name: "BMW", amount: 30000 },
        ],
      },
      {
        category: "Standard Room",
        rooms: [
          { name: "Bentley", amount: 25000 },
          { name: "Mini Cooper", amount: 25000 },
        ],
      },
    ] as RoomRateGroup[],
    otherBranches: [
      {
        branchName: "Okemini / Rumagholu Branch",
        address: "#10 Okemini Sars Link Road, Opposite Anglican Church, Rumagholu, Port Harcourt, Rivers State",
        rooms: [
          { category: "Standard", number: "101", amount: 15000 },
          { category: "Standard", number: "102", amount: 15000 },
          { category: "Executive", number: "113", amount: 20000 },
          { category: "Executive", number: "114", amount: 20000 },
          { category: "Executive", number: "115", amount: 20000 },
          { category: "Executive", number: "116", amount: 20000 },
          { category: "Executive", number: "117", amount: 20000 },
          { category: "Executive", number: "118", amount: 20000 },
          { category: "Suite", number: "119", amount: 35000 },
        ],
      },
    ],
  },

  suites: [
    {
      id: "ferrari",
      name: "Ferrari",
      description: "The Ferrari-themed suite. Ask on WhatsApp for current availability and rate.",
      images: [
        {
          src: "/public/rooms/ferrari.jpg",
          alt: "Ferrari-themed suite interior concept created for OJAUTOLOUNGE AND SUITE",
          kind: "concept",
          caption: "Ferrari suite concept",
        },
      ],
      amenities: [],
      price: { amount: 35000, currency: "NGN" },
    },
    {
      id: "lamborghini",
      name: "Lamborghini",
      description: "The Lamborghini-themed suite. Ask on WhatsApp for current availability and rate.",
      images: [
        {
          src: "/images/new/lambo-room.jpg",
          alt: "The Lamborghini suite: bedroom with purple ceiling light, seen past the door with the Lamborghini badge",
          kind: "real",
          caption: "Your door. Your world.",
        },
      ],
      amenities: [],
      price: { amount: 40000, currency: "NGN" },
    },
    {
      id: "porsche",
      name: "Porsche",
      description: "The Porsche-themed suite. Ask on WhatsApp for current availability and rate.",
      images: [
        {
          src: "/public/rooms/porsche.jpg",
          alt: "Porsche-themed suite interior concept created for OJAUTOLOUNGE AND SUITE",
          kind: "concept",
          caption: "Porsche suite concept",
        },
      ],
      amenities: [],
      price: { amount: 35000, currency: "NGN" },
    },
    {
      id: "jaguar",
      name: "Jaguar",
      description: "The Jaguar-themed suite. Ask on WhatsApp for current availability and rate.",
      images: [
        {
          src: "/images/new/jaguar-room.jpg",
          alt: "The Jaguar suite: bedroom with marble TV wall and ring chandelier, door with the Jaguar leaper on the left",
          kind: "real",
        },
        {
          src: "/images/new/jaguar-door.jpg",
          alt: "The Jaguar suite door with the leaping jaguar emblem and the OJ Autolounge and Suites name",
          kind: "real",
          caption: "Every suite has its own door.",
        },
      ],
      amenities: [],
      price: { amount: 40000, currency: "NGN" },
    },
  ] as Suite[],

  images: {
    heroExterior: {
      src: "/images/new/exterior-dusk.jpg",
      alt: "OJAUTOLOUNGE AND SUITE at dusk: lit sign, coloured ribbons on the facade and a checkerboard courtyard set with tables",
    },
    aerial: {
      src: "/images/new/aerial.jpg",
      alt: "Aerial view of the property at sunset, with low cloud across the neighbourhood",
    },
    stairs: {
      src: "/images/new/stairs.jpg",
      alt: "The marble staircase with black handrails inside the property",
    },
    lounge: {
      src: "/images/new/lounge.jpg",
      alt: "The lounge with orange, green and grey seating, the OJ Autolounge and Suites wall sign and a drinks fridge",
    },
    loungeFridge: {
      src: "/images/new/lounge-fridge.jpg",
      alt: "The drinks fridge in the lounge",
    },
    cinematicSuiteTransition: {
      src: "/Create_cinematic_using_image_2K_20261026152248.jpg",
      alt: "Cinematic visual created for the OJAUTOLOUNGE AND SUITE room experience",
    },
    food: [
      { src: "/images/real/food-1.jpg", alt: "A tray of carrot and pepper rice from the opening event" },
      { src: "/images/real/food-2.jpg", alt: "A tray of peppered meat from the opening event" },
    ],
  },

  menu: {
    food: [] as MenuItem[],
    drinks: [] as MenuItem[],
  },

  sections: {
    stay: {
      title: "STAY",
      copy: "Cozy apartment-style accommodation with an automotive theme. Every suite has its own door.",
      cta: "Ask about a stay",
    },
    dine: {
      title: "SIP & DINE",
      copy: "Food and drinks. Tell us what you are after on WhatsApp.",
      cta: "Ask about food and drinks",
    },
    afterDark: {
      title: "AFTER DARK",
      copy: "The lounge and the nightlife. Ask the team what is on.",
      cta: "Ask about the lounge",
    },
  },

  nav: [
    { label: "EXPERIENCE", href: "#experience" },
    { label: "SUITES", href: "#suites" },
    { label: "RATES", href: "#rates" },
    { label: "FOOD & DRINKS", href: "#food" },
    { label: "NIGHTLIFE", href: "#nightlife" },
    { label: "LOCATION", href: "#location" },
  ],
} as const;

export type Site = typeof site;
