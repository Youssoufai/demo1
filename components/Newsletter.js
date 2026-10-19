"use client";

import { useState } from "react";

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    const next = email.trim();
    if (!next) {
      setError("Enter an email address.");
      return;
    }
    if (!validEmail(next)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
  }

  return (
    <section className="newsletter" id="newsletter" aria-labelledby="newsletter-title">
      <div>
        <p className="eyebrow">Correspondence</p>
        <h2 id="newsletter-title">A letter, occasionally.</h2>
        <p>
          New compositions and journal notes. This form stays in your browser.
          Nothing is sent to a server.
        </p>
      </div>
      {done ? (
        <p className="newsletter-success" role="status">
          You are on the list for this visit. We have not stored your address
          anywhere else — this demonstration has no mailing service.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <label htmlFor="newsletter-email">Email address</label>
          <div className="newsletter-row">
            <input
              id="newsletter-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError("");
              }}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "newsletter-error" : undefined}
            />
            <button type="submit" className="btn btn-fill">
              Request
            </button>
          </div>
          {error ? (
            <p id="newsletter-error" className="form-error" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      )}
    </section>
  );
}
