<script lang="ts">
    import type { CardModel } from '@domain/mhhc-archive/models/card.model';
    import { fade } from 'svelte/transition';
    import close from '@assets/icons/close.png';
    import chevronLeft from '@assets/icons/chevron-left.png';
    import chevronRight from '@assets/icons/chevron-right.png';

    export let isOpen = false;
    export let cards: CardModel[];
    export let selectedIndex: number;

    function loadPreviousCard() {
        if (selectedIndex > 0) {
            selectedIndex -= 1;
        }
    }

    function loadNextCard() {
        if (selectedIndex < cards.length - 1) {
            selectedIndex += 1;
        }
    }

    function onWindowKeyDown(event: KeyboardEvent) {
        if (isOpen && event.key === 'Escape') {
            closeDialog();
        }
    }

    function closeDialog() {
        isOpen = false;
    }
</script>

<svelte:window on:keydown={onWindowKeyDown}></svelte:window>

{#if isOpen}
    <div class="dialog" transition:fade={{ duration: 250 }}>
        <div class="backdrop"></div>

        <div class="arrow prev" class:disabled={selectedIndex <= 0} role="button" tabindex="0" on:click={loadPreviousCard} on:keydown>
            <img src={chevronLeft} alt="See previous image">
        </div>

        <div class="container">
            <a href={cards[selectedIndex].githubUrl} target="_blank" title="See original">
                <img src={cards[selectedIndex].largeUrl} alt={cards[selectedIndex].name}>
            </a>
        </div>

        <button class="close-button" on:click={closeDialog} on:keydown>
            <img src={close} alt="Close modal">
        </button>

        <div class="arrow next" class:disabled={selectedIndex > cards.length - 2} role="button" tabindex="0" on:click={loadNextCard} on:keydown>
            <img src={chevronRight} alt="See next image">
        </div>
    </div>
{/if}

<style>
    .dialog {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 20px;

        width: 100dvw;
        height: 100dvh;
    }

    .backdrop {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 50;

        width: 100%;
        height: 100%;

        background-color: color-mix(in srgb, var(--mhhc-primary-color), transparent 45%);
    }

    .arrow {
        position: relative;
        z-index: 90;

        display: flex;
        align-items: center;
        width: 150px;
        height: 100%;

        flex-shrink: 0;
        opacity: .50;
        transition: opacity .25s ease-in-out;
        cursor: pointer;
        user-select: none;
    }

    .arrow:hover {
        opacity: 1;
    }

    .arrow.disabled {
        cursor: default;
        opacity: 0;
    }

    .arrow.disabled > img {
        opacity: 0;
    }

    .arrow.prev {
        justify-content: flex-start;
        background: linear-gradient(90deg, rgba(0,0,0,0.7) 49%, rgba(0,0,0,0) 100%);
    }

    .arrow.next {
        justify-content: flex-end;
        background: linear-gradient(-90deg, rgba(0,0,0,0.7) 49%, rgba(0,0,0,0) 100%);
    }

    .arrow > img {
        filter: brightness(100%) invert(1);
    }

    .container {
        position: relative;
        z-index: 150;

        width: 480px;
        max-width: 100%;
        height: fit-content;

        margin: 0 auto;
        border-radius: 10px;

        overflow: hidden;
        background-color: white;
    }

    .close-button {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 100;

        display: flex;
        justify-content: flex-end;
        width: 150px;
        height: 150px;
        padding: 0;

        border: none;
        outline: none;
        background: transparent;

        opacity: .50;
        transition: opacity .25s ease-in-out;
        appearance: none;
        cursor: pointer;
        user-select: none;
    }

    .close-button:hover {
        opacity: 1;
    }

    .close-button:hover + .arrow.next {
        opacity: 1;
    }

    .close-button img {
        width: 64px;
        height: 64px;
        padding: 20px;
        filter: brightness(100%) invert(1);
    }

    .container img {
        max-width: 100%;
    }

    @media only screen and (width <= 972px) {
        .arrow {
            width: 75px;
        }

        .close-button {
            width: 75px;
            height: 75px;
        }
    }
</style>
