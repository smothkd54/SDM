const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const Fa = require("react-icons/fa");

const NAVY = "1B2A4A";
const NAVY_DARK = "13203A";
const OCHRE = "C97B3D";
const GOLD = "E8B04B";
const WHITE = "FFFFFF";
const SLATE = "5B6B85";
const LIGHT = "F4F6FA";
const TEXT = "1B2A4A";

async function icon(name, color, size = 256) {
  const Comp = Fa[name];
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color, size: String(size) }));
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + png.toString("base64");
}

function shadow() {
  return { type: "outer", color: "000000", blur: 8, offset: 3, angle: 45, opacity: 0.12 };
}

async function iconCircle(slide, name, cx, cy, d, bg, fg, iconScale = 0.52) {
  slide.addShape(pres.shapes.OVAL, { x: cx, y: cy, w: d, h: d, fill: { color: bg } });
  const isz = d * iconScale;
  const data = await icon(name, fg, 256);
  slide.addImage({ data, x: cx + (d - isz) / 2, y: cy + (d - isz) / 2, w: isz, h: isz });
}

let pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Oyetunbo Oredola Adedoyin";
pres.title = "Economic Cooperation Between Russia and African Countries";

const W = 13.33, H = 7.5;

function pageNum(slide, n) {
  slide.addText(String(n), { x: W - 0.7, y: H - 0.5, w: 0.4, h: 0.3, fontSize: 10, color: SLATE, align: "right" });
}

const NOTES = {};
function notes(slide, n, text) {
  slide.addNotes(text);
  NOTES[n] = text;
}

async function build() {
  // ---------------- Slide 1: Title ----------------
  {
    const slide = pres.addSlide();
    slide.background = { color: NAVY };
    slide.addShape(pres.shapes.OVAL, { x: 9.8, y: -2.2, w: 6.5, h: 6.5, fill: { color: NAVY_DARK } });
    slide.addShape(pres.shapes.OVAL, { x: -2.5, y: 5.2, w: 5, h: 5, fill: { color: NAVY_DARK } });
    slide.addText("EDUCATIONAL PRACTICE REPORT", { x: 0.9, y: 1.15, w: 10, h: 0.4, fontSize: 14, color: GOLD, bold: true, charSpacing: 3, fontFace: "Calibri" });
    slide.addText("Economic Cooperation Between Russia\nand African Countries", {
      x: 0.9, y: 1.7, w: 10.8, h: 2.0, fontSize: 40, color: WHITE, bold: true, fontFace: "Cambria", lineSpacing: 46
    });
    slide.addText("Opportunities and Challenges", { x: 0.9, y: 3.75, w: 10, h: 0.7, fontSize: 22, color: OCHRE, italic: true, fontFace: "Cambria" });

    slide.addShape(pres.shapes.LINE, { x: 0.9, y: 4.65, w: 3.2, h: 0, line: { color: OCHRE, width: 1.5 } });

    slide.addText("Oyetunbo Oredola Adedoyin", { x: 0.9, y: 4.9, w: 8, h: 0.4, fontSize: 16, color: WHITE, bold: true, fontFace: "Calibri" });
    slide.addText("Faculty of Economics · International Economics and Business\nSouthern Federal University, 2026", {
      x: 0.9, y: 5.3, w: 8, h: 0.7, fontSize: 13, color: "AEB9CC", fontFace: "Calibri", lineSpacing: 17
    });

    const gi = await icon("FaGlobeAfrica", GOLD, 256);
    slide.addImage({ data: gi, x: 10.9, y: 5.4, w: 1.5, h: 1.5, transparency: 10 });

    notes(slide, 1, "Good afternoon. My report presents the findings of my educational practice on the topic “Economic Cooperation Between Russia and African Countries: Opportunities and Challenges,” completed under the supervision of Yelesky Alexey at the Faculty of Economics, Southern Federal University. Over the practice period I built a full research report: theoretical foundations, a quantitative analysis of trade and investment dynamics, and an assessment of problems and prospects. I'll walk through the structure and the key findings.");
  }

  // ---------------- Slide 2: Agenda ----------------
  {
    const slide = pres.addSlide();
    slide.background = { color: WHITE };
    slide.addText("Structure of the Report", { x: 0.7, y: 0.5, w: 10, h: 0.7, fontSize: 32, bold: true, color: NAVY, fontFace: "Cambria" });

    const items = [
      ["FaBullseye", "Introduction", "Relevance, hypothesis, goal, tasks, object and subject"],
      ["FaBalanceScale", "Ch. 1 — Theoretical & Legal Foundations", "Concept of cooperation, history, priority sectors"],
      ["FaChartLine", "Ch. 2 — Current State & Dynamics", "Trade turnover, investment structure, the summit process"],
      ["FaExclamationTriangle", "Ch. 3 — Problems & Prospects", "Constraints and priority directions going forward"],
      ["FaFlagCheckered", "Conclusion", "Testing the hypothesis against the evidence"]
    ];
    let y = 1.55;
    for (const [ic, title, desc] of items) {
      await iconCircle(slide, ic, 0.8, y, 0.62, LIGHT, OCHRE, 0.5);
      slide.addText(title, { x: 1.7, y: y - 0.03, w: 10.4, h: 0.4, fontSize: 17, bold: true, color: NAVY, fontFace: "Calibri" });
      slide.addText(desc, { x: 1.7, y: y + 0.36, w: 10.4, h: 0.4, fontSize: 13, color: SLATE, fontFace: "Calibri" });
      y += 1.05;
    }
    pageNum(slide, 2);
    notes(slide, 2, "The report follows five parts: an introduction that establishes relevance and a testable hypothesis; Chapter 1 on theoretical and legal foundations; Chapter 2, the quantitative core, covering trade dynamics, investment structure and the summit process; Chapter 3 on problems and prospects; and a conclusion that returns to the hypothesis. I'll go through each in turn.");
  }

  // ---------------- Slide 3: Relevance & Hypothesis ----------------
  {
    const slide = pres.addSlide();
    slide.background = { color: WHITE };
    slide.addText("Relevance and Hypothesis", { x: 0.7, y: 0.5, w: 10, h: 0.7, fontSize: 32, bold: true, color: NAVY, fontFace: "Cambria" });

    // Stat cards
    const stats = [
      ["$20.4B", "Trade turnover, 2018\n(baseline)"],
      ["$40B", "Target announced\nat the 2019 Summit"],
      ["$24.5–27.7B", "Actual turnover,\n2023–2024"]
    ];
    let x = 0.7;
    for (const [num, label] of stats) {
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.5, w: 3.75, h: 1.9, rectRadius: 0.08, fill: { color: LIGHT }, shadow: shadow() });
      slide.addText(num, { x: x + 0.2, y: 1.65, w: 3.35, h: 0.8, fontSize: 30, bold: true, color: OCHRE, align: "center", fontFace: "Cambria" });
      slide.addText(label, { x: x + 0.2, y: 2.45, w: 3.35, h: 0.85, fontSize: 12.5, color: SLATE, align: "center", fontFace: "Calibri" });
      x += 4.05;
    }

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.7, y: 3.75, w: 11.9, h: 2.85, rectRadius: 0.08, fill: { color: NAVY } });
    slide.addText("HYPOTHESIS", { x: 1.1, y: 3.98, w: 4, h: 0.35, fontSize: 13, bold: true, color: GOLD, charSpacing: 2, fontFace: "Calibri" });
    slide.addText(
      "Political rapprochement between Russia and African countries since the 2019 Summit has been accompanied by a measurable rise in trade and investment linkages — but institutional weaknesses (limited Russian banking presence) and external constraints (sanctions, competition from China, the EU and India) have prevented Russia from converting political engagement into economic cooperation at the scale it targeted.",
      { x: 1.1, y: 4.35, w: 11.1, h: 2.15, fontSize: 15, color: WHITE, fontFace: "Calibri", lineSpacing: 21 }
    );
    pageNum(slide, 3);
    notes(slide, 3, "The relevance of this topic rests on a striking gap. In 2019 Russia announced it would double trade with Africa, from $20.4 billion in 2018 to $40 billion by 2023. Trade did grow — to roughly $24.5 to $27.7 billion in 2023 and 2024, a 37 percent jump in 2023 alone — but that is still well short of the target. That gap between ambition and outcome is what motivates the hypothesis on screen: that political engagement has outpaced the economic substance behind it, for identifiable institutional and external reasons that I test in Chapters 2 and 3.");
  }

  // ---------------- Slide 4: Research design ----------------
  {
    const slide = pres.addSlide();
    slide.background = { color: WHITE };
    slide.addText("Research Design", { x: 0.7, y: 0.5, w: 10, h: 0.7, fontSize: 32, bold: true, color: NAVY, fontFace: "Cambria" });

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.7, y: 1.5, w: 5.75, h: 5.2, rectRadius: 0.08, fill: { color: LIGHT }, shadow: shadow() });
    await iconCircle(slide, "FaBullseye", 1.05, 1.8, 0.55, WHITE, OCHRE, 0.55);
    slide.addText("Goal", { x: 1.8, y: 1.85, w: 4.4, h: 0.4, fontSize: 16, bold: true, color: NAVY, fontFace: "Calibri" });
    slide.addText("Assess the current state, dynamics and prospects of Russia–Africa economic cooperation, 2018–2026, in light of the post-2019 political rapprochement.",
      { x: 1.05, y: 2.45, w: 5.1, h: 1.05, fontSize: 13, color: SLATE, fontFace: "Calibri", lineSpacing: 17 });

    slide.addShape(pres.shapes.LINE, { x: 1.05, y: 3.6, w: 5.05, h: 0, line: { color: "D8DEE9", width: 1 } });

    await iconCircle(slide, "FaClipboardList", 1.05, 3.75, 0.55, WHITE, OCHRE, 0.55);
    slide.addText("Object & Subject", { x: 1.8, y: 3.8, w: 4.4, h: 0.4, fontSize: 16, bold: true, color: NAVY, fontFace: "Calibri" });
    slide.addText("Object — Russian–African economic relations.\nSubject — their current state, dynamics and structural problems since 2019.",
      { x: 1.05, y: 4.4, w: 5.1, h: 1.1, fontSize: 13, color: SLATE, fontFace: "Calibri", lineSpacing: 17 });

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.75, y: 1.5, w: 5.85, h: 5.2, rectRadius: 0.08, fill: { color: NAVY }, shadow: shadow() });
    slide.addText("Research Tasks", { x: 7.1, y: 1.75, w: 5, h: 0.4, fontSize: 16, bold: true, color: GOLD, fontFace: "Calibri" });
    const tasks = [
      "Examine forms and levels of international economic cooperation",
      "Trace the historical and legal framework of Russian–African relations",
      "Analyze trade turnover dynamics and geographic structure, 2018–2024",
      "Assess the sectoral structure of investment cooperation",
      "Evaluate the summit process as an institutional mechanism",
      "Identify problems and priority directions for development"
    ];
    slide.addText(tasks.map((t, i) => ({ text: t, options: { bullet: { code: "2013" }, breakLine: i < tasks.length - 1, paraSpaceAfter: 10 } })),
      { x: 7.1, y: 2.25, w: 5.3, h: 4.2, fontSize: 13.5, color: WHITE, fontFace: "Calibri", lineSpacing: 18 });
    pageNum(slide, 4);
    notes(slide, 4, "To operationalize the hypothesis I set one goal and six tasks, moving from theory, to history, to the quantitative trade and investment picture, to the institutional summit mechanism, and finally to problems and priorities. The object of study is Russian-African economic relations broadly; the subject is narrower — the current state, dynamics and structural problems of that relationship since the 2019 rapprochement began.");
  }

  // ---------------- Slide 5: Ch1 forms of cooperation ----------------
  {
    const slide = pres.addSlide();
    slide.background = { color: WHITE };
    slide.addText("Chapter 1 · Forms of Economic Cooperation", { x: 0.7, y: 0.5, w: 11, h: 0.7, fontSize: 30, bold: true, color: NAVY, fontFace: "Cambria" });
    slide.addText("Classified along two independent axes to avoid ambiguity", { x: 0.7, y: 1.18, w: 11, h: 0.4, fontSize: 14, italic: true, color: SLATE, fontFace: "Calibri" });

    const byInstrument = [
      ["FaHandshake", "Trade", "Exchange of goods & services — measured by turnover"],
      ["FaSearchDollar", "Investment", "Direct & portfolio capital into productive assets"],
      ["FaSeedling", "Assistance", "Concessional financing, debt relief, in-kind aid"],
      ["FaLandmark", "Institutional", "Agreements, memoranda, joint commissions"]
    ];
    slide.addText("BY INSTRUMENT", { x: 0.7, y: 1.75, w: 5, h: 0.35, fontSize: 12, bold: true, color: OCHRE, charSpacing: 2, fontFace: "Calibri" });
    let gx = 0.7, gy = 2.2;
    for (let i = 0; i < 4; i++) {
      const [ic, title, desc] = byInstrument[i];
      const cx = gx + (i % 2) * 3.05;
      const cy = gy + Math.floor(i / 2) * 1.55;
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w: 2.85, h: 1.35, rectRadius: 0.07, fill: { color: LIGHT }, shadow: shadow() });
      await iconCircle(slide, ic, cx + 0.15, cy + 0.15, 0.42, WHITE, OCHRE, 0.55);
      slide.addText(title, { x: cx + 0.7, y: cy + 0.1, w: 2.0, h: 0.3, fontSize: 13, bold: true, color: NAVY, fontFace: "Calibri" });
      slide.addText(desc, { x: cx + 0.15, y: cy + 0.58, w: 2.55, h: 0.7, fontSize: 9.5, color: SLATE, fontFace: "Calibri", lineSpacing: 11 });
    }

    slide.addText("BY LEVEL", { x: 6.9, y: 1.75, w: 5, h: 0.35, fontSize: 12, bold: true, color: OCHRE, charSpacing: 2, fontFace: "Calibri" });
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.9, y: 2.2, w: 5.75, h: 1.75, rectRadius: 0.07, fill: { color: NAVY } });
    slide.addText("Bilateral", { x: 7.2, y: 2.35, w: 5.2, h: 0.35, fontSize: 14, bold: true, color: GOLD, fontFace: "Calibri" });
    slide.addText("Direct Russia ↔ single state, e.g. the Russia–Egypt nuclear agreement", { x: 7.2, y: 2.72, w: 5.2, h: 0.55, fontSize: 12, color: WHITE, fontFace: "Calibri", lineSpacing: 15 });
    slide.addShape(pres.shapes.LINE, { x: 7.2, y: 3.35, w: 5.15, h: 0, line: { color: "3A4C70", width: 1 } });
    slide.addText("Multilateral / Regional", { x: 7.2, y: 3.42, w: 5.2, h: 0.35, fontSize: 14, bold: true, color: GOLD, fontFace: "Calibri" });
    slide.addText("Through pan-African/Eurasian institutions — EEC–AU memorandum, AfCFTA engagement", { x: 7.2, y: 3.79, w: 5.2, h: 0.55, fontSize: 12, color: WHITE, fontFace: "Calibri", lineSpacing: 15 });

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.9, y: 4.2, w: 5.75, h: 2.5, rectRadius: 0.07, fill: { color: LIGHT }, shadow: shadow() });
    slide.addText("Why it matters", { x: 7.2, y: 4.4, w: 5.2, h: 0.35, fontSize: 13, bold: true, color: NAVY, fontFace: "Calibri" });
    slide.addText("This two-axis classification is used throughout the report: Chapter 2 is organized along the instrument axis (trade / investment / institutions); the bilateral–multilateral distinction in Chapter 3 helps explain why some forms of cooperation have advanced faster than others.",
      { x: 7.2, y: 4.8, w: 5.2, h: 1.75, fontSize: 12.5, color: SLATE, fontFace: "Calibri", lineSpacing: 16 });

    pageNum(slide, 5);
    notes(slide, 5, "One of the gaps I addressed was an ambiguous, single-list classification of cooperation forms. I use two independent criteria instead: by instrument — trade, investment, assistance, institutional — and by level — bilateral versus multilateral or regional. This isn't just a theoretical nicety: I use the instrument axis to organize Chapter 2's data, and the bilateral/multilateral distinction to explain, in Chapter 3, why nuclear cooperation with Egypt has advanced further than continent-wide multilateral initiatives.");
  }

  // ---------------- Slide 6: Historical & legal framework timeline ----------------
  {
    const slide = pres.addSlide();
    slide.background = { color: WHITE };
    slide.addText("Chapter 1 · Historical & Legal Framework", { x: 0.7, y: 0.5, w: 11, h: 0.7, fontSize: 30, bold: true, color: NAVY, fontFace: "Cambria" });

    const events = [
      ["1960s–80s", "USSR maintains diplomatic ties with 46/53 African states; technical-cooperation agreements with 37; ~600 facilities built"],
      ["1990s", "Sharp contraction as Russian foreign policy reorients toward Europe and the former Soviet space"],
      ["2019", "Sochi Summit: 92 agreements (>$12.5B); AU–Russia & EEC–AU memoranda; target set — $40B trade by 2023"],
      ["2023", "St. Petersburg Summit: 161 agreements; 2023–2026 Partnership Action Plan; grain pledge to 6 states"]
    ];
    const ty = 1.75, tx0 = 0.9, tx1 = 12.4;
    slide.addShape(pres.shapes.LINE, { x: tx0, y: ty, w: tx1 - tx0, h: 0, line: { color: "D8DEE9", width: 2 } });
    const n = events.length;
    for (let i = 0; i < n; i++) {
      const cx = tx0 + (tx1 - tx0) * (i / (n - 1));
      slide.addShape(pres.shapes.OVAL, { x: cx - 0.11, y: ty - 0.11, w: 0.22, h: 0.22, fill: { color: OCHRE } });
      const boxW = 2.9;
      const boxX = Math.min(Math.max(cx - boxW / 2, 0.6), 13.33 - 0.6 - boxW);
      slide.addText(events[i][0], { x: boxX, y: ty + 0.25, w: boxW, h: 0.4, fontSize: 17, bold: true, color: NAVY, align: "center", fontFace: "Cambria" });
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: boxX, y: ty + 0.7, w: boxW, h: 2.35, rectRadius: 0.06, fill: { color: LIGHT }, shadow: shadow() });
      slide.addText(events[i][1], { x: boxX + 0.15, y: ty + 0.85, w: boxW - 0.3, h: 2.05, fontSize: 11.5, color: SLATE, align: "left", fontFace: "Calibri", lineSpacing: 15 });
    }

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y: 5.55, w: 11.5, h: 1.35, rectRadius: 0.07, fill: { color: NAVY } });
    slide.addText("Key insight: the number of signed documents (92 → 161) is a poor proxy for the depth of cooperation — most are non-binding framework memoranda, not enforceable commercial contracts.",
      { x: 1.2, y: 5.72, w: 10.9, h: 1.0, fontSize: 14, italic: true, color: WHITE, fontFace: "Calibri", lineSpacing: 18 });

    pageNum(slide, 6);
    notes(slide, 6, "The legal framework rests on three layers: Soviet-era technical-cooperation agreements — many still formally in force — the post-2019 summit-generated memoranda, and sector-specific bilateral deals like the 2015 Russia-Egypt nuclear agreement. The key insight, which I return to later, is that counting agreements is misleading: the document count nearly doubled between the two summits, but as we'll see, that did not translate one-for-one into economic depth.");
  }

  // ---------------- Slide 7: Trade dynamics chart ----------------
  {
    const slide = pres.addSlide();
    slide.background = { color: WHITE };
    slide.addText("Chapter 2 · Trade Turnover Dynamics, 2018–2024", { x: 0.7, y: 0.5, w: 11.5, h: 0.7, fontSize: 28, bold: true, color: NAVY, fontFace: "Cambria" });

    slide.addChart(pres.charts.BAR, [
      { name: "Actual turnover (US$ bn)", labels: ["2018", "2022", "2023", "2024"], values: [20.4, 18.0, 24.5, 27.7] }
    ], {
      x: 0.6, y: 1.4, w: 7.6, h: 5.4, barDir: "col",
      chartColors: [OCHRE],
      chartArea: { fill: { color: "FFFFFF" } },
      catAxisLabelColor: SLATE, valAxisLabelColor: SLATE,
      valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
      showValue: true, dataLabelPosition: "outEnd", dataLabelColor: NAVY, dataLabelFontSize: 12, dataLabelFontBold: true,
      showLegend: false, showTitle: false,
      valAxisMaxVal: 45
    });
    slide.addShape(pres.shapes.LINE, { x: 0.6, y: 1.85, w: 7.6, h: 0, line: { color: NAVY, width: 1.5, dashType: "dash" } });
    slide.addText("2019 target for 2023: $40B", { x: 5.7, y: 1.55, w: 2.5, h: 0.3, fontSize: 10, color: NAVY, italic: true, fontFace: "Calibri" });

    const facts = [
      "Turnover grew ~20% (2018→2024) but reached only 61–69% of the announced $40B target",
      "Exports account for ~85% of turnover, imports only ~15% — a persistent asymmetry",
      "Egypt, Algeria, Tunisia & South Africa together make up ~70% of total turnover"
    ];
    let fy = 1.5;
    for (const f of facts) {
      await iconCircle(slide, "FaChartLine", 8.55, fy, 0.4, LIGHT, OCHRE, 0.55);
      slide.addText(f, { x: 9.15, y: fy - 0.02, w: 3.6, h: 1.0, fontSize: 12, color: SLATE, fontFace: "Calibri", lineSpacing: 15 });
      fy += 1.5;
    }
    pageNum(slide, 7);
    notes(slide, 7, "This chart is the empirical heart of the report. Turnover rose from $20.4 billion in 2018 to a range of $24.5 to $27.7 billion in 2023-24 — real growth, roughly 20 percent — but nowhere near the $40 billion target line shown with the dashed marker. Two structural features compound this: trade is heavily export-weighted, roughly 85-15 in Russia's favor, and it is geographically concentrated in just four countries — Egypt, Algeria, Tunisia and South Africa — accounting for about 70 percent of the total. That leaves the vast majority of African states, the same states courted at the summits, with only marginal economic ties to Russia.");
  }

  // ---------------- Slide 8: Sectoral investment ----------------
  {
    const slide = pres.addSlide();
    slide.background = { color: WHITE };
    slide.addText("Chapter 2 · Sectoral Structure of Investment", { x: 0.7, y: 0.5, w: 11, h: 0.7, fontSize: 30, bold: true, color: NAVY, fontFace: "Cambria" });

    const sectors = [
      ["FaRadiation", "Energy — Nuclear", "El Dabaa NPP, Egypt: 4 VVER-1200 units, 4.8 GW, up to 50,000 jobs; commissioning through 2030 (Rosatom)"],
      ["FaGem", "Mining", "Alrosa: 42 licenses & 22 new deposits in Zimbabwe; 41% stake in Angola's Catoca. Rusal bauxite in Guinea"],
      ["FaSeedling", "Agriculture & Food Security", "~200,000 t of grain delivered since Nov. 2023 under the summit pledge; ambition of $33B in food exports"]
    ];
    let cx = 0.7;
    for (const [ic, title, desc] of sectors) {
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 1.6, w: 3.85, h: 4.9, rectRadius: 0.08, fill: { color: LIGHT }, shadow: shadow() });
      await iconCircle(slide, ic, cx + 1.475, 1.95, 0.9, WHITE, OCHRE, 0.55);
      slide.addText(title, { x: cx + 0.2, y: 3.0, w: 3.45, h: 0.7, fontSize: 16, bold: true, color: NAVY, align: "center", fontFace: "Calibri" });
      slide.addText(desc, { x: cx + 0.3, y: 3.7, w: 3.25, h: 2.6, fontSize: 12.5, color: SLATE, align: "center", fontFace: "Calibri", lineSpacing: 17 });
      cx += 4.15;
    }
    pageNum(slide, 8);
    notes(slide, 8, "Investment cooperation is concentrated in three large, state-linked projects rather than a diversified portfolio. Energy: Rosatom's El Dabaa plant in Egypt is Russia's single largest African investment commitment. Mining: Alrosa is hedging the projected exhaustion of Russia's domestic diamond reserves by 2047 through expansion in Zimbabwe and Angola, while Rusal competes directly with Chinese firms for Guinean bauxite. Agriculture: grain deliveries function mainly as political goodwill toward food-insecure states so far — the delivered 200,000 tonnes is far below the stated $33 billion export ambition.");
  }

  // ---------------- Slide 9: Summit comparison ----------------
  {
    const slide = pres.addSlide();
    slide.background = { color: WHITE };
    slide.addText("Chapter 2 · The Summit Process: 2019 vs. 2023", { x: 0.7, y: 0.5, w: 11.5, h: 0.7, fontSize: 28, bold: true, color: NAVY, fontFace: "Cambria" });

    const rows = [
      ["Participating delegations", "All 54 African states", "49 countries / organizations"],
      ["African heads of state present", "43", "17"],
      ["Agreements / memoranda signed", "92 (>US$12.5B)", "161"],
      ["Key institutional outcome", "AU–Russia & EEC–AU MoUs; Sberbank/REC/VEB/Gemcorp trade-finance framework", "2023–2026 Partnership Action Plan; grain pledge to 6 states"]
    ];
    const tableRows = [
      [
        { text: "Indicator", options: { fill: { color: NAVY }, color: WHITE, bold: true, fontSize: 13, fontFace: "Calibri" } },
        { text: "2019 — Sochi", options: { fill: { color: NAVY }, color: GOLD, bold: true, fontSize: 13, align: "center", fontFace: "Calibri" } },
        { text: "2023 — St. Petersburg", options: { fill: { color: NAVY }, color: GOLD, bold: true, fontSize: 13, align: "center", fontFace: "Calibri" } }
      ],
      ...rows.map(([a, b, c], i) => [
        { text: a, options: { fill: { color: i % 2 ? LIGHT : WHITE }, color: NAVY, bold: true, fontSize: 12, fontFace: "Calibri" } },
        { text: b, options: { fill: { color: i % 2 ? LIGHT : WHITE }, color: SLATE, fontSize: 12, align: "center", fontFace: "Calibri" } },
        { text: c, options: { fill: { color: i % 2 ? LIGHT : WHITE }, color: SLATE, fontSize: 12, align: "center", fontFace: "Calibri" } }
      ])
    ];
    slide.addTable(tableRows, {
      x: 0.7, y: 1.5, w: 11.9, colW: [3.4, 4.25, 4.25],
      border: { pt: 0.75, color: "D8DEE9" }, autoPage: false,
      rowH: [0.5, 0.6, 0.5, 0.5, 1.3]
    });

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.7, y: 6.05, w: 11.9, h: 0.95, rectRadius: 0.07, fill: { color: OCHRE } });
    slide.addText("Paradox: agreements nearly doubled (92 → 161) while high-level African attendance more than halved (43 → 17) — a widening gap between political declaration and economic substance.",
      { x: 1.0, y: 6.18, w: 11.3, h: 0.7, fontSize: 13, italic: true, color: WHITE, fontFace: "Calibri", lineSpacing: 16 });

    pageNum(slide, 9);
    notes(slide, 9, "Comparing the two summits side by side makes the paradox concrete. The number of agreements signed nearly doubled, from 92 to 161. But African head-of-state attendance more than halved, from 43 to just 17. Agreement-counting, in other words, is an unreliable proxy for the real depth or political weight of cooperation — and declining high-level engagement may itself constrain implementation of the numerous, mostly non-binding memoranda signed.");
  }

  // ---------------- Slide 10: Problems ----------------
  {
    const slide = pres.addSlide();
    slide.background = { color: NAVY };
    slide.addText("Chapter 3 · Main Problems", { x: 0.7, y: 0.5, w: 11, h: 0.7, fontSize: 32, bold: true, color: WHITE, fontFace: "Cambria" });

    const problems = [
      ["FaBullseye", "Unmet Target", "Trade has plateaued at $18–28B — well short of the $40B goal announced in 2019"],
      ["FaUniversity", "Weak Financial Infrastructure", "Limited Russian banking presence & correspondent networks raise transaction costs across the continent"],
      ["FaShieldAlt", "External Constraints", "Sanctions complicate shipping, insurance & payments; withdrawal from the Black Sea Grain deal undercut Russia's own food-security pledges"],
      ["FaUsers", "Competition", "China, the EU and India offer more developed trade-preference and investment-protection regimes"]
    ];
    let gx = 0.7, gy = 1.6;
    for (let i = 0; i < 4; i++) {
      const [ic, title, desc] = problems[i];
      const cx = gx + (i % 2) * 6.1;
      const cy = gy + Math.floor(i / 2) * 2.75;
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w: 5.85, h: 2.5, rectRadius: 0.08, fill: { color: NAVY_DARK } });
      await iconCircle(slide, ic, cx + 0.3, cy + 0.3, 0.7, "27395E", GOLD, 0.55);
      slide.addText(title, { x: cx + 1.2, y: cy + 0.32, w: 4.4, h: 0.5, fontSize: 16, bold: true, color: GOLD, fontFace: "Calibri" });
      slide.addText(desc, { x: cx + 0.3, y: cy + 1.05, w: 5.3, h: 1.3, fontSize: 12.5, color: "D7DEEB", fontFace: "Calibri", lineSpacing: 16 });
      // no-op to keep index alive
    }
    pageNum(slide, 10);
    notes(slide, 10, "Four interrelated problems explain the gap identified earlier. First, the trade target itself has not been met. Second, a thin Russian banking and financial footprint in Africa raises the cost of turning signed agreements into real transactions. Third, external constraints — Western sanctions on logistics, insurance and payments, and Russia's own withdrawal from the Black Sea Grain Initiative — undercut precisely the food-security goodwill it has tried to build. Fourth, Russia is competing for the same African markets against China, the EU and India, all of which have more developed trade and investment frameworks already in place.");
  }

  // ---------------- Slide 11: Prospects ----------------
  {
    const slide = pres.addSlide();
    slide.background = { color: WHITE };
    slide.addText("Chapter 3 · Prospects & Priority Directions", { x: 0.7, y: 0.5, w: 11.5, h: 0.7, fontSize: 28, bold: true, color: NAVY, fontFace: "Cambria" });

    const items = [
      ["FaGlobeAfrica", "AfCFTA Engagement", "A single harmonized framework instead of 54 separate bilateral regimes — lowers transaction costs"],
      ["FaClipboardList", "2023–2026 Action Plan", "A concrete, time-bound benchmark to measure implementation, not just agreement-signing"],
      ["FaUniversity", "Financial Infrastructure", "Expand banking presence, correspondent arrangements, and settlement in national currencies"],
      ["FaLightbulb", "Sectoral Depth", "Double down on comparative advantages: nuclear energy, mining, and agriculture/fertilizers"]
    ];
    let gy = 1.55;
    for (const [ic, title, desc] of items) {
      await iconCircle(slide, ic, 0.8, gy, 0.62, LIGHT, OCHRE, 0.5);
      slide.addText(title, { x: 1.7, y: gy - 0.03, w: 4.6, h: 0.4, fontSize: 15, bold: true, color: NAVY, fontFace: "Calibri" });
      slide.addText(desc, { x: 1.7, y: gy + 0.36, w: 10.4, h: 0.55, fontSize: 12.5, color: SLATE, fontFace: "Calibri", lineSpacing: 15 });
      gy += 1.28;
    }
    pageNum(slide, 11);
    notes(slide, 11, "Four realistic priority directions follow from this analysis. Engaging with the AfCFTA would let Russia negotiate one harmonized framework rather than fifty-four separate bilateral regimes. The 2023-2026 Partnership Action Plan gives a concrete benchmark for tracking real implementation rather than agreement counts. Closing the financial-infrastructure gap — banking presence, correspondent networks, national-currency settlement — addresses the institutional constraint directly. And doubling down on the three sectors where Russia already has a genuine comparative advantage — nuclear energy, mining, and agriculture — is more realistic than attempting broad, undifferentiated trade expansion.");
  }

  // ---------------- Slide 12: Conclusion ----------------
  {
    const slide = pres.addSlide();
    slide.background = { color: NAVY };
    slide.addShape(pres.shapes.OVAL, { x: 10.5, y: -2, w: 6, h: 6, fill: { color: NAVY_DARK } });
    slide.addText("Conclusion", { x: 0.9, y: 0.6, w: 8, h: 0.7, fontSize: 34, bold: true, color: WHITE, fontFace: "Cambria" });

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y: 1.55, w: 11.5, h: 1.1, rectRadius: 0.07, fill: { color: NAVY_DARK } });
    slide.addText([
      { text: "Hypothesis: ", options: { bold: true, color: GOLD } },
      { text: "substantially confirmed", options: { bold: true, color: WHITE } }
    ], { x: 1.2, y: 1.75, w: 11, h: 0.7, fontSize: 18, fontFace: "Calibri" });

    const points = [
      "Real growth: turnover rose from $20.4B (2018) to $24.5–27.7B (2023–24), driven by flagship projects (El Dabaa, Alrosa, grain assistance)",
      "But growth fell far short of the $40B target — and agreement-signing (92→161) diverged from African political engagement (43→17 heads of state)",
      "Institutional (banking) and external (sanctions, competition) constraints identified in Ch. 3 plausibly explain this gap",
      "Priority directions — AfCFTA, financial infrastructure, sectoral depth — offer a realistic path to closing it"
    ];
    slide.addText(points.map((t, i) => ({ text: t, options: { bullet: { code: "2013" }, breakLine: i < points.length - 1, paraSpaceAfter: 14 } })),
      { x: 0.9, y: 2.9, w: 11.5, h: 3.9, fontSize: 15, color: "E6EAF2", fontFace: "Calibri", lineSpacing: 20 });

    pageNum(slide, 12);
    notes(slide, 12, "In conclusion, the evidence substantially confirms the hypothesis. There has been real, measurable growth in trade and flagship-project cooperation since 2019. But that growth fell well short of Russia's own announced target, and the widening gap between agreement-signing and African political engagement points to genuine institutional and external constraints, not just a temporary lag. The priority directions I've outlined — AfCFTA engagement, financial-infrastructure investment, and deeper concentration on nuclear, mining and agriculture — offer a realistic, evidence-based path for narrowing that gap going forward. Thank you — I'm happy to take questions.");
  }

  // ---------------- Slide 13: Thank you ----------------
  {
    const slide = pres.addSlide();
    slide.background = { color: NAVY };
    slide.addShape(pres.shapes.OVAL, { x: -2, y: -2.5, w: 6, h: 6, fill: { color: NAVY_DARK } });
    const gi = await icon("FaHandshake", GOLD, 256);
    slide.addImage({ data: gi, x: 5.67, y: 2.0, w: 2.0, h: 2.0 });
    slide.addText("Thank You", { x: 1.67, y: 4.15, w: 10, h: 0.8, fontSize: 34, bold: true, color: WHITE, align: "center", fontFace: "Cambria" });
    slide.addText("Questions & Discussion", { x: 1.67, y: 4.85, w: 10, h: 0.5, fontSize: 16, color: OCHRE, italic: true, align: "center", fontFace: "Calibri" });
    pageNum(slide, 13);
    notes(slide, 13, "Thank you for your attention. I'd welcome any questions about the data sources, the classification of cooperation forms, or the priority recommendations in Chapter 3.");
  }

  await pres.writeFile({ fileName: "SDM_Russia_Africa_Presentation.pptx" });
  console.log("PPTX done");
  require("fs").writeFileSync("notes_data.json", JSON.stringify(NOTES, null, 2));
}

build().catch(e => { console.error(e); process.exit(1); });
