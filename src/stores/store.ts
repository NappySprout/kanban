import { localStorageStore } from '@skeletonlabs/skeleton';
import { get, writable, type Writable, derived, type Readable } from 'svelte/store';

interface Task {
	content: string;
	id: string;
}

interface Segment {
	name: string;
	tasks: Task[];
}

interface Tab {
	name: string;
	segments: Segment[];
}

const testTask: Task = { content: 'hello world', id: 'asdasd' };

const startBoards: Tab[] = [
	{
		name: 'Project 0',
		segments: [
			{ name: 'To-do', tasks: [testTask] },
			{ name: 'In-progress', tasks: [] },
			{ name: 'Completed', tasks: [] }
		]
	}
];

const boards: Writable<Tab[]> = localStorageStore('boards', startBoards);
const tabs: Readable<string[]> = derived(boards, (board) => board.map<string>((x) => x.name));
const storeTab: Writable<string> = writable(get(tabs)[0]);

export { type Task, type Segment, type Tab, boards, tabs, storeTab };
