import Hangul from "hangul-js";
const golfzone = [
  { label: "강남300", course: ["강남300a", "강남300b", "강남300c"] },
  { label: "강촌명문", course: ["강촌명문a", "강촌명문b", "강촌명문c"] },
  { label: "거제뷰", course: ["거제뷰a", "거제뷰b", "거제뷰c"] },
  { label: "고창", course: ["고창a", "고창b", "고창c"] },
  { label: "여주", course: ["여주a", "여주b", "여주c"] },
];

//초성 추가
golfzone.map((e) => (e.chosung = Hangul.disassemble(e.label).join("")));

export default golfzone;
