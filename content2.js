const B = require("./build.js");
const { cellText, AlignmentType, Table, TableRow, TableCell, WidthType, TABLE_BORDERS, VerticalAlign } = B;

function T(text, opts = {}) { return cellText(text, opts); }

function miniTable(headers, rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA },
    borders: TABLE_BORDERS,
    columnWidths: widths,
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((h, i) => new TableCell({
          width: { size: widths[i], type: WidthType.DXA },
          shading: { type: "clear", fill: "D9D9D9" },
          verticalAlign: VerticalAlign.CENTER,
          margins: { top: 60, bottom: 60, left: 80, right: 80 },
          children: [cellText(h, { bold: true, align: AlignmentType.CENTER })]
        }))
      }),
      ...rows.map(r => new TableRow({
        children: r.map((c, i) => new TableCell({
          width: { size: widths[i], type: WidthType.DXA },
          verticalAlign: VerticalAlign.CENTER,
          margins: { top: 60, bottom: 60, left: 80, right: 80 },
          children: [cellText(String(c), { align: i === 0 ? AlignmentType.LEFT : AlignmentType.CENTER })]
        }))
      }))
    ]
  });
}

// ---- Chapter 2 (item 6) ----
const tradeTable = miniTable(
  ["Year", "Trade turnover, US$ bn", "Y-o-y change", "Source"],
  [
    ["2018", "20.4", "— (baseline)", "[17]"],
    ["2022", "≈18.0", "n/a", "[17]"],
    ["2023", "24.5", "+37%", "[11, 12]"],
    ["2024", "24.5–27.7", "≈0–13%", "[11, 19]"],
    ["2023 target (announced 2019)", "40.0", "not met", "[16, 18]"]
  ],
  [3200, 2400, 2000, 1750]
);

const summitTable = miniTable(
  ["Indicator", "2019 Summit (Sochi)", "2023 Summit (St. Petersburg)"],
  [
    ["Participating delegations", "all 54 African states", "49 countries/organizations"],
    ["African heads of state present", "43", "17"],
    ["Agreements/memoranda signed", "92 (>US$12.5 bn)", "161"],
    ["Key institutional outcome", "AU–Russia MoU; EEC–AU MoU; Sberbank/REC/VEB/Gemcorp trade-finance framework", "2023–2026 Partnership Action Plan; grain pledge to 6 states"]
  ],
  [2600, 3300, 3450]
);

const item6 = [
  T("2. CURRENT STATE AND DYNAMICS OF ECONOMIC COOPERATION BETWEEN RUSSIA AND AFRICAN COUNTRIES", { bold: true }),
  T("2.1 Dynamics and geographic structure of trade turnover, 2018–2024"),
  T("Table 1 summarizes the dynamics of Russian–African trade turnover against the target announced at the 2019 Summit."),
  T("Table 1 — Russia–Africa trade turnover, 2018–2024", { bold: true, align: AlignmentType.CENTER }),
];
const item6b = [
  T(""),
  T("Sources: [11], [12], [16], [17], [18], [19]."),
  T("The data in Table 1 show that trade turnover grew substantially in absolute terms — by roughly 20% between 2018 and 2024 — but at a pace far below the trajectory implied by the announced 2023 target of US$40 billion, which was never reached; actual 2023–2024 turnover of US$24.5–27.7 billion represents only 61–69% of that target. The structure of trade also remains highly asymmetric: Russian exports to Africa account for approximately 85% of total turnover (mainly grain, fertilizers, mineral fuels and, increasingly, machinery for the El Dabaa project), while imports from Africa make up only about 15%, reflecting the still-limited integration of African manufactured or processed goods into the Russian market. Trade also remains geographically concentrated: Egypt, Algeria, Tunisia and South Africa together account for approximately 70% of total Russia–Africa turnover, while economic ties with the great majority of Sub-Saharan states — the very group targeted by the political rapprochement of 2019–2023 — remain marginal in trade-value terms."),
  T("2.2 Sectoral structure of investment cooperation: energy, mining and agriculture"),
  T("Investment cooperation, unlike trade, is concentrated in a small number of large, state-linked projects rather than diversified portfolio flows. In the energy sector, Rosatom's El Dabaa project in Egypt (4.8 GW, four VVER-1200 units, up to 50,000 jobs during construction, commissioning through 2030) constitutes Rosatom's first major nuclear power project in Africa and by far the largest single Russian investment commitment on the continent. In mining, Alrosa's operations in Zimbabwe (42 licenses, 22 new deposits discovered since 2019) and its 41% stake in Angola's Catoca mine represent a strategic response to the anticipated exhaustion of Russia's domestic diamond reserves by 2047, while Rusal's bauxite operations in Guinea illustrate direct competition with Chinese mining capital for the same raw-material base. In agriculture, cooperation has taken the form of both commercial exports and non-commercial assistance: the roughly 200,000 tonnes of grain delivered since November 2023 under the 2023 summit pledge functioned primarily as a tool of political goodwill toward food-insecure states (Russian and Ukrainian supplies together cover 90–100% of wheat consumption in countries such as Somalia and Eritrea), while Russian officials have simultaneously articulated a much larger commercial ambition — food exports to Africa reaching US$33 billion — that so far substantially exceeds delivered volumes."),
  T("2.3 The summit process as an institutional framework of cooperation"),
  T("Table 2 compares the two Russia–Africa summits held to date and highlights a structural tension between the quantity of formal agreements produced and the level of high-level political engagement they attracted."),
  T("Table 2 — Comparison of the 2019 and 2023 Russia–Africa Summits", { bold: true, align: AlignmentType.CENTER })
];
const item6c = [
  T(""),
  T("Sources: [9], [16], [17], [18]."),
  T("Table 2 illustrates a paradox central to this study: the number of formal agreements nearly doubled between the two summits (92 to 161), yet the number of African heads of state in attendance fell by more than half (43 to 17). This divergence suggests that agreement-counting is an unreliable indicator of the depth or political weight of cooperation, and that declining high-level African political engagement may itself constrain the future implementation of the numerous memoranda signed, most of which — as noted in section 1.2 — are non-binding frameworks rather than enforceable commercial contracts."),
  T("Conclusions to Chapter 2. Quantitatively, Russian–African economic cooperation has grown since 2018 but has fallen well short of its own stated targets, remains export-heavy and geographically concentrated in four countries, and is sectorally narrow, resting on a small number of large state-linked projects in energy, mining and agriculture rather than on broad-based commercial integration. The summit process has generated an increasing volume of formal agreements even as the political engagement of African counterparts, measured by head-of-state attendance, has declined — a discrepancy that motivates the problem analysis in Chapter 3.")
];

// ---- Chapter 3 + Conclusion (item 7) ----
const item7 = [
  T("3. PROBLEMS AND PROSPECTS OF ECONOMIC COOPERATION BETWEEN RUSSIA AND AFRICAN COUNTRIES", { bold: true }),
  T("3.1 Main problems constraining Russian–African economic cooperation"),
  T("Four interrelated problems emerge from the analysis in Chapters 1–2."),
  T("First, an unmet quantitative target. The 2019 pledge to reach US$40 billion in trade turnover by 2023 has not been fulfilled; actual turnover has plateaued in the US$18–28 billion range, implying either an overly ambitious original target or the presence of structural obstacles that were not addressed by the summit process itself."),
  T("Second, a weak financial and banking infrastructure. As highlighted by Padalko [14], the absence of a developed Russian banking network, correspondent-banking relationships and dedicated trade-finance instruments in Africa raises the transaction costs of trade and investment and helps explain why 92 and 161 signed agreements have translated into a comparatively small set of realized projects. The 2019 Sberbank–REC–VEB–Gemcorp trade-finance framework [16] represents an initial response to this problem, but its scale remains modest relative to overall trade volumes."),
  T("Third, external constraints on logistics, insurance and payments. Western sanctions imposed on Russia since 2022 have complicated shipping, marine insurance and cross-border banking for Russia-linked trade, including food and fertilizer exports that are central to Russia's outreach to food-insecure African states; officials have themselves described these as factors “seriously imped[ing] the supply of Russian food” and complicating “transportation, logistics, insurance and bank payments” [10]. Additionally, Russia's withdrawal from the Black Sea Grain Initiative in July 2023 was itself a contributing cause of the food-security pressures that its subsequent grain pledges sought to address — an internal contradiction noted critically by the Institute for Security Studies [17]."),
  T("Fourth, intensifying competition from established partners. Russia's trade and investment volumes in Africa remain far smaller than those of China, and Russia also faces competition from the EU, India and the United States, all of which have more developed trade-preference regimes, investment-protection frameworks and, in China's case, direct competition for the same raw-material assets (e.g. Guinean bauxite, where Rusal and Chinese firms compete for access to the same deposits) [13]."),
  T("3.2 Prospects and priority directions for development"),
  T("Notwithstanding these constraints, several developments point to realistic priority directions for deepening cooperation. The African Continental Free Trade Area (AfCFTA) offers a single, harmonized framework through which Russia could, in principle, negotiate a single set of trade and investment terms applicable across the African market rather than 54 separate bilateral regimes, reducing the transaction-cost burden identified above [6]. The 2023–2026 Partnership Action Plan adopted at the second summit [18] provides a concrete, time-bound framework against which implementation (rather than mere agreement-signing) can be measured going forward, and its success will depend on closing the institutional gap identified in section 3.1 — in particular, expanding Russian banking presence, correspondent-banking arrangements and, potentially, greater use of national currencies in bilateral settlement. Sectorally, the three areas of comparative advantage identified in Chapter 2 — nuclear energy (where El Dabaa can serve as a reference project for other African states considering nuclear power, as confirmed by ongoing Rosatom engagement across the continent), mining (where Russian firms' need for reserves outside a depleting domestic base creates a durable commercial incentive for continued investment), and agriculture (where Russia's status as a leading grain and fertilizer exporter aligns with persistent African food-security needs) — are likely to remain the most realistic vectors for further growth, more so than a broad, undifferentiated expansion of trade."),
  T("CONCLUSION", { bold: true }),
  T("This report set out to assess the current state, dynamics and prospects of economic cooperation between Russia and African countries in the period 2018–2026, against the hypothesis that growing political rapprochement since the 2019 Russia–Africa Summit has been accompanied by a measurable, but institutionally and externally constrained, increase in economic linkages."),
  T("The evidence collected substantially confirms this hypothesis. On one hand, trade turnover increased from US$20.4 billion (2018) to US$24.5–27.7 billion (2023–2024) — a real and measurable increase — and cooperation deepened qualitatively through flagship sectoral projects such as the El Dabaa nuclear plant, Alrosa's expanded mining concessions in Zimbabwe and Angola, and the 2023 grain-assistance pledge. On the other hand, the increase fell far short of the US$40 billion target announced in 2019; formal agreement-signing at the summit level nearly doubled (92 to 161 documents) even as African head-of-state attendance more than halved (43 to 17), suggesting a widening gap between declarative political engagement and its economic substance; and the analysis in Chapter 3 identified concrete institutional (banking infrastructure) and external (sanctions-related logistics and financing frictions, competition from China, the EU and India) constraints that plausibly explain this gap."),
  T("Accordingly, the objectives set out in the Introduction have been achieved: the theoretical and legal foundations of Russian–African cooperation were established in Chapter 1; its quantitative dynamics and sectoral structure were analyzed in Chapter 2; and its principal problems and realistic priority directions — deeper use of the AfCFTA framework, expansion of financial/banking infrastructure, and continued concentration on nuclear energy, mining and agriculture as comparative-advantage sectors — were identified in Chapter 3. Future research building on this report could usefully track implementation of the 2023–2026 Partnership Action Plan against measurable trade and investment benchmarks, rather than relying on the number of agreements signed as a proxy for the depth of cooperation.")
];

const item8 = [T("Presentation and report materials were prepared, summarizing the theoretical, statistical and analytical findings of Chapters 1–3, and the report was submitted to the internship supervisor for review.")];
const item9 = [T("Report defended before the internship supervisor.")];

module.exports = { item6, item6b, item6c, item7, item8, item9, tradeTable, summitTable, T };
