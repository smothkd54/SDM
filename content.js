const B = require("./build.js");
const { cellText, AlignmentType } = B;

function T(text, opts = {}) { return cellText(text, opts); }
function TB(text) { return cellText(text, { bold: true }); }
function TC(text, opts = {}) { return cellText(text, { align: AlignmentType.CENTER, ...opts }); }

// ---- Item 1 ----
const item1 = [
  T("Safety training has been completed."),
  T("The individual assignment has been agreed upon and approved by the internship supervisor. The research topic chosen is “Economic Cooperation between Russia and African Countries: Opportunities and Challenges.”")
];

// ---- Item 2: research plan ----
const item2 = [
  T("In accordance with the topic, the following research plan was developed:"),
  T("Introduction"),
  T("1. Theoretical and legal foundations of economic cooperation between Russia and African countries"),
  T("1.1 Concept, forms and levels of international economic cooperation"),
  T("1.2 Historical and legal framework of Russian–African relations"),
  T("1.3 Institutional mechanisms and priority sectors of Russian–African cooperation"),
  T("2. Current state and dynamics of economic cooperation between Russia and African countries"),
  T("2.1 Dynamics and geographic structure of trade turnover, 2018–2024"),
  T("2.2 Sectoral structure of investment cooperation: energy, mining and agriculture"),
  T("2.3 The summit process as an institutional framework of cooperation"),
  T("3. Problems and prospects of economic cooperation between Russia and African countries"),
  T("3.1 Main problems constraining Russian–African economic cooperation"),
  T("3.2 Prospects and priority directions for development"),
  T("Conclusion"),
  T("List of references and literature")
];

// ---- Item 3: bibliography ----
const refsRu = [
  "1. Ахмат И., Кануте С. Развитие совместных проектов Российской Федерации и африканских стран в контексте осуществления региональной интеграции на континенте // Вестник Поволжского института управления. 2022. Т. 22. № 5. С. 54–71.",
  "2. Диато К. Л. М. Взаимоотношения России и Африки: динамика и проблемы // Вестник РУДН. Серия: Политология. 2025. Т. 27. № 4. С. 945–956. DOI: 10.22363/2313-1438-2025-27-4-945-956.",
  "3. Корендясов Е. Н., Константинова О. В. Некоторые аспекты российско-африканского сотрудничества на современном этапе // Контуры глобальных трансформаций: политика, экономика, право. 2023. Т. 16. № 1. С. 170–186. DOI: 10.31249/kgt/2023.01.09.",
  "4. Константинова О. В. Торговля России с Африкой: современное положение дел // Контуры глобальных трансформаций: политика, экономика, право. 2021. Т. 14. № 3. С. 227–242. DOI: 10.23932/2542-0240-2021-14-3-13.",
  "5. Леденёва М. В., Плаксунова Т. А. Экономический рост и перспективы экономического развития стран Африки южнее Сахары // Теоретическая и прикладная экономика. 2020. № 2. DOI: 10.25136/2409-8647.2020.2.32732.",
  "6. Мамуду Х. Б., Щербаков Г. А. Африканская континентальная зона свободной торговли как фактор ускорения финансовой и торговой интеграции в Африке: возможности, риски и направления развития // Мировая экономика и мировые финансы. 2026. Т. 5. № 1. С. 49–57.",
  "7. Панина А. А. Краткий обзор сотрудничества между Россией и странами Африки в военно-политической сфере международных отношений (2019–2023 гг.) // Этносоциум и межнациональная культура. 2024.",
  "8. Шубин В. Г. Россия – Южная Африка: 30 лет плодотворного сотрудничества и 25 лет официальных отношений // Ученые записки Института Африки РАН. 2017."
];
const refsEn = [
  "9. Abramova I. O., Orlov V. A., Terpugova V. A. Chapter 25. The Second Russia–Africa Summit and Beyond: Rapprochement is Strategic, not Tactical // Security Index Yearbook. Moscow: PIR Center, 2024.",
  "10. Al Jazeera. Putin promises grains, debt write-off as Russia seeks Africa allies. 2023, July 28. URL: https://www.aljazeera.com/news/2023/7/28/putin-promises-grains-debt-write-off-as-russia-seeks-africa-allies",
  "11. Caspian News. Russia-Africa Trade Reaches New Heights with $24.5 Billion Turnover. 2024, November 12. URL: https://caspiannews.com/news-detail/russia-africa-trade-reaches-new-heights-with-245-billion-turnover-2024-11-12-38/",
  "12. Ecofin Agency. Trade Between Russia and Africa Grows 37% in 2023. 2024. URL: https://www.ecofinagency.com/public-management/1811-46145-trade-between-russia-and-africa-grows-37-in-2023",
  "13. Elbassoussy A. The growing Russian role in sub-Saharan Africa: interests, opportunities and limitations // Journal of Humanities and Applied Social Sciences. 2022. Vol. 4. No. 3. P. 251–270. DOI: 10.1108/JHASS-11-2020-0210.",
  "14. Klomegah K. K. Russia – Africa: Key Challenges and Prospects for Trade and Economic Cooperation // Modern Diplomacy. 2022, April 30. URL: https://moderndiplomacy.eu/2022/04/30/russia-africa-key-challenges-and-prospects-for-trade-and-economic-cooperation/",
  "15. Mining.com. Alrosa discovers 22 new diamond deposits in Zimbabwe. 2024. URL: https://www.mining.com/web/alrosa-discovers-22-new-diamond-deposits-in-zimbabwe/",
  "16. President of Russia. Russia–Africa Summit [official transcript]. Kremlin.ru, 2023. URL: http://en.kremlin.ru/events/president/news/71826",
  "17. PSC Report. Russia-Africa summit: what was in it for Africa? // Institute for Security Studies (ISS Africa). 2023, September 18. URL: https://issafrica.org/pscreport/psc-insights/russia-africa-summit-what-was-in-it-for-africa",
  "18. Roscongress Foundation. Summit Outcomes 2023 // The Russia–Africa Summit and Economic Forum, official portal. 2023. URL: https://summitafrica.ru/en/archive/2023/summit-outcomes/",
  "19. Statista. Russia: trade turnover with African countries, 2015–2024. 2025. URL: https://www.statista.com/statistics/1063423/russia-and-african-countries-trade-volume/",
  "20. World Nuclear Association. Nuclear Power in Egypt: country profile. 2025. URL: https://world-nuclear.org/information-library/country-profiles/countries-a-f/egypt"
];

const item3 = [
  T("A bibliography of 20 sources on the research topic was collected, of which 12 (60%) are in a foreign language (English), in accordance with the requirement that no less than 50% of sources be foreign-language. Sources are arranged alphabetically, Russian-language sources first, followed by English-language sources:"),
  ...refsRu.map(r => T(r)),
  ...refsEn.map(r => T(r))
];

// ---- Item 4: Introduction ----
const item4 = [
  T("Relevance. Since the mid-2010s, and especially after the first Russia–Africa Summit held in Sochi in 2019, Russia has sought to reposition itself as a significant economic partner for the African continent. At that summit, Russian officials set the explicit goal of doubling bilateral trade from US$20.4 billion in 2018 to US$40 billion by 2023 [16, 18]. Trade turnover has indeed grown substantially since then — reaching approximately US$24.5 billion in 2023 (a 37% year-on-year increase) and an estimated US$24.5–27.7 billion in 2024 [11, 12, 19] — yet it remains well short of the announced target. At the same time, the political dimension of the relationship, expressed through the 2019 and 2023 Russia–Africa Summits, has produced a large number of framework agreements (92 in 2019, 161 in 2023) [16, 18], while the number of African heads of state attending fell from 43 in 2019 to only 17 in 2023 [9, 17]. This divergence between declared political ambition, formal agreement-signing, and the actual scale and structure of economic engagement makes the assessment of Russian–African economic cooperation — its instruments, sectoral composition, and structural constraints — a highly relevant subject of study, particularly for Russia's economic strategy toward the Global South and for African states seeking to diversify their external economic partnerships."),
  T("Degree of development of the topic. Russian–African economic relations have been examined by a number of Russian and foreign scholars. Trade dynamics and structural imbalances have been analyzed by Konstantinova [4] and Korendyasov and Konstantinova [3]; Ledeneva and Plaksunova [5] examine the broader macroeconomic development prospects of Sub-Saharan Africa; Ahmat and Kanoute [1] study joint investment projects in the context of African regional integration; Mamudu and Shcherbakov [6] analyze the African Continental Free Trade Area (AfCFTA) as a factor of regional integration relevant to external partners such as Russia; the historical and institutional dimension of specific bilateral relationships is treated by Shubin [8] (Russia–South Africa) and Panina [7] (military-political cooperation, 2019–2023); and Diato [2] provides a recent overview of the dynamics and problems of the relationship as a whole. Among foreign-language sources, Elbassoussy [13] offers a systematic account of Russia's interests, opportunities and limitations in Sub-Saharan Africa from an Egyptian scholarly perspective, while Abramova, Orlov and Terpugova [9] assess the 2023 Summit's outcomes for the Russian expert community. Policy-oriented analysis by the Institute for Security Studies [17] and Modern Diplomacy [14] provides a more critical, Africa-centred assessment of the same events. Despite this substantial body of work, most existing studies treat trade dynamics, summit diplomacy and sectoral cooperation (energy, mining, agriculture) separately; a study that explicitly links the political mechanism of the Russia–Africa summit process to measurable economic outcomes, and tests whether growing political engagement has translated into economic cooperation of comparable scale, is still lacking. This report seeks to help close that gap."),
  T("Hypothesis. The growing political rapprochement between Russia and African countries since the first Russia–Africa Summit of 2019 has been accompanied by a measurable increase in trade and investment linkages, but institutional weaknesses (in particular, a limited Russian financial and banking presence on the continent) and external constraints (Western sanctions affecting logistics, insurance and payments, and competition from China, the EU and India) have prevented Russia from converting political engagement into economic cooperation at a scale comparable either to its own stated targets or to that of competing partners."),
  T("The purpose of this research is to assess the current state, dynamics and prospects of economic cooperation between Russia and African countries in the period 2018–2026, in light of the political rapprochement inaugurated by the Russia–Africa summit process."),
  T("In accordance with the purpose of the study, the following tasks were set:"),
  T("– to examine the theoretical foundations, forms and levels of international economic cooperation applicable to the Russian–African case;"),
  T("– to trace the historical and legal framework underlying Russian–African relations, from the Soviet period to the present summit process;"),
  T("– to analyze the dynamics and geographic structure of Russian–African trade turnover, 2018–2024;"),
  T("– to assess the sectoral structure of investment cooperation, focusing on energy, mining and agriculture;"),
  T("– to evaluate the summit process as the principal institutional mechanism of cooperation;"),
  T("– to identify the main problems constraining Russian–African economic cooperation and to determine priority directions for its future development."),
  T("The object of the study is Russian–African economic relations."),
  T("The subject of the study is the current state, dynamics and structural problems of economic cooperation between the Russian Federation and African countries in the context of the political rapprochement that began in 2019.")
];

// ---- Chapter 1 (item 5) ----
const item5 = [
  T("1. THEORETICAL AND LEGAL FOUNDATIONS OF ECONOMIC COOPERATION BETWEEN RUSSIA AND AFRICAN COUNTRIES", { bold: true }),
  T("1.1 Concept, forms and levels of international economic cooperation"),
  T("International economic cooperation is a stable, mutually agreed form of interaction between states, aimed at the joint achievement of economic goals through the coordinated use of trade, financial, investment, technical and institutional instruments, without necessarily implying full integration of the participating economies. Unlike simple trade exchange, cooperation presupposes a degree of continuity and institutionalization — intergovernmental agreements, joint commissions, or standing mechanisms — which distinguishes it from a series of unrelated commercial transactions."),
  T("For the purposes of this study, the forms of economic cooperation between Russia and African countries are classified according to two independent criteria, in order to avoid the ambiguity that a single, unqualified list of categories would create."),
  T("By instrument: (a) trade cooperation — the exchange of goods and services, measured through trade turnover statistics; (b) investment cooperation — direct and portfolio capital flows into productive assets, e.g. mining concessions or power-generation projects; (c) financial and technical assistance — concessional financing, debt relief and in-kind aid (such as grain shipments); and (d) institutional cooperation — intergovernmental agreements, memoranda and joint commissions that create the legal and organizational framework within which the first three forms operate."),
  T("By level: (a) bilateral cooperation, conducted directly between Russia and an individual African state (e.g. the Russia–Egypt nuclear agreement); and (b) multilateral/regional cooperation, conducted through pan-African or Eurasian institutions, such as the 2019 memorandum between the Eurasian Economic Commission and the African Union, or Russia's engagement with the African Continental Free Trade Area (AfCFTA) framework [6]."),
  T("This two-criterion classification is used consistently throughout the report: Chapter 2 is organized primarily along the instrument axis (trade, investment, institutional mechanisms), while the bilateral/multilateral distinction is used in Chapter 3 to explain why some forms of cooperation have advanced faster than others."),
  T("1.2 Historical and legal framework of Russian–African relations"),
  T("The legal and institutional basis of Russian(-Soviet)–African economic relations was established well before the post-2019 rapprochement. During the 1960s–1980s the USSR maintained diplomatic relations with 46 of 53 African states and had intergovernmental agreements on economic and technical cooperation with 37 of them; Soviet specialists participated in the construction of approximately 600 industrial and infrastructural facilities across the continent, of which over 300 were completed by the late 1980s [8]. This legacy of technical assistance forms an important, if often overlooked, precedent for the state-led, project-based model of cooperation that characterizes Russian engagement with Africa today."),
  T("Following the dissolution of the USSR, Russian–African economic ties contracted sharply through the 1990s as Russia's foreign economic policy reoriented toward Europe and the former Soviet space. Renewed institutional engagement began in the 2000s and accelerated markedly after 2019. The first Russia–Africa Summit and Economic Forum, held in Sochi on 23–24 October 2019, brought together delegations from all African states and led to the signing of 92 trade agreements and memoranda worth over US$12.5 billion, including a Memorandum of Understanding between the Government of the Russian Federation and the African Union on basic principles of cooperation, an analogous memorandum between the Eurasian Economic Commission and the African Union, and a framework agreement between Sberbank, the Russian Export Center, VEB.RF and Gemcorp Capital on a mechanism for financing Russia–Africa trade [16, 18]. At this summit, Russia announced its intention to double trade turnover with Africa from US$20.4 billion (2018) to US$40 billion by 2023 [17]."),
  T("The second Russia–Africa Summit, held in Saint Petersburg on 27–28 July 2023, was attended by delegations from 49 African countries and organizations, though only 17 African heads of state took part, compared with 43 in 2019 [9, 17]. The forum produced 161 agreements not constituting commercial secrets and an action plan for 2023–2026 [18]. At the same summit, Russia pledged to supply free grain to six African states and reaffirmed its intention to expand food and fertilizer exports to the continent [10]."),
  T("Taken together, the legal-institutional framework of Russian–African cooperation rests on three layers: (1) the historical corpus of Soviet-era bilateral agreements, still formally in force with many states; (2) the post-2019 summit-generated agreements and memoranda, which are numerous but heterogeneous in binding force, ranging from framework MoUs to concrete commercial contracts; and (3) sector-specific bilateral agreements, such as the 2015 Russia–Egypt nuclear cooperation agreement discussed in section 1.3. This layered structure explains why the number of signed documents (92 and 161 at the two summits) is a poor proxy for the actual depth of economic cooperation — a point developed further in Chapter 3."),
  T("1.3 Institutional mechanisms and priority sectors of Russian–African cooperation"),
  T("Three sectors dominate the practical content of Russian–African economic cooperation and illustrate the layered framework described above."),
  T("Energy and nuclear cooperation. The most capital-intensive Russian project in Africa is the El Dabaa Nuclear Power Plant in Egypt, built by Rosatom under a bilateral intergovernmental agreement signed in November 2015. The plant comprises four VVER-1200 reactor units with a combined capacity of 4.8 GW — expected to supply up to 50% of Egypt's nuclear-derived generation capacity — with construction of the four units launched successively between 2022 and 2024 and full commissioning planned by 2030; the project is expected to create up to 50,000 jobs during construction [documented in section 2.2 below]. Beyond financing and construction, the agreement includes Russian supply of nuclear fuel for the plant's lifecycle, training of Egyptian personnel, and operational assistance for the first ten years."),
  T("Mining and raw materials. Russian mining companies, notably the diamond group Alrosa, have expanded their African footprint as a hedge against the depletion of domestic reserves (Russia's currently operating diamond fields are projected to be exhausted by 2047). Alrosa holds 42 exploration licenses in Zimbabwe, where it has discovered 22 new diamond deposits since 2019, and has increased its stake in the Angolan producer Catoca to 41%. The aluminium group Rusal exports bauxite mined at its Dian-Dian concession in Guinea, competing directly with Chinese mining interests in the same country."),
  T("Agriculture and food security. Grain and fertilizer trade constitutes the fastest-growing and most politically visible component of cooperation with lower-income African states. At the 2023 summit, Russia promised free grain shipments (25,000–50,000 tonnes per recipient) to six African countries; by early 2024, cumulative deliveries under this pledge reached approximately 200,000 tonnes, including a shipment of 50,000 tonnes of wheat to the Central African Republic. Russian officials have also stated an ambition to raise total food exports to Africa toward US$33 billion."),
  T("A common institutional weakness runs across all three sectors: the absence of a well-developed Russian banking and financial infrastructure on the continent. As noted by Vladimir Padalko, Vice-President of the Chamber of Commerce and Industry of the Russian Federation, limited Russian banking presence in Africa is a key barrier to converting summit-level political agreements into functioning trade and investment flows, and he has called for dedicated financial institutions, trade missions and commodity hubs to close this gap [14]. This institutional constraint is examined quantitatively in Chapter 2 and discussed as a central explanatory factor in Chapter 3."),
  T("Conclusions to Chapter 1. Economic cooperation between Russia and African countries can be meaningfully classified along two axes — instrument (trade, investment, assistance, institutional) and level (bilateral, multilateral) — which together explain the otherwise puzzling coexistence of a large number of signed agreements with a comparatively modest and narrowly concentrated flow of actual trade and investment. The historical legacy of Soviet-era technical assistance, the summit process launched in 2019, and three priority sectors — nuclear energy, mining and agriculture — constitute the institutional and sectoral foundation on which the quantitative analysis of Chapter 2 is built.")
];

module.exports = { item1, item2, item3, item4, item5, refsRu, refsEn, T, TB, TC };
