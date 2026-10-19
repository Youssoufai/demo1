import Link from "next/link";
import { articles } from "@/lib/journal";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";

export default function Journal() {
  const [lead, ...rest] = articles;

  return (
    <section className="journal" id="journal" aria-labelledby="journal-title">
      <div className="band-head">
        <div>
          <p className="eyebrow">Journal</p>
          <h2 id="journal-title">Notes from the house.</h2>
        </div>
        <p className="band-note">Three short essays. No advice you cannot use.</p>
      </div>
      <div className="journal-grid">
        <Reveal>
          <article className="journal-lead">
            <Link href={`/journal/${lead.slug}`} className="journal-link">
              <div className="frame frame-journal">
                <Photo src={lead.image} alt={lead.alt} position={lead.position} sizes="(max-width: 800px) 100vw, 58vw" />
              </div>
              <p className="index">
                {lead.kicker}
                <span> · {lead.read}</span>
              </p>
              <h3>{lead.title}</h3>
              <p>{lead.dek}</p>
            </Link>
          </article>
        </Reveal>
        <div className="journal-rest">
          {rest.map((article) => (
            <Reveal key={article.slug}>
              <article>
                <Link href={`/journal/${article.slug}`} className="journal-link">
                  <div className="frame frame-journal-sm">
                    <Photo
                      src={article.image}
                      alt={article.alt}
                      position={article.position}
                      sizes="(max-width: 800px) 100vw, 30vw"
                    />
                  </div>
                  <p className="index">
                    {article.kicker}
                    <span> · {article.read}</span>
                  </p>
                  <h3>{article.title}</h3>
                  <p>{article.dek}</p>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
