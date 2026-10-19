import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";

export default function Philosophy() {
  return (
    <section className="philosophy" id="story" aria-labelledby="story-title">
      <Reveal>
        <p className="philosophy-quote" id="story-title">
          We compose for the hour after you have left the room.
        </p>
      </Reveal>
      <div className="philosophy-grid">
        <div className="philosophy-copy">
          <p className="eyebrow">Our story</p>
          <h2>Craft, worn quietly.</h2>
          <p>
            NOIRÉ is a fictional maison built for this demonstration — a house
            that would rather finish one extrait than launch a season of them.
            Compositions are concentrated, edited, and named for what they leave
            behind.
          </p>
          <p>
            We work with oud, amber, rose, and smoke because those materials
            remember a person. Trends do not. Each formula is written to sit
            close, to change on warm skin, and to be recognised without being
            announced.
          </p>
          <p>
            The atelier in this story is in Ikoyi. The standard is the same one
            we would ask of a bench in Grasse: dose with restraint, print fewer
            words than you mean, and let the fragrance finish the sentence.
          </p>
        </div>
        <div className="philosophy-photos">
          <div className="frame frame-tall">
            <Photo
              src="/images/incense.jpg"
              alt="Incense smoke above dark wood, a study of materials in the NOIRÉ atelier story."
              position="center 30%"
              sizes="(max-width: 800px) 100vw, 28vw"
            />
          </div>
          <div className="frame frame-held">
            <Photo
              src="/images/held.jpg"
              alt="A hand holding an unlabelled frosted bottle of pale gold fragrance."
              position="center 40%"
              tone
              sizes="(max-width: 800px) 70vw, 22vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
