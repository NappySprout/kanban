import { writable, type Writable } from 'svelte/store';

const isMoving: Writable<boolean> = writable(false);
const source: Writable<[number, number]> = writable([0, 0]);
const destination: Writable<[number, number]> = writable([0, 0]);

export { isMoving, source, destination };
