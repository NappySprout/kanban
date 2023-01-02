<script>
	export let content = '';
	import { destination, isMoving } from '$movement';
	import { boards, storeTab } from '$stores';
	export let editCardFn = () => {
		return;
	};
	const del = () => {
		const [seg, ind] = $destination;
		const tabIndex = $boards.reduce((cum, el, i) => (el.name == $storeTab ? i : cum), -1);
		$boards[tabIndex].segments[seg].tasks.splice(ind, 1);
		$boards = $boards;
		$isMoving = false;
	};
</script>

<div class="card p-2 my-2 shadow-lg transition transform hover:-translate-y-1">
	<button on:click={del} class="btn block ml-auto">x</button>
	<button class="p-4 card bg-tertiary-100 block w-full text-left" on:click={editCardFn}>
		{content}
	</button>
</div>

<style>
	*::selection {
		color: none;
		background: none;
	}
</style>
