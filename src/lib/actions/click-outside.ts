import type { ActionReturn } from 'svelte/action';

export type Options = {
    exclude: Node[];
}

export function clickOutside(node: Node, { exclude }: Options): ActionReturn<Options> {
    let excludedNodes = exclude;

    const handleClick = (event: MouseEvent) => {
        if (node && (!node.contains(event.target as HTMLElement) && !excludedNodes.some((excludedNode) => excludedNode === event.target || excludedNode.contains(event.target as HTMLElement))) && !event.defaultPrevented) {
            node.dispatchEvent(new Event('clickoutside'));
        }
    }

    document.addEventListener('click', handleClick);

    return {
        destroy(){
            document.removeEventListener('click', handleClick);
        },
        update(updatedOptions) {
            excludedNodes = updatedOptions.exclude;
        }
    }
}