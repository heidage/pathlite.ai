import { atom,createStore } from 'jotai';

// initial messages state
const INITIAL_MESSAGES: any[] = [];

// Create a store and an atom
export const store = createStore();
export const messagesAtom = atom(INITIAL_MESSAGES);

export const addMessage = (message: any) => {
    store.set(messagesAtom, (prev: any) => [...prev, message]);
}