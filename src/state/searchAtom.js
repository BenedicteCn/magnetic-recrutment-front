import { atom } from 'jotai';
//State management libray, Similar to useState and useContext
const displayProfileAtom = atom([]);
const isLoadingAtom = atom(false);

export { displayProfileAtom, isLoadingAtom };
