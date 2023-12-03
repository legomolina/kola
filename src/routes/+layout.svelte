<script lang="ts">
	import '../styles/app.css';
	import { onNavigate } from '$app/navigation';
	import { globalStore } from '$lib/store/global';
	import { onMount } from 'svelte';
	import { recordsStore } from '$lib/store/records';
	import { loadFromLocalStorage } from '$lib/utils/manageLocalStorage';

	onMount(() => {
	    recordsStore.set(loadFromLocalStorage().records);
	});

	onNavigate((navigation) => {
	    if (!document.startViewTransition) {
	        return;
	    }

	    return new Promise((resolve) => {
	        document.startViewTransition(async () => {
	            resolve();
	            await navigation.complete;
	        });
	    });
	});
</script>

<div class="layout-container">
	<div class="static-background" style:background-color={$globalStore.staticBackgroundColor}></div>
	<div class="animated-background" style:background-color={$globalStore.animatedBackgroundColor}></div>
	<div class="layout-content">
		<slot />
	</div>
</div>

<style>
	:root::view-transition-old(animated-background),
	:root::view-transition-new(animated-background) {
		animation: expandAnimation .7s;
	}

	:root::view-transition-old(static-background),
	:root::view-transition-new(static-background) {
		animation-duration: 0s;
		animation-delay: .69s;
	}

	:root::view-transition-old(static-content) {
		animation: fadeOut both .5s;
	}

	:root::view-transition-new(static-content) {
		animation: fadeIn both .5s;
	}

	.layout-container {
		position: relative;

		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.layout-container .static-background {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;

		width: 100%;
		height: 100%;

		view-transition-name: static-background;
	}

	.layout-container .animated-background {
		position: absolute;
		top: 50px;
		left: 50px;
		z-index: 5;

		width: 56px;
		height: 56px;

		border-radius: 50%;

		transform: scale(1);
		transform-origin: center;
		transition: transform 1s;
		overflow: hidden;

		view-transition-name: animated-background;
	}

	.layout-container .layout-content {
		position: relative;
		z-index: 10;

		width: 100%;
		height: 100%;

		view-transition-name: static-content;
	}

	@keyframes expandAnimation {
		from {
			transform: scale3d(1, 1, 1);
		}

		to {
			transform: scale3d(100, 100, 1);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}
</style>
