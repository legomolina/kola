<script lang="ts">
    import { slide } from 'svelte/transition';
    import { clickOutside } from '$lib/actions/click-outside';
    import { menuStore } from '$lib/components/Menu/menu-store';

    export let excludedEls: HTMLElement[];
    export let listEl!: HTMLElement;

    function handleClickOutside() {
        menuStore.set({ visible: false });
    }
</script>

{#if $menuStore.visible}
    <ul
        transition:slide={{ duration: 300 }}
        bind:this={listEl}
        use:clickOutside={{ exclude: excludedEls }}
        on:clickoutside={handleClickOutside}
    >
        <slot />
    </ul>
{/if}

<style>
	ul {
        position: absolute;
        top: var(--top, 0);
        left: var(--left, 0);

        width: max-content;
		margin: 0;
		padding: 0;

		background-color: var(--font-color);
		border-radius: 8px;
		box-shadow: 0 4px 6px 4px rgb(36 36 36 / 0.3);

		list-style: none;
        overflow: hidden;
	}
</style>
