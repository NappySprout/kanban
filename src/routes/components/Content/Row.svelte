<script lang="ts">
	import { fly } from 'svelte/transition';
	import { send, receive } from '$lib/crossfade.js';
	import { flip } from 'svelte/animate';
	import { isMoving, source, destination } from '$movement';
	import { type Task, boards, storeTab } from '$stores';
	import Card from './Card.svelte';
	import { taskModal, editTaskModal } from '$lib/modal';
	export let title = '';
	export let tasks: Task[] = [];
	export let segmentIndex = -1;
	export let addToEnd = false;
	const taskFn = (i: number) => {
		return () => {
			$destination = [$destination[0], i];
			if (!$isMoving) $source = [$source[0], i];
			$boards = $boards;
		};
	};
	const openModal = (segmentIndex: number) => taskModal(segmentIndex, boards, storeTab);
	const editModal = (content: string, taski: number, segmentIndex: number) =>
		editTaskModal(content, taski, segmentIndex, boards, storeTab);
</script>

<ul class="flex flex-col w-64">
	<h3 out:fly={{ x: 2000, duration: 10 }} in:fly={{ x: 2000, duration: 200 }}>
		<span class="badge badge-filled-primary mt-4 mb-2 p-4">{title}</span>
	</h3>
	{#each tasks.concat([{ content: 'button', id: 'button' }]) as task, i (task.id)}
		<li
			class="li "
			in:receive={{ key: task.id }}
			out:send={{ key: task.id }}
			animate:flip={{ duration: 200 }}
		>
			{#if task.id != 'button'}
				<div on:pointerdown={() => ($isMoving = true)} on:pointerenter={taskFn(i)}>
					<Card content={task.content} editCardFn={editModal(task.content, i, segmentIndex)} />
				</div>
			{:else}
				<button
					on:pointerenter={() => {
						addToEnd = true;
					}}
					on:pointerleave={() => (addToEnd = false)}
					on:click={openModal(segmentIndex)}
					class="btn btn-filled-primary btn-sm mt-2 transition transform hover:-translate-y-1 shadow-xl"
				>
					<span class="text-2xl">+</span>
					<span>add</span>
				</button>
			{/if}
		</li>
	{/each}
</ul>
