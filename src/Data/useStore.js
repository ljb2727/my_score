import create from "zustand";

const useStore = create((set) => ({
  count: 999, //아이디부여
  info: [
    {
      id: 100,
      골프장: "강남100",
      전반: "a1",
      후반: "a2",
      날짜: "2022년 03월 24일",
      시간: "오전 10시 30분",
    },
    {
      id: 101,
      골프장: "강남200",
      전반: "a1",
      후반: "a2",
      날짜: "2022년 04월 24일",
      시간: "오전 10시 30분",
    },
  ], //라운드정보 어레이
  /*{
    id: 0, 
    골프장: '강남300', 
    전반: 'a1', 
    후반: 'a2', 
    날짜: '2022년 03월 24일',
    시간: '오전 10시 30분'
  }*/
  useGolfzone: "", //골프장명
  setGolfzone: (value) => set((state) => ({ useGolfzone: value })), //셋골프장명
  useCourse: { 전반: "", 후반: "" },
  setCourse: (value) => set((state) => ({ useCourse: value })),

  resetStore: () =>
    set((state) => {
      state.setGolfzone("");
      state.setCourse({ 전반: "", 후반: "" });
    }),
  카운트증가: () =>
    set((state) => {
      console.log("카운트증가");
      return { count: state.count + 1 };
    }),
  라운드추가: (golfzone, course1, course2, date, time) =>
    set((state) => {
      //카운트 증가
      state.카운트증가();
      //라운딩객체 생성
      const rounding = {
        id: state.count,
        골프장: golfzone,
        전반: course1,
        후반: course2,
        날짜: date,
        시간: time,
      };
      console.log("라운드추가");
      return { info: [...state.info, rounding] };
    }),
  라운드삭제: (parentId) =>
    set((state) => {
      console.log("라운드삭제");
      const filter = state.info.filter((e) => e.id !== parentId);
      return { info: filter };
    }),
}));

export default useStore;
