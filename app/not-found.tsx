import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">NOT FOUND</span>
      <h1>This lesson is not in the six-day course.</h1>
      <p>Choose Day 1–6 from the course overview.</p>
      <Link className="button button-primary" href="/overview">
        Return to overview
      </Link>
    </main>
  );
}
