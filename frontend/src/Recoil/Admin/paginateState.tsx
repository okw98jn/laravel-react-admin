import { atom } from "recoil";

export const pageState = atom<number>({
    key: 'pageState',
    default: 1
});

export const itemOffsetState = atom<number>({
    key: 'itemOffsetState',
    default: 1
});
