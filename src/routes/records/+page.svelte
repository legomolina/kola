<script lang="ts" context="module">
    declare const window: Window & { chrome: boolean };
</script>

<script lang="ts">
    import { globalStore } from '$lib/store/global';
    import { recordsStore } from '$lib/store/records';
    import { onMount } from 'svelte';
    import PointerArrow from '$lib/components/PointerArrow/PointerArrow.svelte';
    import RecordButton from '$lib/components/RecordButton/RecordButton.svelte';

    globalStore.set({
        animatedBackgroundColor: 'var(--primary-color)',
        staticBackgroundColor: 'var(--primary-color)',
    });

    const offsetPosition = {
        mainAxis: 0,
        crossAxis: 0,
    }

    let anchor!: HTMLElement;
    let isChrome = false;

    onMount(() => {
        isChrome = !!window.chrome;
    })

    function dismissDownloadApp() {
        recordsStore.update((state) => ({
            ...state,
            discardedApp: true,
        }));
    }
</script>

<svelte:head>
    <title>Kola records</title>
</svelte:head>

<div class="anchor" bind:this={anchor}></div>
<!--
{#if isChrome && !($recordsStore?.discardedApp ?? true)}
    <PointerArrow
        arrowRotation="-90deg"
        {offsetPosition}
        placement="bottom-start"
        referenceEl={anchor}
        textPosition="bottom"
        on:click={dismissDownloadApp}
    >
        Install App
    </PointerArrow>
{/if}
-->

<nav class="kola-logo">
    <a href="/">
        <img src="/kola_icon.webp" alt="Kola">
    </a>
</nav>

<main>
    <div class="content">
        <h1>Kola records</h1>
        <h3>The easy way to record your screen</h3>
    </div>

    <RecordButton />
</main>

<style>
    .anchor {
        position: fixed;
        top: 10px;
        right: 20vw;
    }

    .kola-logo {
        position: absolute;
        top: 20px;
        left: 20px;

        width: 56px;
        height: 56px;
    }

    .kola-logo img {
        max-width: 100%;

        view-transition-name: kola-logo;
    }

    main {
        width: 100%;
        height: 100%;

        /*background-color: var(--primary-color);*/
    }

    .content {
        display: grid;
        place-content: center;

        width: 100%;
        height: 100%;
    }

    h1, h3 {
        margin: 0;

        text-align: center;
        color: var(--font-color);
        font-family: var(--kola-font);
        font-size: max(3vw, 3em);
    }

    h3 {
        font-size: 1.3em;
    }
</style>