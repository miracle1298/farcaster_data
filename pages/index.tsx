import { useEffect, useState } from "react";

export default function FarcasterData() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <h1>🟣 Farcaster_Data</h1>
      <p>Minimal Next.js page — shows /api/me result below.</p>

      {error && <pre style={{ color: "red" }}>Error: {String(error)}</pre>}

      <pre style={{ background: "#111", color: "#0f0", padding: 12 }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
