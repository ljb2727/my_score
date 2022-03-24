import create from "zustand";

const useStore = create((set) => ({
  count: 0, //아이디부여
  info: [], //라운드정보 어레이
  useGolfzone: "dd", //골프장명
  setGolfzone: (value) => set((state) => ({ useGolfzone: value })), //셋골프장명
  useCourse: { 전반: "", 후반: "" },
  setCourse: (value) => set((state) => ({ useCourse: value })),

  resetStore: () =>
    set((state) => {
      state.setGolfzone("");
      state.setCourse({ 전반: "", 후반: "" });
    }),

  라운드추가: (golfzone, course1, course2, date, time) =>
    set((state) => {
      //라운딩객체 생성
      const rounding = {
        id: state.count,
        골프장: golfzone,
        전반: course1,
        후반: course2,
        날짜: date,
        시간: time,
      };
      console.log(state.info);
      state.증가();
      return { info: [...state.info, rounding] };
    }),
  증가: () => set((state) => ({ count: state.count + 1 })), //아이디 카운터 증가
}));

export default useStore;
