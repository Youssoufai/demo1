import { getProduct, formatPrice } from "@/lib/catalog";
import Photo from "@/components/Photo";
import AddButton from "@/components/AddButton";

export default function Editorial() {
  const fragrance = getProduct("ambre-royale");

  return (
    <section className="editorial" id="collections" aria-labelledby="editorial-title">
      <div className="editorial-media">
        <Photo
          src={fragrance.image}
          alt={fragrance.alt}
          position="32% 48%"
          sizes="(max-width: 900px) 100vw, 62vw"
        />
      </div>
      <div className="editorial-panel">
        <p className="eyebrow">The house signature</p>
        <h2 id="editorial-title">
          Ambre
          <span> Royale</span>
        </h2>
        <p className="editorial-lead">{fragrance.story}</p>
        <dl className="notes">
          {fragrance.notes.map((note) => (
            <div key={note.label}>
              <dt>{note.label}</dt>
              <dd>{note.value}</dd>
            </div>
          ))}
        </dl>
        <p className="price price-light">
          {formatPrice(fragrance.price)}
          <span>
            {fragrance.size} · {fragrance.concentration}
          </span>
        </p>
        <AddButton id={fragrance.id} variant="light" />
        <a className="text-link" href="#finder">
          Not sure — find a scent
        </a>
      </div>
    </section>
  );
}
