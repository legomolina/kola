<script lang='ts'>
    import menuIcon from '../../../assets/icons/menu.png';
    import MenuList from '$lib/components/Menu/MenuList.svelte';
    import MenuListItem from '$lib/components/Menu/MenuListItem.svelte';
    import { computePosition, offset } from '@floating-ui/dom';

    let navEl!: HTMLElement;
    let listEl!: HTMLElement;
    let menuPosition = { x: '0px', y: '0px' };
    let menuVisible = false;

    $: if (navEl && listEl) {
        computePosition(navEl, listEl, {
            placement: 'bottom-start',
            middleware: [
                offset(8),
            ],
        }).then(({ x, y }) => {
            menuPosition = {
                x: x + 'px',
                y: y + 'px',
            };
        });
    }

    function toggleMenu() {
        menuVisible = !menuVisible;
    }

    function handleMenuClose() {
        menuVisible = false;
    }
</script>

<button bind:this={navEl} on:click={toggleMenu}>
	<span class='icon'>
		<img alt='menu' src={menuIcon} />
	</span>
</button>

<MenuList
    bind:listEl
    --top={menuPosition.y}
    --left={menuPosition.x}
    excludedEls={[navEl]}
    visible={menuVisible}
    on:close={handleMenuClose}
>
    <!--<MenuListItem href='/kola-records' src='/kola_records_icon.webp' text='Kola records' />-->
    <MenuListItem href='https://github.com/legomolina/kola' src='/github_icon.webp' text='Github' />
</MenuList>

<style>
    button {
        display: flex;
        align-items: center;
        width: 48px;
        height: 48px;
        padding: 8px;

        border: none;
        border-radius: 8px;
        outline: none;

        appearance: none;
        background-color: var(--font-color);
    }

    .icon {
        width: 32px;
        height: 32px;
    }

    .icon img {
        max-width: 100%;
        /* Make rgb(36 36 36) color */
        filter: invert(1) brightness(14%);
    }
</style>
