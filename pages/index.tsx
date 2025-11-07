import { useEffect, useState } from "react";

export default function FarcasterData() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  const copyPost = async () => {
    const frameUrl = `${window.location.origin}/frame.html`;
    const text = \`Check my Farcaster Data 🔍
Open the frame: \${frameUrl}
#Farcaster #Warpcast\`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this:", text);
    }
  };

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: 24, maxWidth: 900, margin: "auto" }}>
      <h1 style={{ marginBottom: 8 }}>🟣 Farcaster_Data</h1>
      <p style={{ marginTop: 0, color: "#666" }}>A minimal Farcaster stats + frame viewer.</p>

      <button onClick={copyPost} style={{ marginTop: 14, padding: "8px 12px" }}>
        {copied ? "Copied ✅" : "Copy Warpcast Post"}
      </button>

      {error && <div style={{ marginTop: 18, color: "crimson" }}>Error: {error}</div>}

      <div style={{ marginTop: 18 }}>
        <pre style={{ background: "#0b0b0b", color: "#7CFC00", padding: 12, overflowX: "auto" }}>
          {data ? JSON.stringify(data, null, 2) : "Loading profile..."}
        </pre>
      </div>
    </main>
  );
}
