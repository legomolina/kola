<script lang="ts">
    import arrowImage from '../../../assets/images/arrow.webp';
    import { computePosition, offset, type OffsetOptions, type Placement, shift } from "@floating-ui/dom";
    import { fade } from 'svelte/transition';

    export let arrowRotation = '0deg';
    export let offsetPosition: OffsetOptions = {
        mainAxis: -10,
        crossAxis: -60,
    }
    export let placement: Placement = 'left-start';
    export let referenceEl: HTMLElement;
    export let textPosition: 'top' | 'bottom' = 'top';

    let containerEl!: HTMLElement;
    let computedX = '0';
    let computedY = '0';

    $: if (referenceEl && containerEl) {
        calculatePosition();
    }

    function calculatePosition() {
        computePosition(referenceEl, containerEl, {
            placement,
            strategy: 'fixed',
            middleware: [
                shift({
                    mainAxis: true,
                    crossAxis: true,
                }),
                offset(offsetPosition),
            ],
        })
            .then(({ x, y }) => {
                computedX = x + 'px';
                computedY = y + 'px';
            });
    }
</script>

<svelte:window on:resize={calculatePosition}/>

<div
        transition:fade
        bind:this={containerEl}
        class="container"
        style:--rotation={arrowRotation}
        style:--x={computedX}
        style:--y={computedY}
        on:click
        on:keydown
        role="button"
        tabindex="0"
>
    <span class:textBottom={textPosition === 'bottom'}>
        <slot/>
    </span>

    <div class="arrow">
        <img alt="Pointer" src={arrowImage}/>
    </div>
</div>

<style>
    .container {
        position: fixed;
        top: var(--y, 0);
        left: var(--x, 0);

        display: flex;
        width: max-content;

        animation: pulse 1s ease-in-out infinite;
    }

    span {
        font-family: var(--kola-font);
        color: var(--font-color);
    }

    span.textBottom {
        margin-top: auto;
    }

    .arrow {
        width: 64px;
        height: 64px;

        transform: rotate(var(--rotation));
    }

    .arrow img {
        max-width: 100%;
    }

    @keyframes pulse {
        from {
            transform: scale3d(1, 1, 1);
        }

        50% {
            transform: scale3d(1.1, 1.1, 1.1);
        }

        to {
            transform: scale3d(1, 1, 1);
        }
    }
</style>