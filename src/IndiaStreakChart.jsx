import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const indiaFormatStreaks = [
  {
    format: "Tests",
    streak: -2,
    label: "L2",
    note: "Lost last 2 Tests vs South Africa",
  },
  {
    format: "ODIs",
    streak: -2,
    label: "L2",
    note: "Lost last 2 ODIs vs New Zealand",
  },
  {
    format: "T20Is",
    streak: 5,
    label: "W5",
    note: "Won latest T20I run including T20 WC final",
  },
];

export default function IndiaStreakChart() {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_0_48px_rgba(214,167,68,0.16)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
            India form tracker
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Current match streak by format
          </h2>
        </div>
        <span className="rounded-full bg-[#f0c96a]/10 px-3 py-1 text-sm font-semibold text-[#ffe08c]">
          Updated snapshot
        </span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={indiaFormatStreaks} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis
              dataKey="format"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[-5, 5]}
              tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.25)" />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              contentStyle={{
                background: "#090b0f",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                color: "#fff",
              }}
              formatter={(value, name, item) => [
                item.payload.label,
                item.payload.note,
              ]}
            />
            <Bar dataKey="streak" radius={[6, 6, 6, 6]}>
              {indiaFormatStreaks.map((item) => (
                <Cell
                  key={item.format}
                  fill={item.streak > 0 ? "#34d399" : "#f87171"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {indiaFormatStreaks.map((item) => (
          <div key={item.format} className="rounded-md bg-black/25 p-3">
            <p className="text-sm text-white/45">{item.format}</p>
            <p className={item.streak > 0 ? "text-2xl font-bold text-emerald-300" : "text-2xl font-bold text-red-300"}>
              {item.label}
            </p>
            <p className="mt-1 text-xs text-white/50">{item.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}