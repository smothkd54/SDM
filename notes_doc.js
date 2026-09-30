const B = require("./build.js");
const { Document, Packer, Paragraph, TextRun, AlignmentType, fs, FONT } = B;
const notesData = require("./notes_data.json");

const titles = {
  1: "Title Slide",
  2: "Structure of the Report",
  3: "Relevance and Hypothesis",
  4: "Research Design",
  5: "Chapter 1 — Forms of Economic Cooperation",
  6: "Chapter 1 — Historical & Legal Framework",
  7: "Chapter 2 — Trade Turnover Dynamics, 2018–2024",
  8: "Chapter 2 — Sectoral Structure of Investment",
  9: "Chapter 2 — The Summit Process: 2019 vs. 2023",
  10: "Chapter 3 — Main Problems",
  11: "Chapter 3 — Prospects & Priority Directions",
  12: "Conclusion",
  13: "Thank You"
};

function heading(text) {
  return new Paragraph({
    spacing: { before: 280, after: 100 },
    children: [new TextRun({ text, font: FONT, size: 26, bold: true, color: "1B2A4A" })]
  });
}
function body(text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 200, line: 300, lineRule: "auto" },
    children: [new TextRun({ text, font: FONT, size: 24 })]
  });
}
function title(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
    children: [new TextRun({ text, font: FONT, size: 32, bold: true })]
  });
}
function subtitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 500 },
    children: [new TextRun({ text, font: FONT, size: 24, italics: true, color: "5B6B85" })]
  });
}

const children = [
  title("Speaker Notes"),
  subtitle("Economic Cooperation Between Russia and African Countries: Opportunities and Challenges — Presentation Script"),
];

for (let i = 1; i <= 13; i++) {
  children.push(heading(`Slide ${i}: ${titles[i]}`));
  children.push(body(notesData[String(i)]));
}

const doc = new Document({
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
    children
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("SDM_Russia_Africa_Speaker_Notes.docx", buf);
  console.log("notes docx done", buf.length);
});
