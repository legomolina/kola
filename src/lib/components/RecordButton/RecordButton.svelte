<script lang="ts" context="module">
    export type State = 'ready' | 'ready.countdown' | 'recording';
</script>

<script lang="ts">
    import PointerArrow from "../PointerArrow/PointerArrow.svelte";
    import { recordsStore } from '$lib/store/records';

    export let width: number | undefined = undefined;
    export let height: number | undefined = undefined;
    export let audio = true;
    export let frameRate = 60;

    let recorderEl!: HTMLElement;
    let state: State = 'ready';
    let recorder: MediaRecorder;
    let stream: MediaStream;
    let videoChunks = [] as Blob[];
    let timerInterval: ReturnType<typeof setInterval>;
    let timer = 3;

    function handleButtonClick() {
        if (state === 'ready') {
            prepareRecording();
        } else {
            stopRecording();
        }
    }

    async function prepareRecording() {
        try {
            stream = await navigator.mediaDevices.getDisplayMedia({
                video: { width, height, frameRate },
                audio,
                // @ts-expect-error Experimental feature
                selfBrowserSurface: 'exclude',
            });

            stream.addEventListener('inactive', stopRecording);

            await startTimer();
            startRecording();
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    async function startTimer() {
        state = 'ready.countdown';

        return new Promise((resolve) => {
            timerInterval = setInterval(() => {
                timer--;

                if (timer === 0) {
                    clearInterval(timerInterval);
                    resolve(true);
                }
            }, 1000);
        });
    }

    function startRecording() {
        state = 'recording';
        recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
        recorder.start();

        recorder.addEventListener('dataavailable', (event: BlobEvent) => {
            videoChunks.push(event.data);
        });

        recorder.addEventListener('stop', () => {
            downloadRecording(videoChunks);
            videoChunks = [];
        });

        recordsStore.update((state) => ({
            ...state,
            firstTimeRecord: false,
        }));
    }

    function stopRecording() {
        state = 'ready';
        stream.getTracks().forEach((track) => track.stop());
        recorder?.stop();
        clearInterval(timerInterval);
        timer = 3;
    }

    function downloadRecording(videoChunks: Blob[]) {
        const blob = new Blob(videoChunks, { type: 'video/webm;codecs=vp9' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'screen_record.webm';
        a.click();
        a.remove();
    }

    function handleKeyDown(event: KeyboardEvent) {
        switch (event.key) {
        case 'R':
            if (state === 'ready') {
                prepareRecording();
            }
            break;

        case 'S':
            if (state !== 'ready') {
                stopRecording();
            }
            break;
        }
    }
</script>

<svelte:window on:keydown={handleKeyDown} on:keypress={handleKeyDown} on:keyup={handleKeyDown} />

{#if $recordsStore?.firstTimeRecord}
    <PointerArrow referenceEl={recorderEl}>
        Start recording
    </PointerArrow>
{/if}

<div class="recorder" data-state={state}>
    <button class="record" on:click={handleButtonClick} bind:this={recorderEl}>
        <span class="circle">
            {#if state === 'ready.countdown'}
                {timer}
            {/if}
        </span>
    </button>
</div>

<style>
    .recorder {
        position: absolute;
        bottom: 40px;
        z-index: 10;

        display: grid;
        place-content: center;
        width: 100%;

        color: var(--font-color);
        text-align: center;
    }

    .recorder[data-state="ready.countdown"] .circle {
        color: var(--primary-color);
        background-color: var(--font-color);
    }

    .recorder[data-state="recording"] .circle {
        border-radius: 8px;
    }

    .recorder[data-state="recording"] .record {
        border-radius: 8px;
    }

    .record {
        width: 76px;
        height: 76px;
        padding: 4px;

        border: none;
        border-radius: 50%;

        transition: all .6s;
    }

    .circle {
        display: grid;
        place-content: center;

        width: 100%;
        height: 100%;

        border: 6px solid var(--primary-color);
        border-radius: 50%;
        background-color: var(--accent-color);

        font-family: var(--primary-font);
        font-size: 2rem;

        font-weight: 700;
        color: var(--font-color);
        transition: all .6s;
    }

    .circle:hover {
        background-color: color-mix(in srgb, var(--accent-color), white 20%);
    }
</style>