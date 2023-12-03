<script lang="ts">
	import Menu from '$lib/components/Menu/Menu.svelte';
	import { globalStore } from '$lib/store/global';

	globalStore.set({
	    animatedBackgroundColor: 'var(--accent-color)',
	    staticBackgroundColor: 'var(--accent-color)',
	});
</script>

<svelte:head>
    <title>Kola</title>
</svelte:head>

<nav>
    <Menu />
</nav>

<main>
	<div class="content">
		<div class="image-container">
			<img src="/kola_icon.webp" alt="Kola" />
		</div>
	</div>
</main>

<footer>
    Created and designed by legomolina.
</footer>

<style>
	main {
		width: 100%;
		height: 100%;
	}

	nav {
		position: absolute;
		top: 20px;
		left: 20px;
	}

	.content {
		display: grid;
		place-content: center;

		width: 100%;
		height: 100%;
	}

	.image-container {
        width: max(10em, min(50vw, 30em));
        aspect-ratio: 1 / 1;
	}

	.image-container img {
		max-width: 100%;

        view-transition-name: kola-logo;
	}

    footer {
        position: fixed;
        bottom: 20px;
        left: 0;

        width: 100%;
        padding: 0 20px;

        text-align: end;
        color: var(--font-color);
        font-size: .5em;
    }
</style>
