import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/journal";
import Photo from "@/components/Photo";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Journal" };
  return {
    title: article.title,
    description: article.dek,
    openGraph: {
      title: article.title,
      description: article.dek,
      images: [{ url: article.image, alt: article.alt }],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <main id="content" className="essay">
      <Link className="essay-back" href="/#journal">
        Journal
      </Link>
      <div className="essay-hero">
        <div>
          <p className="eyebrow">{article.kicker}</p>
          <h1>{article.title}</h1>
          <p className="essay-dek">{article.dek}</p>
        </div>
        <div className="frame frame-journal">
          <Photo
            src={article.image}
            alt={article.alt}
            position={article.position}
            priority
            sizes="(max-width: 800px) 100vw, 46vw"
          />
        </div>
      </div>
      <div className="essay-body">
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
        <p>
          <Link className="text-link" href="/#fragrances">
            Discover the collection
          </Link>
        </p>
      </div>
    </main>
  );
}
