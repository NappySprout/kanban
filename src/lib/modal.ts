import type { Tab, Task } from '$stores';
import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
import { get, type Readable, type Writable } from 'svelte/store';

const addTabModal = (tabs: Readable<string[]>, boards: Writable<Tab[]>) => {
	const addModal: ModalSettings = {
		type: 'prompt',
		title: 'Enter Project Name',
		body: 'Provide your Project Name in the field below, please give them unique names',
		value: `Project ${get(tabs).length}`,
		response: (r: string | boolean) => {
			if (typeof r === 'boolean') return;
			if (get(tabs).includes(r)) {
				modalStore.trigger({
					type: 'alert',
					title: 'Tab Name Not Unique!',
					body: 'Please choose a different tab name 🙏',
					image: 'https://media.tenor.com/n9i8wI7D7AwAAAAd/sad-kat.gif'
				});
				return;
			}
			const newboards = get(boards).concat([
				{
					name: r,
					segments: [
						{ name: 'To-do', tasks: [] },
						{ name: 'In-progress', tasks: [] },
						{ name: 'Completed', tasks: [] }
					]
				}
			]);
			boards.update(() => newboards);
		}
	};
	modalStore.trigger(addModal);
};

const taskModal = (segmentIndex: number, boards: Writable<Tab[]>, storeTab: Writable<string>) => {
	const addModal: ModalSettings = {
		type: 'prompt',
		title: 'Enter Task Content',
		body: 'Add task content in the fields below',
		value: '',
		response: (r: string | boolean) => {
			if (typeof r === 'boolean') return;
			const tabIndex = get(boards).reduce((cum, el, i) => (el.name == get(storeTab) ? i : cum), -1);
			const task: Task = { content: r, id: new Date().toJSON() };
			const res = get(boards)[tabIndex].segments[segmentIndex].tasks.concat([task]);
			const copy = get(boards);
			copy[tabIndex].segments[segmentIndex].tasks = res;
			boards.update(() => copy);
		}
	};
	return () => modalStore.trigger(addModal);
};

const editTaskModal = (
	content: string,
	taskIndex: number,
	segmentIndex: number,
	boards: Writable<Tab[]>,
	storeTab: Writable<string>
) => {
	const editModal: ModalSettings = {
		type: 'prompt',
		title: 'Edit Task Content',
		body: 'Edit task content in the fields below',
		value: content,
		response: (r: string | boolean) => {
			if (typeof r === 'boolean') return;
			const tabIndex = get(boards).reduce((cum, el, i) => (el.name == get(storeTab) ? i : cum), -1);
			const copy = get(boards);
			copy[tabIndex].segments[segmentIndex].tasks[taskIndex].content = r;
			boards.update(() => copy);
		}
	};
	return () => modalStore.trigger(editModal);
};

export { addTabModal, taskModal, editTaskModal };
