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

const categoryNames = [
  "Bipolar Forceps", "Monopolar Forceps", "Bipolar Forceps (Non-Stick)", "Bipolar Forceps (Ultra Non-Stick)", 
  "Bipolar Forceps (Hand-Switch)", "Bipolar Forceps (Irrigation)", "Bipolar Forceps (Non-Insulated)", 
  "Monopolar Forceps (Hand-Switch)", "Monopolar Forceps (Hand-Switch Non-Stick)", "European Bipolar Forceps", 
  "European Bipolar Forceps (Non-Stick)", "European Bipolar Forceps (Ultra Non-Stick)", "European Bipolar Forceps (Irrigation)", 
  "European Bipolar Forceps (Suction)", "European Bipolar Forceps (Tungsten Carbide)", "Bipolar Forceps Single-Use (Molded)", 
  "Bipolar Forceps Single-Use", "Bipolar Forceps Single-Use (Non-Stick)", "Bipolar Forceps Single-Use (Ultra Non-Stick)", 
  "Bipolar Forceps Single-Use (Non-Insulated)", "European Bipolar Forceps Single-Use", "European Bipolar Forceps Single-Use (Non-Stick)", 
  "European Bipolar Forceps Single-Use (Ultra Non-Stick)", "Bipolar Artery Sealers", "Bipolar Scissors", 
  "Bipolar Clamp Scissors", "Tonsillectomy Bipolar Clamp", "Endoscopic Bipolar Forceps", "Polypectomy Snare", 
  "Diathermy Instruments", "Bipolar Electrodes", "Bipolar Electrodes Single-Use", "Bipolar Cables", 
  "Monopolar Cables", "Bipolar Cables Single-Use", "Monopolar Cables Single-Use", "Electrosurgical Pencils", 
  "Electrodes (2.4 Mm) Non-Stick", "Tungsten Needle Electrodes (2.4 Mm)", "Conization Electrodes (2.4 Mm)", 
  "Electrodes (4.0 Mm)", "Electrodes (1.6 Mm) Single-Use", "Arthroscopic Electrodes", 
  "Electrosurgical Instruments For Gynecology", "Retractors And Skin Hooks", "Sterilization Trays"
];

export const categories: Category[] = categoryNames.map((name, index) => ({
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  name,
  description: `Premium ${name} for professional clinical and surgical use.`,
  image: "/categories/dummy.jpg",
  productCount: 10 + (index * 7) % 40,
}));

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
