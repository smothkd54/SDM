const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  PageBreak, VerticalAlign, TabStopType, TabStopPosition
} = require("docx");
const fs = require("fs");

const FONT = "Times New Roman";
const BODY_SZ = 28; // 14pt
const SMALL_SZ = 22; // 11pt

function P(text, opts = {}) {
  const { bold = false, italic = false, size = BODY_SZ, align = AlignmentType.JUSTIFIED, spacingAfter = 160, indent } = opts;
  return new Paragraph({
    alignment: align,
    spacing: { after: spacingAfter, line: 360, lineRule: "auto" },
    indent: indent ? { firstLine: indent } : undefined,
    children: [new TextRun({ text, font: FONT, size, bold, italics: italic })]
  });
}

function Heading(text, opts = {}) {
  const { size = BODY_SZ, spacingBefore = 240, spacingAfter = 240 } = opts;
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: spacingBefore, after: spacingAfter },
    children: [new TextRun({ text, font: FONT, size, bold: true })]
  });
}

function centerLine(text, opts = {}) {
  const { size = BODY_SZ, bold = false, spacingAfter = 0 } = opts;
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: spacingAfter },
    children: [new TextRun({ text, font: FONT, size, bold })]
  });
}

function blank(size = BODY_SZ) {
  return new Paragraph({ children: [new TextRun({ text: "", font: FONT, size })] });
}

function cell(children, opts = {}) {
  const { width, shading, valign = VerticalAlign.CENTER, colSpan } = opts;
  return new TableCell({
    width: width ? { size: width, type: WidthType.DXA } : undefined,
    shading: shading ? { type: ShadingType.CLEAR, fill: shading } : undefined,
    verticalAlign: valign,
    columnSpan: colSpan,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children
  });
}

function cellText(text, opts = {}) {
  const { bold = false, align = AlignmentType.LEFT, size = SMALL_SZ } = opts;
  return new Paragraph({
    alignment: align,
    spacing: { after: 80, line: 300, lineRule: "auto" },
    children: [new TextRun({ text, font: FONT, size, bold })]
  });
}

function cellParas(paragraphs, opts = {}) {
  return paragraphs.map(t => cellText(t, opts));
}

const TABLE_BORDERS = {
  top: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
  left: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
  right: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
  insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "000000" }
};

// ---------- TITLE PAGE ----------
const titlePage = [
  centerLine("Federal State Autonomous Educational Institution of Higher Education", { size: 24 }),
  centerLine("\"SOUTHERN FEDERAL UNIVERSITY\"", { size: 24, bold: true, spacingAfter: 200 }),
  centerLine("Faculty of Economics", { size: 24, spacingAfter: 200 }),
  centerLine("Field of study 38.04.01 \"Economics\"", { size: 24 }),
  blank(24),
  centerLine("Program focus:", { size: 24 }),
  centerLine("International Economics and Business", { size: 24, bold: true, spacingAfter: 400 }),
  blank(24), blank(24),
  centerLine("REPORT", { size: 32, bold: true }),
  centerLine("on completion of the practice", { size: 24, spacingAfter: 400 }),
  blank(24),
  new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 120 }, children: [new TextRun({ text: "1st year student", font: FONT, size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 120 }, children: [new TextRun({ text: "Presented by: OYETUNBO OREDOLA ADEDOYIN", font: FONT, size: 24, bold: true })] }),
  blank(24),
  new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 60 }, children: [new TextRun({ text: "Place of internship: Department of World Economy and International Relations, Faculty of Economics, Southern Federal University", font: FONT, size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 60 }, children: [new TextRun({ text: "Type of practice: Educational practice — research work (acquiring basic skills in research work)", font: FONT, size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 60 }, children: [new TextRun({ text: "Method of conducting practice: stationary", font: FONT, size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 300 }, children: [new TextRun({ text: "Internship period: June 22, 2026 to July 6, 2026", font: FONT, size: 24 })] }),
  blank(24), blank(24),
  new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 200 }, children: [new TextRun({ text: "The student's practical assignment has been approved:", font: FONT, size: 24 })] }),
  blank(24),
  new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 60 }, children: [new TextRun({ text: "Head of Practice from the University", font: FONT, size: 24 })] }),
  blank(24),
  new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 20 }, children: [new TextRun({ text: "_______________ Yelesky A.", font: FONT, size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "signature, full name", font: FONT, size: 18, italics: true })] }),
  new Paragraph({ children: [new PageBreak()] })
];

// ---------- SECTION I ----------
const assignmentItems = [
  "Selecting a topic for scientific research and developing the content (plan) of the research: \"Economic Cooperation between Russia and African Countries: Opportunities and Challenges\".",
  "Collection and analysis of bibliography on the research topic (at least 20 sources, no less than 50% in a foreign language).",
  "Justification of relevance, degree of development of the topic, hypothesis, purpose and objectives of the research, object and subject of the research.",
  "Collection and analysis of material for Chapter 1, \"Theoretical and Legal Foundations of Economic Cooperation between Russia and African Countries\". Formulation of conclusions.",
  "Collection and analysis of statistical and empirical material for Chapter 2, \"Current State and Dynamics of Economic Cooperation between Russia and African Countries\". Formulation of conclusions.",
  "Analysis of material for Chapter 3, \"Problems and Prospects of Economic Cooperation between Russia and African Countries\". Formulation of conclusions and practical recommendations.",
  "Preparation of the internship report and presentation. Submission of the report to the internship supervisor for review.",
  "Report defense."
];

const sectionI = [
  Heading("I. STUDENT'S PRACTICAL ASSIGNMENT"),
  ...assignmentItems.map((t, i) => P(`${i + 1}. ${t}`, { spacingAfter: 140 })),
  blank(), blank(),
  new Paragraph({ children: [new PageBreak()] })
];

// ---------- SECTION II ----------
const sectionII = [
  Heading("II. INSTRUCTIONS ON FAMILIARIZATION WITH THE REQUIREMENTS OF LABOR PROTECTION, SAFETY, FIRE SAFETY, AND INTERNAL RULES"),
  centerLine("Briefing completed", { size: 20, bold: true }),
  centerLine("I have read it", { size: 20, bold: true, spacingAfter: 120 }),
  P("on labor protection requirements, on safety precautions, on fire safety, and on the internal labor regulations of Southern Federal University.", { align: AlignmentType.CENTER, size: 20 }),
  blank(),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "_______________ Yelesky A.", font: FONT, size: 20 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "(signature and full name of the internship supervisor from the University)", font: FONT, size: 16, italics: true })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "June 22, 2026", font: FONT, size: 20, underline: {} })] }),
  blank(),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "___________ Oyetunbo O. A.", font: FONT, size: 20 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "(signature and full name of the student)", font: FONT, size: 16, italics: true })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "June 22, 2026", font: FONT, size: 20, underline: {} })] }),
  new Paragraph({ children: [new PageBreak()] })
];

// ---------- SECTION III: DIARY ----------
const diaryRows = [
  ["June 22, 2026", "Organizational meeting. Safety briefing. Discussion of individual assignment. Selection of research topic."],
  ["June 23, 2026", "Development of the content (plan) of the study."],
  ["June 24–25, 2026", "Collection and analysis of bibliography on the research topic."],
  ["June 26–27, 2026", "Justification of relevance, degree of development, hypothesis, purpose and objectives of the research, object and subject of the research."],
  ["June 28–30, 2026", "Collection of material for Chapter 1, \"Theoretical and Legal Foundations of Economic Cooperation between Russia and African Countries\"."],
  ["July 1–2, 2026", "Collection and analysis of statistical material for Chapter 2, \"Current State and Dynamics of Economic Cooperation between Russia and African Countries\"."],
  ["July 3, 2026", "Analysis of material for Chapter 3, \"Problems and Prospects of Economic Cooperation between Russia and African Countries\". Formulation of conclusions."],
  ["July 4, 2026", "Preparation of the internship report and presentation."],
  ["July 5, 2026", "Submission of the report to the internship supervisor for review."],
  ["July 6, 2026", "Report defense."]
];

const diaryTable = new Table({
  width: { size: 9350, type: WidthType.DXA },
  borders: TABLE_BORDERS,
  columnWidths: [2200, 7150],
  rows: [
    new TableRow({
      tableHeader: true,
      children: [
        cell([cellText("Date", { bold: true, align: AlignmentType.CENTER })], { width: 2200, shading: "D9D9D9" }),
        cell([cellText("Activities completed in accordance with the practical assignment", { bold: true, align: AlignmentType.CENTER })], { width: 7150, shading: "D9D9D9" })
      ]
    }),
    ...diaryRows.map(([d, a]) => new TableRow({
      children: [
        cell([cellText(d, { align: AlignmentType.CENTER })], { width: 2200 }),
        cell([cellText(a)], { width: 7150 })
      ]
    }))
  ]
});

const sectionIII = [
  Heading("III. PRACTICE DIARY"),
  diaryTable,
  new Paragraph({ children: [new PageBreak()] })
];

module.exports = { P, Heading, centerLine, blank, cell, cellText, cellParas, TABLE_BORDERS, FONT, BODY_SZ, SMALL_SZ,
  titlePage, sectionI, sectionII, sectionIII,
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, PageBreak, VerticalAlign, fs };
