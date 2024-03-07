<script lang="ts">
    import { globalStore } from '$lib/store/global';

    globalStore.set({
        animatedBackgroundColor: 'var(--mhhc-primary-color)',
        staticBackgroundColor: 'var(--mhhc-primary-color)',
    });
</script>

<svelte:head>
    <link rel="icon" type="image/webp" href="/mhhc_icon.webp" />
</svelte:head>

<slot/>