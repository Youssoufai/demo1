import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <p className="wordmark">DEMO SCENTS</p>
          <p className="footer-sign">A scent that stays.</p>
        </div>
        <nav aria-label="Footer">
          <Link href="/store">Store</Link>
          <Link href="/#fragrances">Fragrances</Link>
          <Link href="/#collections">Collections</Link>
          <Link href="/#story">Our Story</Link>
          <Link href="/#journal">Journal</Link>
          <Link href="/journal/choosing-a-signature">A signature</Link>
        </nav>
        <div>
          <p className="footer-label">Visit — demonstration</p>
          <p>14 Glover Road, Ikoyi, Lagos</p>
          <p>
            <a href="mailto:atelier@jukayperfumes.demo">atelier@jukayperfumes.demo</a>
          </p>
          <p>
            <a href="tel:+23417000140">+234 1 700 0140</a>
          </p>
        </div>
        <div>
          <p className="footer-label">Social — demonstration</p>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noreferrer">
            Pinterest
          </a>
        </div>
      </div>
      <div className="footer-base">
        <p>
          Demonstration website. The maison, prices, address, and contact
          details are fictional. No orders are fulfilled and no payments are
          taken.
        </p>
        <p>Still-life photography via Unsplash, used under the Unsplash licence.</p>
      </div>
    </footer>
  );
}
