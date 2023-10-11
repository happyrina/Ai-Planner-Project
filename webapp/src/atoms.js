import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "userinfo", // 고유한 key 값
    storage: localStorage,
})


export const infoState = atom({
    key: "infoState",
    default: "",
    effects_UNSTABLE: [persistAtom]
})

export const nameState = atom({
    key: "nameState",
    default: "",
    effects_UNSTABLE: [persistAtom]
})
export const goalState = atom({
    key: "goal",
    default: "",
})

export const chatState = atom({
    key: "chatlist",
    default: [{}]
})

export const responseState = atom({
    key: "response",
    default: false
})

export const questionState = atom({
    key: "question",
    default: ""
})

export const selectedGoalState = atom({
    key: "selectedgoal",
    default: "",
})

export const goalListState = atom({
    key: "listofgoal",
    default: [],
})


export const modeState = atom({
    key: "mode",
    default: "create"
})

export const goalIdState = atom({
    key: "goalId",
    default: ""
})

export const eventsPropState = atom({
    key: 'eventsProp',
    default: [],
});

export const selectedDateState = atom({
    key: 'selectedDateState',
    default: null,
});
