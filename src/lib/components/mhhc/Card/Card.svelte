<script lang="ts">
	export let name: string;
	export let url: string;
</script>

<div class="card">
	{#if url}
		<img src={url} alt={name} />
	{/if}
</div>

<style>
	.card {
		position: relative;
		left: 0;

		width: 180px;

		overflow: hidden;
		border-radius: 12px;

		box-shadow: -1rem 0 3rem #000;

		transition: all 0.2s ease-out;
	}

	.card:hover {
		transform: translateY(-20px);
	}

	.card img {
		max-width: 100%;
	}
</style>
