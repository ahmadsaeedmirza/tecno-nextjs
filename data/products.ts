export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  image: string;
  features: string[];
  material: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    slug: "scissors",
    name: "Scissors",
    description: "Precision surgical scissors for every application",
    image: "/products/mayo-scissors.jpg",
    productCount: 12,
  },
  {
    slug: "forceps",
    name: "Forceps",
    description: "High-quality forceps for delicate procedures",
    image: "/products/adson-forceps.jpg",
    productCount: 18,
  },
  {
    slug: "needle-holders",
    name: "Needle Holders",
    description: "Ergonomic needle holders with superior grip",
    image: "/products/needle-holder.jpg",
    productCount: 9,
  },
  {
    slug: "retractors",
    name: "Retractors",
    description: "Self-retaining and hand-held retractors",
    image: "/products/retractor.jpg",
    productCount: 15,
  },
  {
    slug: "clamps",
    name: "Clamps",
    description: "Vascular and general-purpose clamps",
    image: "/products/kelly-clamp.jpg",
    productCount: 11,
  },
  {
    slug: "bone-instruments",
    name: "Bone Instruments",
    description: "Orthopedic and bone surgery instruments",
    image: "/products/bone-rongeur.jpg",
    productCount: 14,
  },
  {
    slug: "dental",
    name: "Dental Instruments",
    description: "Complete range of dental surgical tools",
    image: "/products/needle-holder.jpg",
    productCount: 20,
  },
  {
    slug: "beauty",
    name: "Beauty Instruments",
    description: "Professional beauty and cosmetic tools",
    image: "/products/mayo-scissors.jpg",
    productCount: 8,
  },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "mayo-scissors-curved",
    name: "Mayo Scissors Curved",
    category: "Scissors",
    categorySlug: "scissors",
    description:
      "Heavy-duty dissecting scissors with curved blades, ideal for cutting heavy fascia and sutures.",
    image: "/products/mayo-scissors.jpg",
    features: [
      "Curved blades",
      "Stainless steel",
      "Autoclavable",
      "Mirror finish",
      "Ergonomic rings",
    ],
    material: "German Stainless Steel",
  },
  {
    id: "2",
    slug: "metzenbaum-scissors",
    name: "Metzenbaum Scissors",
    category: "Scissors",
    categorySlug: "scissors",
    description:
      "Delicate dissecting scissors designed for fine tissue work with long shanks.",
    image: "/products/mayo-scissors.jpg",
    features: ["Fine tips", "Lightweight", "Precision ground"],
    material: "Japanese Steel",
  },
  {
    id: "3",
    slug: "iris-scissors-straight",
    name: "Iris Scissors Straight",
    category: "Scissors",
    categorySlug: "scissors",
    description:
      "Small, sharp scissors for fine suture cutting and delicate ophthalmic procedures.",
    image: "/products/mayo-scissors.jpg",
    features: ["Micro tips", "Spring action", "Mirror finish"],
    material: "Surgical Grade Steel",
  },
  {
    id: "4",
    slug: "adson-forceps",
    name: "Adson Forceps",
    category: "Forceps",
    categorySlug: "forceps",
    description:
      "Tissue forceps with fine-toothed tips for handling delicate tissues.",
    image: "/products/adson-forceps.jpg",
    features: ["1x2 teeth", "Thumb grip", "Serrated handle"],
    material: "German Stainless Steel",
  },
  {
    id: "5",
    slug: "debakey-forceps",
    name: "DeBakey Forceps",
    category: "Forceps",
    categorySlug: "forceps",
    description: "Atraumatic vascular forceps with unique DeBakey jaw pattern.",
    image: "/products/debakey-forceps.jpg",
    features: ["Atraumatic jaws", "DeBakey pattern", "Cardiovascular grade"],
    material: "Titanium Alloy",
  },
  {
    id: "6",
    slug: "russian-forceps",
    name: "Russian Forceps",
    category: "Forceps",
    categorySlug: "forceps",
    description:
      "Heavy tissue forceps with round cup-shaped tips for firm grip.",
    image: "/products/adson-forceps.jpg",
    features: ["Cup-shaped tips", "Heavy duty", "Non-slip grip"],
    material: "Stainless Steel",
  },
  {
    id: "7",
    slug: "mayo-hegar-needle-holder",
    name: "Mayo-Hegar Needle Holder",
    category: "Needle Holders",
    categorySlug: "needle-holders",
    description:
      "Standard needle holder with tungsten carbide inserts for superior grip.",
    image: "/products/needle-holder.jpg",
    features: ["TC inserts", "Ratchet lock", "Cross-serrated jaws"],
    material: "Tungsten Carbide",
  },
  {
    id: "8",
    slug: "castroviejo-needle-holder",
    name: "Castroviejo Needle Holder",
    category: "Needle Holders",
    categorySlug: "needle-holders",
    description:
      "Micro needle holder for ophthalmic and microsurgical procedures.",
    image: "/products/needle-holder.jpg",
    features: ["Lock mechanism", "Micro tips", "Spring action"],
    material: "Titanium",
  },
  {
    id: "9",
    slug: "army-navy-retractor",
    name: "Army-Navy Retractor",
    category: "Retractors",
    categorySlug: "retractors",
    description:
      "Double-ended hand-held retractor for general surgical applications.",
    image: "/products/retractor.jpg",
    features: ["Double ended", "Smooth blades", "Ergonomic handle"],
    material: "Stainless Steel",
  },
  {
    id: "10",
    slug: "weitlaner-retractor",
    name: "Weitlaner Retractor",
    category: "Retractors",
    categorySlug: "retractors",
    description: "Self-retaining retractor with sharp or blunt prongs.",
    image: "/products/retractor.jpg",
    features: ["Self-retaining", "3x4 prongs", "Ratchet lock"],
    material: "German Steel",
  },
  {
    id: "11",
    slug: "kelly-clamp",
    name: "Kelly Clamp",
    category: "Clamps",
    categorySlug: "clamps",
    description:
      "Hemostatic clamp with partial serrations for clamping blood vessels.",
    image: "/products/kelly-clamp.jpg",
    features: ["Partial serration", "Box lock", "Curved jaws"],
    material: "Stainless Steel",
  },
  {
    id: "12",
    slug: "bone-rongeur",
    name: "Bone Rongeur",
    category: "Bone Instruments",
    categorySlug: "bone-instruments",
    description:
      "Double action bone rongeur for cutting and removing bone fragments.",
    image: "/products/bone-rongeur.jpg",
    features: ["Double action", "Spring loaded", "Sharp cutting edge"],
    material: "High Carbon Steel",
  },
  {
    id: "13",
    slug: "dental-elevator",
    name: "Dental Elevator",
    category: "Dental Instruments",
    categorySlug: "dental",
    description: "Luxating elevator for tooth extraction procedures.",
    image: "/products/needle-holder.jpg",
    features: ["Ergonomic handle", "Sharp tip", "Color coded"],
    material: "Stainless Steel",
  },
  {
    id: "14",
    slug: "beauty-scissors-curved",
    name: "Beauty Scissors Curved",
    category: "Beauty Instruments",
    categorySlug: "beauty",
    description:
      "Professional beauty scissors for precise cutting and shaping.",
    image: "/products/mayo-scissors.jpg",
    features: ["Curved blades", "Finger rest", "Mirror polish"],
    material: "Japanese Steel",
  },
  {
    id: "15",
    slug: "mosquito-forceps",
    name: "Mosquito Forceps",
    category: "Forceps",
    categorySlug: "forceps",
    description:
      "Small hemostatic forceps for clamping small vessels and tissues.",
    image: "/products/debakey-forceps.jpg",
    features: ["Full serration", "Delicate tips", "Curved or straight"],
    material: "Stainless Steel",
  },
  {
    id: "16",
    slug: "kocher-forceps",
    name: "Kocher Forceps",
    category: "Forceps",
    categorySlug: "forceps",
    description: "Heavy toothed hemostatic forceps for grasping tough tissue.",
    image: "/products/adson-forceps.jpg",
    features: ["1x2 teeth", "Heavy duty", "Full serration"],
    material: "German Stainless Steel",
  },
];

export const featuredProducts = products.slice(0, 6);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
