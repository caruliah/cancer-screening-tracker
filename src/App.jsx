import { useState } from "react";
import { motion } from "framer-motion";

const screeningTypes = ["Breast", "Cervical", "Colorectal", "Lung"];

const statusLegend = {
  meets: "Meets best practice",
  partial: "Pilot / partial",
  missing: "No organized program"
};

const provinces = [
  {
    name: "British Columbia",
    programs: {
      Breast: { status: "meets" },
      Cervical: { status: "meets" },
      Colorectal: { status: "meets" },
      Lung: { status: "partial" }
    },
    advocacy:
      "Scale lung cancer screening to a fully organized provincial program."
  },
  {
    name: "Alberta",
    programs: {
      Breast: { status: "meets" },
      Cervical: { status: "meets" },
      Colorectal: { status: "meets" },
      Lung: { status: "missing" }
    },
    advocacy:
      "Commit to a province‑wide organized lung cancer screening program."
  },
  {
    name: "Ontario",
    programs: {
      Breast: { status: "meets" },
      Cervical: { status: "meets" },
      Colorectal: { status: "meets" },
      Lung: { status: "meets" }
    },
    advocacy:
      "Close participation gaps for equity‑deserving populations."
  }
];

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1>Cancer Screening in Canada</h1>
      <p>Click a province to explore screening programs.</p>

      <div style={{ display: "grid", gap: 16 }}>
        {provinces.map((p) => (
          <motion.div
            key={p.name}
            whileHover={{ scale: 1.02 }}
            style={{ border: "1px solid #ccc", padding: 16, cursor: "pointer" }}
            onClick={() => setSelected(p)}
          >
            <strong>{p.name}</strong>
            <ul>
              {screeningTypes.map((t) => (
                <li key={t}>
                  {t}: {statusLegend[p.programs[t].status]}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {selected && (
        <div style={{ marginTop: 32 }}>
          <h2>{selected.name}</h2>
          <p>{selected.advocacy}</p>
          <button onClick={() => setSelected(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
