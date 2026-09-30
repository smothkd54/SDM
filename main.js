const B = require("./build.js");
const C1 = require("./content.js");
const C2 = require("./content2.js");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell,
  WidthType, TABLE_BORDERS, VerticalAlign, PageBreak, cellText, fs, Heading, blank
} = B;

function cell(children, opts = {}) {
  const { width, shading, colSpan, rowSpan } = opts;
  return new TableCell({
    width: width ? { size: width, type: WidthType.DXA } : undefined,
    shading: shading ? { type: "clear", fill: shading } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    columnSpan: colSpan,
    rowSpan: rowSpan,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children
  });
}

const W = [700, 2800, 5850]; // Item No | Activities | Analysis
const TOTAL_W = W.reduce((a, b) => a + b, 0);

function headerRow() {
  return new TableRow({
    tableHeader: true,
    children: [
      cell([cellText("Item No.", { bold: true, align: AlignmentType.CENTER })], { width: W[0], shading: "D9D9D9" }),
      cell([cellText("Activities completed in accordance with the practical assignment", { bold: true, align: AlignmentType.CENTER })], { width: W[1], shading: "D9D9D9" }),
      cell([cellText("Analysis of the work performed", { bold: true, align: AlignmentType.CENTER })], { width: W[2], shading: "D9D9D9" })
    ]
  });
}

function dataRow(num, activity, analysisParas, extraTableAfterIndex) {
  const children = [...analysisParas];
  return new TableRow({
    children: [
      cell([cellText(String(num), { align: AlignmentType.CENTER })], { width: W[0] }),
      cell([cellText(activity)], { width: W[1] }),
      cell(children, { width: W[2] })
    ]
  });
}

// Build rows; for item 6 we need to splice in tables inside the cell content.
const row1 = dataRow(1, "Organizational meeting. Safety briefing. Discussion of individual assignment. Selection of research topic.", C1.item1);
const row2 = dataRow(2, "Development of the content (plan) of the study.", C1.item2);
const row3 = dataRow(3, "Collection and analysis of bibliography on the research topic (at least 20 sources, 50% in a foreign language).", C1.item3);
const row4 = dataRow(4, "Justification of relevance, degree of development, hypothesis, purpose and objectives of the research, object and subject of the research.", C1.item4);
const row5 = dataRow(5, "Collection of material for Chapter 1, \"Theoretical and Legal Foundations of Economic Cooperation between Russia and African Countries.\" Formulation of conclusions.", C1.item5);

const row6 = new TableRow({
  children: [
    cell([cellText("6", { align: AlignmentType.CENTER })], { width: W[0] }),
    cell([cellText("Collection and analysis of statistical material for Chapter 2, \"Current State and Dynamics of Economic Cooperation between Russia and African Countries.\" Formulation of conclusions.")], { width: W[1] }),
    cell([
      ...C2.item6,
      C2.tradeTable,
      ...C2.item6b,
      C2.summitTable,
      ...C2.item6c
    ], { width: W[2] })
  ]
});

const row7 = dataRow(7, "Analysis of material for Chapter 3, \"Problems and Prospects of Economic Cooperation between Russia and African Countries.\" Formulation of conclusions and practical recommendations.", C2.item7);
const row8 = dataRow(8, "Preparation of the internship report and presentation.", C2.item8);
const row9 = dataRow(9, "Report defense.", C2.item9);

const analysisTable = new Table({
  width: { size: TOTAL_W, type: WidthType.DXA },
  borders: TABLE_BORDERS,
  columnWidths: W,
  rows: [headerRow(), row1, row2, row3, row4, row5, row6, row7, row8, row9]
});

const sectionIV = [
  Heading("IV. ANALYSIS OF THE WORK CONDUCTED DURING THE STUDENT'S PRACTICAL TRAINING"),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: "The section is filled in by the student in accordance with the specifics of the practice (contains tables, statistical data and analytical text).", font: B.FONT, size: 20, italics: true })]
  }),
  analysisTable,
  new Paragraph({ children: [new PageBreak()] })
];

// ---- Review section ----
const criteria = [
  "Compliance of the structure and content of the report with the requirements.",
  "Currency of the research methods used.",
  "Proficiency in quantitative analysis methods.",
  "Application of information technology; competent work with text documents.",
  "Quality of work with empirical and statistical sources.",
  "Assessment of the degree of completion of the practical assignment.",
  "Availability of a sufficient number of bibliographic sources.",
  "Practical value of the proposed recommendations."
];
const criteria2 = ["Quality of presentation of material.", "Ability to maintain a discussion."];

function gradeTable() {
  const w = [3400, 5100, 850];
  const rows = [
    new TableRow({
      tableHeader: true,
      children: [
        cell([cellText("Components of the internship report", { bold: true, align: AlignmentType.CENTER })], { width: w[0], shading: "D9D9D9" }),
        cell([cellText("Evaluation criteria", { bold: true, align: AlignmentType.CENTER })], { width: w[1], shading: "D9D9D9" }),
        cell([cellText("Points", { bold: true, align: AlignmentType.CENTER })], { width: w[2], shading: "D9D9D9" })
      ]
    })
  ];
  criteria.forEach((c, i) => {
    rows.push(new TableRow({
      children: [
        i === 0 ? cell([cellText("Completing an individual assignment and preparing a report on the internship")], { width: w[0], rowSpan: criteria.length }) : undefined,
        cell([cellText(`${i + 1}. ${c}`)], { width: w[1] }),
        cell([cellText("")], { width: w[2] })
      ].filter(Boolean)
    }));
  });
  criteria2.forEach((c, i) => {
    rows.push(new TableRow({
      children: [
        i === 0 ? cell([cellText("Presentation of work results, defense of the internship report")], { width: w[0], rowSpan: criteria2.length }) : undefined,
        cell([cellText(`${criteria.length + i + 1}. ${c}`)], { width: w[1] }),
        cell([cellText("")], { width: w[2] })
      ].filter(Boolean)
    }));
  });
  rows.push(new TableRow({
    children: [
      cell([cellText("TOTAL", { bold: true, align: AlignmentType.CENTER })], { width: w[0], colSpan: 2 }),
      cell([cellText("")], { width: w[2] })
    ]
  }));
  return new Table({ width: { size: w.reduce((a, b) => a + b, 0), type: WidthType.DXA }, borders: TABLE_BORDERS, columnWidths: w, rows });
}

const reviewSection = [
  Heading("REVIEW FROM THE UNIVERSITY'S PRACTICE SUPERVISOR"),
  gradeTable(),
  blank(),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Grade: ________________________________________________________________", font: B.FONT, size: 24 })] }),
  new Paragraph({ spacing: { after: 400 }, children: [new TextRun({ text: "(pass/excellent/good/satisfactory)", font: B.FONT, size: 18, italics: true })] }),
  blank(), blank(),
  new Paragraph({ children: [new TextRun({ text: "Head of Practice from the University", font: B.FONT, size: 24 })] }),
  blank(),
  new Paragraph({ children: [new TextRun({ text: "_____________ / Yelesky A.", font: B.FONT, size: 24 })] }),
  new Paragraph({ children: [new TextRun({ text: "(signature)                                          (full name)", font: B.FONT, size: 18, italics: true })] })
];

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4
          margin: { top: 1134, bottom: 1134, left: 1701, right: 850 } // ~2/2/3/1.5 cm
        }
      },
      children: [
        ...B.titlePage,
        ...B.sectionI,
        ...B.sectionII,
        ...B.sectionIII,
        ...sectionIV,
        ...reviewSection
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("Report_Kozlova_Russia_Africa.docx", buf);
  console.log("done", buf.length);
});
