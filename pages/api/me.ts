import type { NextApiRequest, NextApiResponse } from "next";

const TARGET_FID = process.env.TARGET_FID || "232798";

const MOCK = {
  fid: Number(TARGET_FID),
  username: "web3player",
  follower_count: 2767,
  following_count: 1086,
  casts_count: 12,
  score: 0.75,
  _note: "mock data (upstream unreachable or key missing)"
};

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const key = process.env.NEYNAR_API_KEY;
  if (!key) {
    return res.status(200).json({ ...MOCK, _warning: "NEYNAR_API_KEY missing (using mock)" });
  }

  try {
    const response = await fetch(`https://api.neynar.xyz/farcaster/fids/${TARGET_FID}`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      return res.status(response.status).json(data);
    } catch {
      return res.status(response.status).send(text);
    }
  } catch (err: any) {
    console.error("Upstream fetch failed:", err?.message || err);
    return res.status(200).json({ ...MOCK, _error: err?.message || "fetch failed" });
  }
}
