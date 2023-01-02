<script lang="ts">
	import { AppBar, TabGroup, Tab, LightSwitch } from '@skeletonlabs/skeleton';
	import { tabs, boards, storeTab } from '$stores';
	import { send, receive } from '$lib/crossfade.js';
	import { flip } from 'svelte/animate';
	import { addTabModal } from '$lib/modal';
	let selected = -1;
	const setDown = (i: number) => {
		return () => (selected = i);
	};
	const setUp = (i: number) => {
		return () => {
			[$boards[selected], $boards[i]] = [$boards[i], $boards[selected]];
			selected = -1;
		};
	};
	const addTab = () => addTabModal(tabs, boards);
	const remove = (i: number) => () => {
		$boards.splice(i, 1);
		$boards = $boards;
	};
</script>

<AppBar>
	<TabGroup
		selected={storeTab}
		hover="bg-primary-hover-token"
		rounded="rounded-tl-container-token rounded-tr-container-token"
		color="text-primary-500"
	>
		{#each $tabs as tab, i (tab)}
			<div animate:flip={{ duration: 200 }} class="flex">
				<div
					on:mousedown={setDown(i)}
					on:mouseup={setUp(i)}
					in:receive={{ key: tab }}
					out:send={{ key: tab }}
				>
					<Tab value={tab}><div class="transition transform hover:-translate-y-1">{tab}</div></Tab>
				</div>
				<button class="btn btn-sm flex-col justify-start pl-0 -ml-2" on:click={remove(i)}>x</button>
			</div>
		{/each}
	</TabGroup>

	<svelte:fragment slot="trail">
		<button
			class="btn btn-filled-primary btn-sm transition transform hover:-translate-y-1 shadow-xl"
			on:click={addTab}
		>
			<span class="text-2xl">+</span>
			<span>add</span>
		</button>
		<LightSwitch />
	</svelte:fragment>
</AppBar>

<style>
	*::selection {
		color: none;
		background: none;
	}
</style>
