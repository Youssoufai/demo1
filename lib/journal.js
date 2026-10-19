export const articles = [
  {
    slug: "the-art-of-layering",
    title: "The art of layering",
    kicker: "Practice",
    dek: "Two extraits can share a skin. The order matters more than the number of sprays.",
    image: "/images/collection.jpg",
    position: "center 60%",
    alt: "Several glass perfume bottles arranged in hard light, suggesting a wardrobe of scents to layer.",
    read: "6 min",
    paragraphs: [
      "Layering is not a trick for using up samples. It is a way of writing a third fragrance that the house did not bottle — one that exists only on you.",
      "Begin with the darker composition and give it a minute. Oud Noir or Velvet Smoke should meet the skin before anything brighter arrives. Heat opens the base. If you spray the rose first, the oud will sit on top of it like a coat thrown over a dress.",
      "Two sprays are enough. An extrait is concentrated; a third pass usually dulls the contrast you were hoping to keep. Apply the second fragrance to a different place — the wrist if the first is on the neck, the collar if the first is on the chest. They should meet as you move, not as a single cloud.",
      "A pairing we return to in the atelier: Ambre Royale under Rose Obsidienne. The amber gives the rose a place to land, and the rose keeps the resin from closing the room. If the day is already warm, reverse nothing. Amber in heat is plenty.",
      "Layering fails when both fragrances are trying to be the voice. Choose one to speak and one to support it. The rest is patience, and the willingness to stop.",
    ],
  },
  {
    slug: "choosing-a-signature",
    title: "Choosing a signature",
    kicker: "Wardrobe",
    dek: "A signature is not the fragrance you admire. It is the one people mention when you have already left.",
    image: "/images/held.jpg",
    position: "center 42%",
    alt: "A hand holding a frosted bottle of pale gold perfume, close and unlabelled.",
    read: "5 min",
    paragraphs: [
      "Most people choose a perfume the way they choose a first impression: quickly, under bright light, from the top notes. A signature is decided later, on fabric, after lunch, in a car with the windows up.",
      "Wear a composition for three days before you judge it. Day one is curiosity. Day two is honesty. Day three tells you whether it belongs to your life or only to the blotter. If you are tired of it by the second evening, it is not your signature, however beautiful it was in the first minute.",
      "Ask one question of the people who know you well, and ask it once: what do I smell like when I am not trying? Their answer is more useful than a pyramid. Signatures are recognised by others. You mostly stop noticing yours, which is the point.",
      "At NOIRÉ we would rather you own one extrait and finish it than collect four and rotate them out of nerves. The Discovery Set exists so that the choice can be made on skin, in Lagos heat and in air-conditioned rooms, before a full bottle is opened.",
      "When you find it, stop searching for a while. A signature earns its name by staying.",
    ],
  },
  {
    slug: "how-to-read-a-note",
    title: "How to read a note",
    kicker: "Composition",
    dek: "A note list is a map, not the country. Skin, heat, and time redraw it.",
    image: "/images/incense.jpg",
    position: "center 35%",
    alt: "Incense smoke rising from a wooden holder, a study in a single fragrant material.",
    read: "7 min",
    paragraphs: [
      "A pyramid is a courtesy. It tells you the materials the perfumer refused to leave out. It does not tell you the dose, the quality, or what your skin will do with them. Two roses with the same word on the box can live entirely different lives.",
      "Read from the base upward. The base is what you will actually wear; the top is what greets you and then leaves. If leather, oud, musk, or amber sit at the bottom, expect them to be the sentence. The citrus above them is punctuation.",
      "Materials are not moods, though language pretends otherwise. Incense can be cool. Vanilla can be dry. Oud can be medicinal, barnyard, or as smooth as a polished armrest — the word alone settles nothing. This is why we print short lists and ask you to smell the extrait, not the adjective.",
      "On a strip, judge the first minute and then the twentieth. On skin, judge the second hour. Lagos humidity will lift sweet materials and soften woods; an air-conditioned office will do the reverse. A note you loved in one room may step back in another. That is the composition working, not failing.",
      "If you remember only one practice: smell the fragrance after it has become quiet. The quiet part is the one that stays.",
    ],
  },
];

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug) || null;
}
