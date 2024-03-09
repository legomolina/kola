<script lang="ts">
    import type { PageData } from './$types';
    import Collection from '$lib/components/mhhc/Collection/Collection.svelte';

    export let data: PageData;
</script>

<svelte:head>
    <title>MHHC Archive - Collections</title>
</svelte:head>

<div class="container">
    <header>
        <h1>Monster Hunter Hunting Card Collection</h1>

        <a class="mhhc-github-link" href="https://github.com/GrenderG/MHHC_Archive" target="_blank" title="MHHC github repo">
            <img src="/github_icon.webp" alt="Github repo">
        </a>
    </header>

    <div class="collections">
        {#each data.collections as collection}
            <Collection {collection} />
        {/each}
    </div>

    <footer>
        <div>This is a non-profit open-source preservation project. All rights belong to Capcom.</div>

        <div class="right-side">
            <span>Site by <a href="https://x.com/legomolina" target="_blank">@legomolina</a>, check other projects at <a href="https://kola.es" target="_blank">kola.es</a>.</span>
            <br>
            <span>Scans done by <a href="https://x.com/GrenderG" target="_blank">@GrenderG</a> and <a href="https://x.com/taiko_no_ossan" target="_blank">@taiko_no_ossan</a>.</span>
        </div>
    </footer>
</div>

<style>
    .container {
        overflow: auto;
        height: 100%;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 120px;
        padding-inline: 80px;
    }

    h1 {
        margin: 0;
        padding: 0;

        font-size: 1.75em;
        color: var(--font-color);
    }

    .mhhc-github-link {
        width: 36px;
        border-radius: 50%;
        opacity: .75;
        vertical-align: middle;
        transition: opacity .25s ease-in-out;
    }

    .mhhc-github-link:hover {
        opacity: 1;
    }

    .mhhc-github-link > img {
        max-width: 100%;
        filter: brightness(100%) invert(1);
    }

    .collections {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        gap: 40px;
        padding-inline: 40px;

        width: 100%;
    }

    footer {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        margin-top: 80px;
        padding: 20px;

        color: color-mix(in srgb, var(--font-color), transparent 25%);
        font-size: .9em;
        box-shadow: 0 0 4px -1px color-mix(in srgb, var(--mhhc-primary-color), white 30%);
    }

    footer .right-side {
        text-align: right;
        line-height: 1.5;
    }

    footer a {
        color: var(--mhhc-accent-color);
        text-decoration: underline;
    }
</style>