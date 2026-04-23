import { useState } from "react";

// CCS-inspired colours
const CCS_YELLOW = "#FFD91B";
const CCS_BLACK = "#02070D";
const CCS_GREY = "#475569";

// Status colours (colorectal screening focus)
const STATUS_COLOURS = {
  organized: "#16a34a", // green
  pilot: "#f59e0b",     // amber
  none: "#dc2626"       // red
};

/* =====================================================
   DATA — COLORECTAL CANCER SCREENING (PUBLIC‑READY)
   Notes:
   • All provinces operate organized colorectal screening for average‑risk adults.
   • Most programs currently invite people ages 50–74.
   • The Canadian Cancer Society recommends lowering the start age to 45.
   ===================================================== */
const jurisdictions = {
  "British Columbia": {
    status: "organized",
    ages: "50–74 (CCS recommends starting at 45)",
    test: "Fecal Immunochemical Test (FIT) every 2 years",
    advocacy:
      "Lowering the start age for average‑risk screening to 45 would improve early detection and better reflect rising rates of colorectal cancer in younger adults."
  },
  Alberta: {
    status: "organized",
    ages: "50–74 (CCS recommends starting at 45)",
    test: "FIT every 1–2 years",
    advocacy:
      "Expanding eligibility to include people aged 45–49 would strengthen Alberta’s prevention efforts and align with emerging evidence."
  },
  Saskatchewan: {
    status: "organized",
    ages: "50–74 (CCS recommends starting at 45)",
    test: "FIT every 2 years",
    advocacy:
      "Earlier screening would help address increasing colorectal cancer incidence among younger adults in Saskatchewan."
  },
  Manitoba: {
    status: "organized",
    ages: "50–74 (CCS recommends starting at 45)",
    test: "FIT every 2 years",
    advocacy:
      "Manitoba could reduce late‑stage diagnoses by lowering the screening start age in line with CCS recommendations."
  },
  Ontario: {
    status: "organized",
    ages: "50–74 (CCS recommends starting at 45)",
    test: "FIT every 2 years",
    advocacy:
      "Ontario’s organized program provides a strong foundation for expanding screening to younger, average‑risk adults."
  },
  Quebec: {
    status: "organized",
    ages: "50–74 (CCS recommends starting at 45)",
    test: "FIT / FOBT every 2 years",
    advocacy:
      "Lowering the screening start age would support earlier detection and help reduce preventable colorectal cancer deaths in Quebec."
  },
  "Atlantic Canada": {
    status: "organized",
    ages: "50–74 (CCS recommends starting at 45)",
    test: "FIT every 2 years",
    advocacy:
      "A coordinated regional shift to begin screening at age 45 would improve consistency and equity across Atlantic Canada."
  },
  "Northern Canada": {
    status: "none",
    ages: "No population‑based program",
    test: "Opportunistic screening",
    advocacy:
      "Developing accessible, organized colorectal screening in northern and remote communities is essential to advancing equity nationwide."
  }
};

/* ================= APP ================= */
export default function App() {
  const [active, setActive] = useState("British Columbia");
  const data = jurisdictions[active];
  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: CCS_BLACK }}>
      {/* Hero */}
      <header style={{ background: CCS_YELLOW, padding: "56px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{ fontSize: 44, marginBottom: 12 }}>
            Colorectal Cancer Screening in Canada
          </h1>
          <p style={{ fontSize: 20, maxWidth: 820 }}>
            Organized colorectal cancer screening saves lives — but most
            programs still begin at age 50, despite rising cancer rates among
            younger adults.
          </p>
        </div>
      </header>


      {/* National framing + map */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        <p style={{ color: CCS_GREY, maxWidth: 900 }}>
          Across Canada, organized colorectal cancer screening programs exist
          for average‑risk adults. However, the current starting age of most
          programs is 50, while evidence shows increasing incidence among
          people aged 45–49.
        </p>

        <StatusLegend />
        <CanadaPoliticalMap active={active} onSelect={setActive} />
      </section>

      {/* Detail panel */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px" }}>
        <section style={{ marginBottom: 36 }}>
          <h2>{active}</h2>
          <p><strong>Current eligibility:</strong> {data.ages}</p>
          <p><strong>Screening test:</strong> {data.test}</p>
        </section>

        <section
          style={{ borderLeft: `6px solid ${CCS_YELLOW}`, paddingLeft: 24 }}
        >
          <h3>What needs to change</h3>
          <p>{data.advocacy}</p>
        </section>
      </main>


      {/* Transparency */}
      <section
        style={{ marginTop: 64, padding: "32px 24px", background: "#f8fafc" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h3>About this site</h3>
          <p style={{ maxWidth: 900 }}>
            This site summarizes publicly available information on provincial
            colorectal cancer screening programs for people at average risk.
            Program details are presented at a high level and may evolve over
            time. The Canadian Cancer Society recommends lowering the starting
            age for organized screening to 45.
          </p>
          <p style={{ fontSize: 14, color: CCS_GREY }}>
            Last updated: April 2026
          </p>
        </div>
      </section>


      <footer style={{ padding: 36, background: "#f1f5f9" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", fontSize: 14 }}>
          <p>
            Public advocacy microsite focused on colorectal cancer screening in
            Canada.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ================= LEGEND ================= */
function StatusLegend() {
  return (
    <div style={{ display: "flex", gap: 16, margin: "12px 0 24px" }}>
      <LegendItem colour={STATUS_COLOURS.organized} label="Organized program" />
      <LegendItem colour={STATUS_COLOURS.none} label="No organized program" />
    </div>
  );
}


function LegendItem({ colour, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{ width: 12, height: 12, borderRadius: "50%", background: colour }}
      />
      <span style={{ fontSize: 14 }}>{label}</span>
    </div>
  );
}

/* ================= POLITICAL MAP ================= */
function CanadaPoliticalMap({ active, onSelect }) {  const Region = ({ name, x, y, w, h }) => {
    const status = jurisdictions[name].status;
    return (
      <g onClick={() => onSelect(name)} style={{ cursor: "pointer" }}>
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx="6"
          fill={active === name ? CCS_YELLOW : STATUS_COLOURS[status]}
          stroke="#334155"
          strokeWidth="1"
        />
        <text
          x={x + w / 2}
          y={y + h / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
          fontWeight="600"
          fill={CCS_BLACK}
        >
          {name}
        </text>
      </g>
    );
  };

  return (
    <svg viewBox="0 0 820 200" width="100%" height="auto">
      <Region name="British Columbia" x={10} y={80} w={120} h={60} />
      <Region name="Alberta" x={140} y={80} w={90} h={60} />
      <Region name="Saskatchewan" x={240} y={80} w={90} h={60} />
      <Region name="Manitoba" x={340} y={80} w={90} h={60} />
      <Region name="Ontario" x={440} y={80} w={110} h={60} />
      <Region name="Quebec" x={560} y={80} w={120} h={60} />
      <Region name="Atlantic Canada" x={690} y={80} w={120} h={60} />
      <Region name="Northern Canada" x={200} y={10} w={420} h={50} />
    </svg>
  );
}
