import create from "zustand";
import { devtools } from "zustand/middleware";
import Golfzone from "./Golfzone";

const useStore = create(
  devtools((set) => ({
    count: 999, //아이디부여
    currentId: null, //현재 선택된 골프장의 코스 정보를 알기위한 임시 아이디
    score: { 총스코어: 0, 총퍼팅수: 0 },
    info: [
      {
        id: "2",
        골프장: "강남300",
        전반: "new강남300a",
        후반: "new강남300b",
        날짜: "2022년 03월 24일",
        시간: "오전 01시 18분", //형식에 맞게 저장
        half: false,
        sum: 62,
        inScore: [
          { score: 0, put: 2 }, //1
          { score: 1, put: 1 }, //2
          { score: 2, put: 1 }, //3
          { score: 0, put: 1 }, //4
          { score: 4, put: 1 }, //5
          { score: 0, put: 1 }, //6
          { score: null, put: null }, //7
          { score: null, put: null }, //8
          { score: null, put: null }, //9
        ],
        outScore: [
          { score: 0, put: 1 },
          { score: 0, put: 1 },
          { score: 0, put: 1 },
          { score: 0, put: 1 },
          { score: 0, put: 1 },
          { score: 0, put: 1 },
          { score: 0, put: 1 },
          { score: 0, put: 2 },
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
        half: false,
        sum: 54,
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
    setLocalInfo: (value) =>
      set((state) => {
        return { info: value };
      }),
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

    기본스코어: (id, inCourse, hole) => {
      set((state) => {
        const findIndex = state.info.findIndex((e) => e.id === id);
        const copyArray = [...state.info];
        const copyInScore = copyArray[findIndex].inScore;
        const copyOutScore = copyArray[findIndex].outScore;
        if (inCourse) {
          //console.log("in");
          if (copyInScore[hole].score === null) {
            copyInScore[hole] = {
              score: Number(0),
              put: copyInScore[hole].put,
            };
          }

          if (copyInScore[hole].put === null) {
            copyInScore[hole] = {
              score: copyInScore[hole].score,
              put: Number(2),
            };
          }

          copyArray[findIndex] = {
            ...copyArray[findIndex],
            inScore: copyInScore,
          };
        } else {
          //console.log("out");
          if (copyOutScore[hole].score === null) {
            copyOutScore[hole] = {
              score: Number(0),
              put: copyOutScore[hole].put,
            };
          }

          if (copyOutScore[hole].put === null) {
            copyOutScore[hole] = {
              score: copyOutScore[hole].score,
              put: Number(2),
            };
          }

          copyArray[findIndex] = {
            ...copyArray[findIndex],
            outScore: copyOutScore,
          };
        }
        return { info: copyArray };
      });
    },

    스코어수정: (findIndex, inCourse, hole, name, val) =>
      set((state) => {
        console.log(findIndex, inCourse, hole, name, val);
        const copyArray = [...state.info];

        const copyInScore = copyArray[findIndex].inScore;
        const copyOutScore = copyArray[findIndex].outScore;

        if (inCourse) {
          if (name === "스코어") {
            copyInScore[hole] = {
              score: Number(val),
              put: copyInScore[hole].put,
            };
          } else if (name === "퍼팅수") {
            copyInScore[hole] = {
              score: copyInScore[hole].score,
              put: Number(val),
            };
          }

          copyArray[findIndex] = {
            ...copyArray[findIndex],
            inScore: copyInScore,
          };
        } else {
          if (name === "스코어") {
            copyOutScore[hole] = {
              score: Number(val),
              put: copyOutScore[hole].put,
            };
          } else if (name === "퍼팅수") {
            copyOutScore[hole] = {
              score: copyOutScore[hole].score,
              put: Number(val),
            };
          }

          copyArray[findIndex] = {
            ...copyArray[findIndex],
            outScore: copyOutScore,
          };
        }
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
          half: course2.length === 0 ? true : false,
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
    총스코어: (findIndex, id, 전반, 후반) =>
      set((state) => {
        const inScore = state.info[findIndex].inScore;
        const outScore = state.info[findIndex].outScore;
        const isHalf = state.info[findIndex].half;
        let sumScore =
          inScore.reduce((acc, cur, i) => {
            return acc + cur.score;
          }, 0) +
          outScore.reduce((acc, cur, i) => {
            return acc + cur.score;
          }, 0);

        let sumPut =
          inScore.reduce((acc, cur, i) => {
            return acc + cur.put;
          }, 0) +
          outScore.reduce((acc, cur, i) => {
            return acc + cur.put;
          }, 0);

        state.score = { 총스코어: sumScore, 총퍼팅수: sumPut };

        //진행홀 계산
        const firstArray = inScore.map((e, i) => {
          if (e.score !== null) {
            return i;
          } else {
            return null;
          }
        });
        const idx = Golfzone.findIndex((e) => e.label === id);
        const courseInfo = Golfzone[idx].courseInfo; //홀정보
        const firstHole = courseInfo.find((e) => e.name === 전반).hole;

        // console.log(firstArray);
        // console.log(id);
        // console.log(firstHole);
        // console.log(전반, 후반);
        // console.log(isHalf);

        let firstSum = firstArray
          .map((e) => {
            let sum = 0;
            if (e !== null) {
              sum += firstHole[e].par;
            }
            return sum;
          })
          .reduce((a, b) => a + b);
        let secondSum = 0;

        if (isHalf === false) {
          const secondHole = courseInfo.find((e) => e.name === 후반).hole;
          const secondArray = outScore.map((e, i) => {
            if (e.score !== null) {
              return i;
            } else {
              return null;
            }
          });
          secondSum = secondArray
            .map((e) => {
              let sum = 0;
              if (e !== null) {
                sum += secondHole[e].par;
              }
              return sum;
            })
            .reduce((a, b) => a + b);
          console.log(secondSum);
        }

        state.info[findIndex].sum = isHalf
          ? firstSum + sumScore
          : firstSum + secondSum + sumScore;
      }),
  }))
);

export default useStore;
