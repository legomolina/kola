<script lang="ts">
    import type { CollectionModel } from '@domain/mhhc-archive/models/collection.model';

    export let collection: CollectionModel;
</script>

<article>
    <header>
        <div>
            <h1>{collection.name}</h1>
            {#if collection.releaseDate}
                <h5>Released on {collection.releaseDate.toLocaleDateString('en-US')}</h5>
            {/if}
        </div>

        <a href={`./mhhc-archive/${collection.name}`}>View all</a>
    </header>

    <div class="cards-container">
        {#each collection.coverCards as card}
            <div class="card">
                <img src={card.smallUrl} alt={card.name} loading="lazy">
            </div>
        {/each}
    </div>

    <span class="cards-count">
        Total cards in collection: {collection.cards.length}
    </span>
</article>

<style>
    article {
        display: flex;
        flex-flow: column nowrap;

        height: 450px;

        padding: 16px 24px;

        border-radius: 16px;
        background-color: #17141d;
        box-shadow: -1rem 0 3rem #000;

        color: var(--font-color);
    }

    header {
        position: relative;

        display: flex;
        flex-flow: row nowrap;
        align-items: flex-start;

        gap: 10px;
        margin-bottom: 40px;
    }

    h1, h5 {
        margin: 0;
        font-weight: normal;
    }

    header a {
        display: block;
        padding: 7px 14px;
        margin-left: auto;

        border: 2px solid color-mix(in srgb, var(--font-color), transparent 85%);
        border-radius: 8px;
        outline: none;

        background: transparent;

        font: var(--primary-font);
        color: var(--font-color);
    }

    header a:hover {
        background-color: color-mix(in srgb, var(--font-color), transparent 85%);
    }

    .cards-container {
        position: relative;

        display: flex;
        flex-flow: row nowrap;

        margin: auto 0;
    }

    .card {
        position: relative;
        width: 160px;
        min-height: 200px;

        border-radius: 8px;
        overflow: hidden;

        box-shadow: -1rem 0 3rem #000;
        filter: grayscale(.6);

        transition: all .1s linear;
    }

    .card:hover {
        background-color: transparent;
        filter: grayscale(0);
        transform: translateY(-20px);
    }

    .card:not(:first-child) {
        margin-left: -60px;
    }

    .card > img {
        max-width: 100%;
    }

    .cards-count {
        display: block;
        margin-top: 20px;

        font-size: .8em;
    }
</style>