import { atom } from "recoil";

export const adminPageState = atom<number>({
    key: 'adminPageState',
    default: 1
});

export const adminItemOffsetState = atom<number>({
    key: 'adminItemOffsetState',
    default: 0
});
