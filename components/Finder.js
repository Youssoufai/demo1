"use client";

import { useState } from "react";
import { formatPrice, profiles, recommend } from "@/lib/catalog";
import Photo from "@/components/Photo";
import AddButton from "@/components/AddButton";

export default function Finder() {
  const [selected, setSelected] = useState(null);
  const match = selected ? recommend(selected) : null;

  return (
    <section className="finder" id="finder" aria-labelledby="finder-title">
      <div className="finder-ask">
        <p className="eyebrow eyebrow-light">Fragrance finder</p>
        <h2 id="finder-title">Which atmosphere should stay with you?</h2>
        <ul className="profile-list">
          {profiles.map((profile) => (
            <li key={profile.id}>
              <button
                type="button"
                className={`profile${selected === profile.id ? " is-selected" : ""}`}
                aria-pressed={selected === profile.id}
                onClick={() => setSelected(profile.id)}
              >
                <span>{profile.label}</span>
                <small>{profile.line}</small>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="finder-result" aria-live="polite">
        {match ? (
          <article>
            <div className="frame frame-portrait">
              <Photo
                src={match.image}
                alt={match.alt}
                position={match.position}
                sizes="(max-width: 900px) 100vw, 36vw"
              />
            </div>
            <p className="index">Recommended · No. {match.number}</p>
            <h3>{match.name}</h3>
            <p className="family">{match.family}</p>
            <p className="desc">{match.story}</p>
            <p className="price price-light">
              {formatPrice(match.price)}
              <span>{match.size}</span>
            </p>
            <AddButton id={match.id} variant="light" />
          </article>
        ) : (
          <div className="finder-waiting">
            <p>Choose an atmosphere. A single composition will answer.</p>
          </div>
        )}
      </div>
    </section>
  );
}
