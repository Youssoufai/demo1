/**
 * Demonstration catalogue for JUKAYPERFUMES.
 * Photography (Unsplash licence):
 * - collection: photo-1718466044521-d38654f3ba0a
 * - silk: photo-1543422655-ac1c6ca993ed
 * - amber: photo-1622618991746-fe6004db3a47
 * - incense: photo-1627769916425-74c2344a3439
 * - held: photo-1750029418982-81ffffaada20
 */

export const products = [
  {
    id: "oud-noir",
    number: "01",
    name: "Oud Noir",
    family: "Woody",
    profile: "woody",
    kind: "bottle",
    price: 186000,
    size: "50 ml",
    concentration: "Extrait de parfum",
    description:
      "A dry oud, cut with saffron and a leather that remains on cloth the next day.",
    story:
      "Composed for the hour after dark. The oud is smoked rather than sweet, and the leather stays close to the skin.",
    notes: [
      { label: "Top", value: "Saffron, rosewood" },
      { label: "Heart", value: "Oud, cedar" },
      { label: "Base", value: "Leather, ambergris" },
    ],
    stock: 7,
    image: "/images/collection.jpg",
    position: "18% 68%",
    alt: "Oud Noir: a glass perfume bottle with a black dome cap and plain cream label, lit by hard window light on a dark surface.",
  },
  {
    id: "ambre-royale",
    number: "02",
    name: "Ambre Royale",
    family: "Amber",
    profile: "warm",
    kind: "bottle",
    price: 164000,
    size: "50 ml",
    concentration: "Extrait de parfum",
    description:
      "Resin warmed until it feels like skin. Benzoin, a salted amber, vanilla that never turns sugary.",
    story:
      "The house signature for daylight. An amber built on resin and salt, with a vanilla that stays dry.",
    notes: [
      { label: "Top", value: "Bergamot, cardamom" },
      { label: "Heart", value: "Benzoin, orange blossom" },
      { label: "Base", value: "Amber, vanilla, tonka" },
    ],
    stock: 5,
    image: "/images/amber.jpg",
    position: "28% 55%",
    alt: "Ambre Royale: a square glass bottle of golden perfume on a warm gold surface, beside two small jars.",
  },
  {
    id: "rose-obsidienne",
    number: "03",
    name: "Rose Obsidienne",
    family: "Floral",
    profile: "floral",
    kind: "bottle",
    price: 158000,
    size: "50 ml",
    concentration: "Extrait de parfum",
    description:
      "A rose grown in shade. Dew and pink pepper first, then a petal that dries down into incense.",
    story:
      "Not a bouquet. A single rose darkened with pepper and a thread of incense, meant to be worn close.",
    notes: [
      { label: "Top", value: "Pink pepper, dew" },
      { label: "Heart", value: "Rose absolute" },
      { label: "Base", value: "Incense, musk" },
    ],
    stock: 0,
    image: "/images/silk.jpg",
    position: "72% 58%",
    alt: "Rose Obsidienne: a faceted glass perfume bottle with a warm metallic collar, resting on pale silk.",
  },
  {
    id: "velvet-smoke",
    number: "04",
    name: "Velvet Smoke",
    family: "Smoky",
    profile: "smoky",
    kind: "bottle",
    price: 172000,
    size: "50 ml",
    concentration: "Extrait de parfum",
    description:
      "Incense, tobacco absolute, and a cool musk. Smoke with the edges worn soft.",
    story:
      "A quiet burn. Tobacco and incense, softened with musk so the smoke never shouts.",
    notes: [
      { label: "Top", value: "Black pepper, elemi" },
      { label: "Heart", value: "Incense, tobacco" },
      { label: "Base", value: "Vetiver, musk" },
    ],
    stock: 0,
    image: "/images/incense.jpg",
    position: "center 40%",
    alt: "Velvet Smoke: a single incense stick burning on a curved wooden holder, with a thin ribbon of smoke.",
  },
  {
    id: "discovery-set",
    number: "05",
    name: "The Discovery Set",
    family: "The house",
    profile: "set",
    kind: "set",
    price: 48500,
    size: "4 × 7.5 ml",
    concentration: "Extrait de parfum",
    description:
      "Four extraits, sized to learn what stays on your skin before you commit to a bottle.",
    story:
      "Oud Noir, Ambre Royale, Rose Obsidienne, and Velvet Smoke. Each vial is an extrait, not a diluted sample.",
    notes: [],
    stock: 9,
    image: "/images/collection.jpg",
    position: "center 62%",
    alt: "The JUKAYPERFUMES discovery set: several unlabelled glass perfume bottles arranged together in dramatic studio light.",
  },
];

export const stockFilters = [
  { id: "all", label: "All" },
  { id: "in", label: "In stock" },
  { id: "out", label: "Out of stock" },
];

export function purchaseLimit(product) {
  if (!product || product.stock <= 0) return 0;
  return Math.min(8, product.stock);
}

export const profiles = [
  {
    id: "woody",
    label: "Woody",
    line: "Cedar, oud, and the dark of a closed room.",
  },
  {
    id: "warm",
    label: "Warm",
    line: "Amber, resin, and skin after sunlight.",
  },
  {
    id: "floral",
    label: "Floral",
    line: "Rose, pressed into something darker.",
  },
  {
    id: "smoky",
    label: "Smoky",
    line: "Incense, tobacco leaf, a velvet burn.",
  },
];

export const filters = [
  { id: "all", label: "All" },
  { id: "Woody", label: "Woody" },
  { id: "Amber", label: "Amber" },
  { id: "Floral", label: "Floral" },
  { id: "Smoky", label: "Smoky" },
];

export function getProduct(id) {
  return products.find((product) => product.id === id) || null;
}

export function bottles() {
  return products.filter((product) => product.kind === "bottle");
}

export function recommend(profileId) {
  return products.find((product) => product.profile === profileId) || null;
}

export function formatPrice(value) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}
