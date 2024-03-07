<script lang="ts">
    import type { PageData } from './$types';
    import chevronLeft from '@assets/icons/chevron-left.png';
    import CardDialog from '$lib/components/mhhc/CardDialog/CardDialog.svelte';

    function goBack() {
        window.history.back();
    }

    export let data: PageData;

    let isDialogOpen = false;
    let selectedIndex = 0;

    function openLarge(index: number) {
        isDialogOpen = true;
        selectedIndex = index;
    }
</script>

<svelte:head>
    <title>MHHC Archive - {data.collection}</title>
</svelte:head>

<div class="container">
    <header>
        <button on:click={goBack}>
            <img src={chevronLeft} alt="Back">
        </button>
        <h1>Collection id {data.collection}</h1>
    </header>

    <div class="cards-grid">
        {#each data.cards as card, index}
            <div role="button" tabindex="0" on:click={() => openLarge(index)} on:keydown>
                <figure>
                    <img alt={card.name} loading="lazy" src={card.smallUrl}>
                    <figcaption>{card.name}</figcaption>
                </figure>
            </div>
        {/each}
    </div>
</div>

<CardDialog cards={data.cards} {selectedIndex} bind:isOpen={isDialogOpen}></CardDialog>

<style>
    .container {
        display: flex;
        flex-flow: column nowrap;
        height: 100%;
    }

    header {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        column-gap: 20px;

        height: 80px;
        padding: 0 30px;
    }

    header button {
        display: flex;
        align-items: center;
        width: 36px;
        height: 36px;

        border: none;
        border-radius: 8px;
        outline: none;

        background-color: transparent;
        appearance: none;
        cursor: pointer;
    }

    header button:hover {
        background-color: color-mix(in srgb, var(--font-color), transparent 85%);
    }

    button img {
        max-width: 100%;
        filter: invert(1);
    }

    h1 {
        margin: 0;

        font-size: 1.3em;
        color: var(--font-color);
    }

    .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        justify-items: center;
        gap: 20px;
        padding: 40px;

        flex: 1;

        overflow: auto;
    }

    .cards-grid > div {
        cursor: pointer;
    }

    figure {
        margin: 0;
    }

    figure figcaption {
        color: var(--font-color);
    }

    figure img {
        max-width: 100%;
    }
</style>