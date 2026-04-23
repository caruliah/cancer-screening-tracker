import { useState } from "react";

// CCS-inspired colours
const CCS_YELLOW = "#FFD91B";
const CCS_BLACK = "#02070D";
const CCS_GREY = "#475569";

// Status colours (lung cancer screening focus)
const STATUS_COLOURS = {
  organized: "#16a34a", // green
  pilot: "#f59e0b",     // amber
  none: "#dc2626"       // red
};


const screeningTypes = ["Breast", "Cervical", "Colorectal", "Lung"];


/* ========== DATA ========== */


const provinces = {
  "British Columbia": {
    lungStatus: "pilot",
    intro:
      "British Columbia delivers strong, population-based screening for breast, cervical, and colorectal cancers. Lung cancer screening remains limited to pilot initiatives.",
    programs: {
      Breast: "Organized provincial program",
      Cervical: "Organized – HPV primary screening",
      Colorectal: "Organized – FIT",
      Lung: "High-risk pilots only"
    },
    advocacy:
      "Expanding lung cancer screening into a fully organized, province-wide program represents a critical opportunity to reduce preventable deaths and advance equity in British Columbia."
  },
  Alberta: {
    lungStatus: "none",
    intro:
      "Alberta operates organized screening programs for breast, cervical, and colorectal cancer but does not yet offer population-based lung cancer screening.",
    programs: {
      Breast: "Organized provincial program",
      Cervical: "Organized program",
      Colorectal: "Organized program",
      Lung: "No organized program"
    },
    advocacy:
      "Implementing organized lung cancer screening would align Alberta with emerging best practice and save lives."
  },
  Saskatchewan: {
    lungStatus: "none",
    intro:
      "Saskatchewan offers organized screening for breast, cervical, and colorectal cancers. Lung cancer screening is not yet organized provincially.",
    programs: {
      Breast: "Organized program",
      Cervical: "Organized program",
      Colorectal: "Organized program",
      Lung: "No organized program"
    },
    advocacy:
      "Introducing organized lung cancer screening would address a major gap in Saskatchewan’s cancer prevention system."
  },
  Manitoba: {
    lungStatus: "none",
    intro:
      "Manitoba maintains organized screening for breast, cervical, and colorectal cancers, with no province-wide lung cancer screening program.",
    programs: {
      Breast: "Organized program",
      Cervical: "Organized program",
      Colorectal: "Organized program",
      Lung: "No organized program"
    },
    advocacy:
      "Manitoba has an opportunity to reduce late-stage lung cancer diagnoses by investing in organized screening."
  },
  Ontario: {
    lungStatus: "organized",
    intro:
      "Ontario operates organized screening across all four major cancer sites, including lung cancer screening for high-risk populations.",
    programs: {
      Breast: "Organized provincial program",
      Cervical: "Organized program",
      Colorectal: "Organized program",
      Lung: "Organized high-risk program"
    },
    advocacy:
      "Ontario should sustain leadership in lung screening while continuing to close persistent participation gaps among underserved communities."
  },
  Quebec: {
    lungStatus: "none",
    intro:
      "Quebec offers organized breast and colorectal screening, with cervical screening delivered through mixed and evolving approaches. Lung cancer screening is not yet organized provincially.",
    programs: {
      Breast: "Organized program",
      Cervical: "Partially organized",
      Colorectal: "Organized program",
      Lung: "No organized program"
    },
    advocacy:
      "Expanding organized screening—particularly for lung cancer—would strengthen prevention and early detection in Quebec."
  },
  "Atlantic Canada": {
    lungStatus: "pilot",
    intro:
      "Atlantic provinces operate organized breast, cervical, and colorectal screening programs, while lung cancer screening remains limited and uneven.",
    programs: {
      Breast: "Organized programs",
      Cervical: "Organized programs",
      Colorectal: "Organized programs",
      Lung: "Limited pilots / emerging programs"
    },
    advocacy:
      "Coordinated, region-wide lung cancer screening would improve consistency and equity across Atlantic Canada."
  },
  "Northern Canada": {
    lungStatus: "none",
    intro:
      "In the territories, access to organized screening is shaped by geography, infrastructure, and interjurisdictional delivery models.",
    programs: {
      Breast: "Limited access",
      Cervical: "Limited access",
      Colorectal: "Limited access",
      Lung: "No organized program"
    },
    advocacy:
      "Improving culturally safe and accessible screening in northern and remote communities must be a national priority."
  }
};

/* ========== APP ========== */


export default function App() {
  const [activeProvince, setActiveProvince] = useState("British Columbia");
  const data = provinces[activeProvince];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: CCS_BLACK }}>
      {/* Hero */}
      <header style={{ background: CCS_YELLOW, padding: "56px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{ fontSize: 44, marginBottom: 12 }}>
            Cancer Screening in Canada
          </h1>
          <p style={{ fontSize: 20, maxWidth: 800 }}>
            Organized cancer screening saves lives — but access, quality, and
            consistency still depend on where you live.
          </p>
        </div>
      </header>

      {/* National framing + map */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        <p style={{ color: CCS_GREY, maxWidth: 820, marginBottom: 12 }}>
          Across Canada, screening for breast, cervical, and colorectal cancer
          is well established. By contrast, organized lung cancer screening
          remains uneven and limited.
        </p>

        <LungLegend />
        <CanadaSVGMap
          active={activeProvince}
          onSelect={setActiveProvince}
        />
      </section>


      {/* Content */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px" }}>
        <section style={{ marginBottom: 36 }}>
          <h2>{activeProvince}</h2>
          <p style={{ maxWidth: 920 }}>{data.intro}</p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h3>Current screening programs</h3>
          {screeningTypes.map((type) => (
            <div key={type} style={{ marginBottom: 18 }}>
              <strong>{type} cancer</strong>
              <div>{data.programs[type]}</div>
            </div>
          ))}
        </section>

        <section
          style={{
            borderLeft: `6px solid ${CCS_YELLOW}`,
            paddingLeft: 24
          }}
        >
          <h3>What needs to change</h3>
          <p>{data.advocacy}</p>
        </section>
      </main>

      {/* About / transparency */}
      <section
        style={{
          marginTop: 64,
          padding: "32px 24px",
          background: "#f8fafc"
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h3>About this site</h3>
          <p style={{ maxWidth: 900 }}>
            This interactive briefing summarizes publicly available information
            on provincial cancer screening programs in Canada. Program
            descriptions reflect high-level status (such as organized programs,
            pilot initiatives, or absence of organized screening) rather than
            detailed eligibility criteria.
          </p>
          <p style={{ maxWidth: 900 }}>
            Cancer screening approaches evolve over time. This site is intended
            to support public understanding and evidence-informed discussion
            about cancer prevention and early detection in Canada.
          </p>
          <p style={{ marginTop: 16, fontSize: 14, color: CCS_GREY }}>
            Last updated: April 2026
          </p>
        </div>
      </section>
      <footer style={{ padding: 36, background: "#f1f5f9" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", fontSize: 14 }}>
          <p>
            Public advocacy microsite highlighting provincial cancer screening
            programs in Canada. Content reflects publicly available information
            and emphasizes equity-oriented policy priorities.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ========== LEGEND ========== */


function LungLegend() {
  return (
    <div style={{ display: "flex", gap: 16, margin: "12px 0 24px" }}>
      <LegendItem colour={STATUS_COLOURS.organized} label="Organized" />
      <LegendItem colour={STATUS_COLOURS.pilot} label="Pilot / limited" />
      <LegendItem colour={STATUS_COLOURS.none} label="No organized program" />
    </div>
  );
}


function LegendItem({ colour, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: colour
        }}
      />
      <span style={{ fontSize: 14 }}>{label}</span>
    </div>
  );
}


/* ========== SVG MAP ========== */


function CanadaSVGMap({ active, onSelect }) {
  const Region = ({ name, x, y, w, h }) => {
    const status = provinces[name].lungStatus;
    return (
      <g onClick={() => onSelect(name)} style={{ cursor: "pointer" }}>
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx="8"
          fill={active === name ? CCS_YELLOW : STATUS_COLOURS[status]}
          stroke="#334155"
          strokeWidth="1.5"
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
    <svg
      viewBox="0 0 820 200"
      width="100%"
      height="auto"
      aria-label="Map of Canada"
    >
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
