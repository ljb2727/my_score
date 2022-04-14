import create from "zustand";

const useStore = create((set) => ({
  count: 999, //아이디부여
  currentId: null, //현재 선택된 골프장의 코스 정보를 알기위한 임시 아이디
  info: [
    //라운드정보 어레이
    /*{
    id: 0, //골프장 개별 id와 다른 생성된 리스트의 id..
    골프장: '강남300', 
    전반: 'a1', 
    후반: 'a2', 
    날짜: '2022년 03월 24일',
    시간: '오전 10시 30분'
    }*/
    {
      id: "2",
      골프장: "강남300",
      전반: "강남300a",
      후반: "강남300b",
      날짜: "2022년 03월 24일",
      시간: "오전 01시 18분", //형식에 맞게 저장
      inScore: [
        { score: 0, put: 1 },
        { score: -2, put: 1 },
        { score: -1, put: 1 },
        { score: 0, put: 1 },
        { score: 4, put: 1 },
        { score: 0, put: 1 },
        { score: null, put: null },
        { score: null, put: null },
        { score: null, put: null },
      ],
      outScore: [
        { score: 4, put: 1 },
        { score: 3, put: 1 },
        { score: 2, put: 1 },
        { score: 1, put: 1 },
        { score: 4, put: 1 },
        { score: 0, put: 1 },
        { score: 1, put: 1 },
        { score: 2, put: 2 },
        { score: null, put: null },
      ],
    },
    {
      id: "1",
      골프장: "강촌명문",
      전반: "강촌명문a",
      후반: "강촌명문b",
      날짜: "2022년 04월 24일",
      시간: "오전 10시 30분", //형식에 맞게 저장
      inScore: [
        { score: 4, put: 1 },
        { score: -2, put: 1 },
        { score: -1, put: 1 },
        { score: 0, put: 1 },
        { score: 4, put: 1 },
        { score: 0, put: 1 },
        { score: null, put: null },
        { score: null, put: null },
        { score: null, put: null },
      ],
      outScore: [
        { score: 0, put: 1 },
        { score: -2, put: 1 },
        { score: -1, put: 1 },
        { score: 0, put: 1 },
        { score: 4, put: 1 },
        { score: 0, put: 1 },
        { score: null, put: null },
        { score: null, put: null },
        { score: null, put: null },
      ],
    },
  ],

  useGolfzone: "", //골프장명
  setGolfzone: (value) => set((state) => ({ useGolfzone: value })), //셋골프장명
  useCourse: { 전반: "", 후반: "" },
  setCourse: (value) => set((state) => ({ useCourse: value })),

  setDate: (date, id) =>
    set((state) => {
      console.log(`date : ${date} / id : ${id}`);
      const findIndex = state.info.findIndex((e) => e.id === id);
      const copyArray = [...state.info];
      copyArray[findIndex] = { ...copyArray[findIndex], 날짜: date };
      return { info: copyArray };
    }),
  storeSetTime: (time, id) =>
    set((state) => {
      console.log(time);
      const findIndex = state.info.findIndex((e) => e.id === id);
      const copyArray = [...state.info];
      copyArray[findIndex] = {
        ...copyArray[findIndex],
        시간: `${time.오전오후} ${time.시} ${time.분}`,
      };
      return { info: copyArray };
    }),

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
  setId: (currentIdValue) =>
    set((state) => {
      state.currentId = currentIdValue;
    }),
  라운드추가: (golfzone, course1, course2, date, time) =>
    set((state) => {
      const inScore = [
        { score: null, put: null },
        { score: null, put: null },
        { score: null, put: null },
        { score: null, put: null },
        { score: null, put: null },
        { score: null, put: null },
        { score: null, put: null },
        { score: null, put: null },
        { score: null, put: null },
      ];
      const outScore = [...inScore];
      //카운트 증가
      state.카운트증가();
      //라운딩객체 생성
      const rounding = {
        id: String(state.count),
        골프장: golfzone,
        전반: course1,
        후반: course2,
        날짜: date,
        시간: time,
        inScore,
        outScore,
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
