import { atom } from "recoil";

export const categoryPageState = atom<number>({
    key: 'categoryPageState',
    default: 1
});

export const categoryItemOffsetState = atom<number>({
    key: 'categoryItemOffsetState',
    default: 0
});
