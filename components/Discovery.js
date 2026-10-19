import { formatPrice, getProduct } from "@/lib/catalog";
import Photo from "@/components/Photo";
import AddButton from "@/components/AddButton";

export default function Discovery() {
  const set = getProduct("discovery-set");

  return (
    <section className="discovery" aria-labelledby="discovery-title">
      <div className="frame discovery-media">
        <Photo
          src={set.image}
          alt={set.alt}
          position="center 70%"
          sizes="(max-width: 900px) 100vw, 48vw"
        />
      </div>
      <div className="discovery-copy">
        <p className="eyebrow eyebrow-light">To begin</p>
        <h2 id="discovery-title">The Discovery Set</h2>
        <p>{set.story}</p>
        <ul>
          <li>No. 01 Oud Noir</li>
          <li>No. 02 Ambre Royale</li>
          <li>No. 03 Rose Obsidienne</li>
          <li>No. 04 Velvet Smoke</li>
        </ul>
        <p className="price price-light">
          {formatPrice(set.price)}
          <span>{set.size}</span>
        </p>
        <AddButton id={set.id} variant="light" />
      </div>
    </section>
  );
}
