<script lang="ts">
	import { menuStore } from '$lib/components/Menu/menu-store';

	export let href: string;
	export let src: string;
	export let target: string | undefined = undefined;
	export let text: string;

	function handleLinkClick() {
	    menuStore.set({ visible: false });
	}
</script>

<li>
	<a {href} {target} on:click={handleLinkClick}>
		<span class="logo">
			<img {src} alt={text} />
		</span>
		{text}
	</a>
</li>

<style>
	li {
		overflow: hidden;
	}

	a {
		display: flex;
		flex-flow: row nowrap;
		column-gap: 8px;
		justify-content: flex-start;
		align-items: center;

		width: 100%;
		height: 100%;

		padding: 8px 16px;

		background-color: var(--font-color);
	}

	a:hover {
		background-color: rgb(var(--primary-color-rgb) / 0.15);
	}

	span img {
		width: 24px;
		border-radius: var(--icon-radius, 50%);
		vertical-align: middle;
	}
</style>
