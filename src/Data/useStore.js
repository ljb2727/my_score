import create from "zustand";

const useStore = create((set) => ({
  count: 0,
  info: [],
  라운드추가: (golfzone, course1, course2, date, time) =>
    set((state) => {
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
  증가: () => set((state) => ({ count: state.count + 1 })),
}));

export default useStore;
