<script lang="ts">
    import type { PageData } from './$types';
    import Collection from '$lib/components/mhhc/Collection/Collection.svelte';
    export let data: PageData;
</script>

<svelte:head>
    <title>MHHC Archive - Collections</title>
</svelte:head>

<div class="collections">
    {#each data.collections as collection}
        <Collection {collection} />
    {/each}
</div>

<style>
    .collections {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        gap: 40px;
        padding: 40px;

        width: 100%;
        height: 100%;

        overflow: auto;
    }
</style>