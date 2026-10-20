import Link from "next/link";

export default function NotFound() {
  return (
    <main id="content" className="missing">
      <p className="eyebrow eyebrow-light">JUKAYPERFUMES</p>
      <h1>This page has left the room.</h1>
      <p>The address does not match anything in the house.</p>
      <Link className="btn btn-ghost" href="/">
        Return home
      </Link>
    </main>
  );
}
