import { useEffect, useState } from "react";

export default function LiveScores() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchLiveScores() {
    try {
      const apiKey = import.meta.env.VITE_CRIC_API_KEY;

      const response = await fetch(
        `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`
      );

      const result = await response.json();

      if (result.status === "success") {
        setMatches(result.data || []);
      }
    } catch (error) {
      console.error("Live score error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLiveScores();

    const interval = setInterval(() => {
      fetchLiveScores();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <p className="text-white/60">Loading live scores...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
          Live cricket
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Real-time scores
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {matches.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <p className="text-white/60">No live matches available right now.</p>
          </div>
        ) : (
          matches.slice(0, 9).map((match) => (
            <div
              key={match.id}
              className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_0_48px_rgba(214,167,68,0.12)]"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded bg-[#f0c96a]/10 px-2 py-1 text-xs font-semibold text-[#ffe08c]">
                  {match.matchType || "Match"}
                </span>
                <span className="text-xs text-emerald-300">
                  {match.status || "Live"}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-white">{match.name}</h3>

              <p className="mt-2 text-sm text-white/45">
                {match.venue || "Venue unavailable"}
              </p>

              <div className="mt-5 space-y-3">
                {match.score?.length ? (
                  match.score.map((item, index) => (
                    <div key={index} className="rounded-md bg-black/25 p-3">
                      <p className="text-sm font-semibold text-white">
                        {item.inning}
                      </p>
                      <p className="mt-1 text-xl font-bold text-[#ffe08c]">
                        {item.r}/{item.w}
                      </p>
                      <p className="text-sm text-white/50">Overs: {item.o}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-white/50">
                    Scorecard not available yet.
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}