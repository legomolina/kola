<script lang="ts">
    import { globalStore } from '$lib/store/global';

    globalStore.set({
        animatedBackgroundColor: 'var(--mhhc-primary-color)',
        staticBackgroundColor: 'var(--mhhc-primary-color)',
    });
</script>

<slot/>