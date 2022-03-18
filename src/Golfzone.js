import Hangul from "hangul-js";
const golfzone = [
  { label: "강남300", year: 1994 },
  { label: "강촌명문", year: 1994 },
  { label: "거제뷰", year: 1994 },
  { label: "고창", year: 1994 },
  { label: "여주", year: 1994 },
];

//초성 추가
golfzone.map((e) => (e.chosung = Hangul.disassemble(e.label).join("")));

export default golfzone;
