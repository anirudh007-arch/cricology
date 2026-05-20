import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  Brain,
  Flame,
  Gauge,
  LockKeyhole,
  Radio,
  Shield,
  ShieldCheck,
  Swords,
  Target,
  Trophy,
  UserRound,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const liveMatches = [
  {
    id: "ind-aus-odi",
    title: "India vs Australia",
    format: "ODI",
    status: "Live",
    venue: "Mumbai",
    score: "IND 247/4",
    overs: "38.2",
    winProbability: 68,
    runRate: "6.44",
  },
  {
    id: "eng-nz-t20",
    title: "England vs New Zealand",
    format: "T20",
    status: "Upcoming",
    venue: "London",
    score: "Starts 19:30",
    overs: "Preview",
    winProbability: 52,
    runRate: "-",
  },
  {
    id: "sa-pak-test",
    title: "South Africa vs Pakistan",
    format: "Test",
    status: "Stumps",
    venue: "Cape Town",
    score: "PAK 312/8",
    overs: "Day 2",
    winProbability: 44,
    runRate: "3.08",
  },
];

const playerRankings = [
  { name: "Virat Kohli", team: "IND", rating: 94, impact: "+8.2", role: "Top order" },
  { name: "Babar Azam", team: "PAK", rating: 91, impact: "+7.6", role: "Anchor" },
  { name: "Rashid Khan", team: "AFG", rating: 89, impact: "+7.1", role: "Spinner" },
  { name: "Jos Buttler", team: "ENG", rating: 87, impact: "+6.8", role: "Finisher" },
];

const runTrend = [
  { over: "1-5", actual: 31, projected: 34 },
  { over: "6-10", actual: 74, projected: 69 },
  { over: "11-15", actual: 118, projected: 111 },
  { over: "16-20", actual: 171, projected: 166 },
  { over: "21-25", actual: 204, projected: 211 },
  { over: "26-30", actual: 247, projected: 258 },
];

const radarData = [
  { subject: "Strike Rate", value: 88 },
  { subject: "Consistency", value: 82 },
  { subject: "Spin Play", value: 91 },
  { subject: "Pace Play", value: 86 },
  { subject: "Pressure", value: 79 },
  { subject: "Boundary %", value: 84 },
];

const shotDistribution = [
  { shot: "Cover", runs: 424 },
  { shot: "Pull", runs: 312 },
  { shot: "Flick", runs: 388 },
  { shot: "Drive", runs: 466 },
  { shot: "Sweep", runs: 204 },
];

const teamMetrics = [
  { team: "India", batting: 91, bowling: 84, fielding: 88, form: "W W L W W" },
  { team: "Australia", batting: 88, bowling: 89, fielding: 86, form: "W L W W L" },
  { team: "England", batting: 86, bowling: 80, fielding: 83, form: "L W W L W" },
  { team: "Pakistan", batting: 81, bowling: 87, fielding: 78, form: "W W L L W" },
];

function SectionHeader({ eyebrow, title }) {
  return (
    <div className="mb-5">
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-xl font-semibold text-white md:text-2xl">{title}</h2>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, delta }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_0_48px_rgba(214,167,68,0.16)]">
      <div className="mb-6 flex items-center justify-between">
        <div className="grid size-10 place-items-center rounded-md border border-[#f0c96a]/25 bg-[#f0c96a]/10 text-[#ffe08c]">
          <Icon size={19} />
        </div>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
          {delta}
        </span>
      </div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050608]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-md bg-[#f0c96a] text-sm font-black text-black">
            C
          </span>
          <span className="text-lg font-semibold text-white">Cricology</span>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          {[
            ["Dashboard", Activity],
            ["Players", UserRound],
            ["Matches", BarChart3],
            ["Tournaments", Trophy],
            ["Teams", Shield],
          ].map(([label, Icon]) => (
            <button
              key={label}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white/62 transition hover:bg-white/10 hover:text-white"
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        <button className="rounded-md border border-[#f0c96a]/30 bg-[#f0c96a]/10 px-4 py-2 text-sm font-semibold text-[#ffe08c] transition hover:bg-[#f0c96a] hover:text-black">
          Sign in
        </button>
      </nav>
    </header>
  );
}

function RunRateChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={runTrend} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
          <defs>
            <linearGradient id="actualRuns" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f0c96a" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#f0c96a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="over" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }} />
          <Tooltip contentStyle={{ background: "#090b0f", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8 }} />
          <Area type="monotone" dataKey="projected" stroke="#7b8496" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
          <Area type="monotone" dataKey="actual" stroke="#f0c96a" strokeWidth={3} fill="url(#actualRuns)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function PlayerRadarChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData}>
          <PolarGrid stroke="rgba(255,255,255,0.12)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.68)", fontSize: 11 }} />
          <Tooltip contentStyle={{ background: "#090b0f", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8 }} />
          <Radar dataKey="value" stroke="#f0c96a" fill="#f0c96a" fillOpacity={0.28} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ShotChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={shotDistribution} margin={{ left: -24, right: 8 }}>
          <XAxis dataKey="shot" tick={{ fill: "rgba(255,255,255,0.58)", fontSize: 12 }} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.58)", fontSize: 12 }} />
          <Tooltip contentStyle={{ background: "#090b0f", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8 }} />
          <Bar dataKey="runs" fill="#d6a744" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function LiveMatchCard({ match }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_0_48px_rgba(214,167,68,0.16)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white/65">
              {match.format}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#ffe08c]">
              <Radio size={13} />
              {match.status}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white">{match.title}</h3>
          <p className="mt-1 text-sm text-white/48">{match.venue}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-white">{match.score}</p>
          <p className="text-sm text-white/48">{match.overs}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-`cols-2 gap-3">
        <div className="rounded-md bg-black/25 p-3">
          <p className="text-xs text-white/42">Win probability</p>
          <p className="mt-1 text-xl font-semibold text-white">{match.winProbability}%</p>
        </div>
        <div className="rounded-md bg-black/25 p-3">
          <p className="text-xs text-white/42">Run rate</p>
          <p className="mt-1 text-xl font-semibold text-white">{match.runRate}</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(214,167,68,0.14),transparent_34%),#050608] font-sans text-white">
      <Navbar />

      <main>
        <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 md:grid-cols-[1.03fr_0.97fr] md:px-6">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f0c96a]/25 bg-[#f0c96a]/10 px-3 py-1.5 text-sm font-medium text-[#ffe08c]">
              <Radio size={15} />
              Live cricket intelligence, rebuilt for analysts
            </div>

            <h1 className="text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
              Cricology
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/64">
              A premium sports intelligence dashboard for live scores, player form,
              win probability, tournament trends, and phase-wise cricket analytics.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-md bg-[#f0c96a] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#ffe08c]">
                Open dashboard
                <ArrowRight size={17} />
              </button>
              <button className="inline-flex items-center gap-2 rounded-md border border-white/12 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                View player profile
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-[0_0_48px_rgba(214,167,68,0.16)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
                  Live model preview
                </p>
                <h2 className="mt-1 text-xl font-semibold text-white">
                  India chase projection
                </h2>
              </div>
              <span className="rounded-full bg-emerald-400/12 px-3 py-1 text-sm font-semibold text-emerald-300">
                68% IND
              </span>
            </div>
            <RunRateChart />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
          <SectionHeader eyebrow="Command center" title="Dashboard metrics" />
          <div className="grid gap-4 md:grid-cols-4">
            <StatCard icon={Activity} label="Live matches" value="12" delta="+3 today" />
            <StatCard icon={Target} label="Avg strike rate" value="142.8" delta="+6.4%" />
            <StatCard icon={Gauge} label="Economy index" value="6.21" delta="-0.8" />
            <StatCard icon={ShieldCheck} label="Model accuracy" value="87%" delta="+2.1%" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
          <SectionHeader eyebrow="Match center" title="Live analytics board" />
          <div className="grid gap-4 md:grid-cols-3">
            {liveMatches.map((match) => (
              <LiveMatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
          <SectionHeader eyebrow="Trending players" title="Current impact rankings" />
          <div className="grid gap-4 md:grid-cols-4">
            {playerRankings.map((player, index) => (
              <div
                key={player.name}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_0_48px_rgba(214,167,68,0.16)]"
              >
                <p className="text-sm text-[#ffe08c]">#{index + 1}</p>
                <h3 className="mt-4 text-lg font-semibold text-white">{player.name}</h3>
                <p className="mt-1 text-sm text-white/45">
                  {player.team} - {player.role}
                </p>
                <p className="mt-6 text-3xl font-semibold text-white">{player.rating}</p>
                <p className="mt-1 text-sm text-emerald-300">{player.impact} impact</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
          <SectionHeader eyebrow="Player profile" title="Virat Kohli analytics" />

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_48px_rgba(214,167,68,0.16)]">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-4xl font-semibold text-white">Virat Kohli</h2>
                  <p className="mt-2 text-white/52">
                    India - Top-order batter - Right hand
                  </p>
                </div>
                <span className="rounded-md bg-[#f0c96a] px-3 py-2 text-sm font-black text-black">
                  94 OVR
                </span>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  ["Matches", "517"],
                  ["Runs", "26,733"],
                  ["Average", "54.1"],
                  ["Hundreds", "80"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md bg-black/25 p-4">
                    <p className="text-xs text-white/42">{label}</p>
                    <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <StatCard icon={Flame} label="Recent form" value="91.4" delta="+12%" />
              <StatCard icon={Swords} label="Strike rate" value="138.2" delta="+4.8%" />
              <StatCard icon={Shield} label="Control rate" value="86%" delta="+2.2%" />
              <StatCard icon={Award} label="Pressure index" value="8.7" delta="+0.6" />
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_0_48px_rgba(214,167,68,0.16)]">
              <SectionHeader eyebrow="Skill radar" title="Performance profile" />
              <PlayerRadarChart />
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_0_48px_rgba(214,167,68,0.16)]">
              <SectionHeader eyebrow="Shot map" title="Run distribution by stroke" />
              <ShotChart />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
          <SectionHeader eyebrow="Team metrics" title="Performance matrix" />

          <div className="overflow-hidden rounded-lg border border-white/10">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="bg-white/[0.06] text-xs uppercase tracking-[0.16em] text-white/45">
                <tr>
                  <th className="px-4 py-3 font-medium">Team</th>
                  <th className="px-4 py-3 font-medium">Batting</th>
                  <th className="px-4 py-3 font-medium">Bowling</th>
                  <th className="px-4 py-3 font-medium">Fielding</th>
                  <th className="px-4 py-3 font-medium">Recent form</th>
                </tr>
              </thead>
              <tbody>
                {teamMetrics.map((team) => (
                  <tr key={team.team} className="border-t border-white/10">
                    <td className="px-4 py-4 font-semibold text-white">{team.team}</td>
                    <td className="px-4 py-4 text-white/70">{team.batting}</td>
                    <td className="px-4 py-4 text-white/70">{team.bowling}</td>
                    <td className="px-4 py-4 text-white/70">{team.fielding}</td>
                    <td className="px-4 py-4 text-[#ffe08c]">{team.form}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto max-w-md px-4 pb-20">
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_48px_rgba(214,167,68,0.16)]">
            <LockKeyhole className="mb-6 text-[#ffe08c]" size={28} />
            <h2 className="text-2xl font-semibold text-white">Sign in to Cricology</h2>
            <p className="mt-3 text-sm leading-6 text-white/55">
              This is a frontend demo login card. Later you can connect Clerk
              authentication here.
            </p>
            <button className="mt-6 w-full rounded-md bg-[#f0c96a] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#ffe08c]">
              Continue to demo dashboard
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}