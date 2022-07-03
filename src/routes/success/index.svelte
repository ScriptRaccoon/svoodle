<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    const id = $page.url.searchParams.get("id");
    let url = "";
    let message = "";
    onMount(() => {
        url = `${window.location.origin}/svoodle/${id}`;
    });

    async function copyURL() {
        await navigator.clipboard.writeText(url);
        message = "Copied to clipboard!";
        setTimeout(() => {
            message = "";
        }, 2000);
    }
</script>

<svelte:head>
    <title>Svoodle | Created</title>
</svelte:head>

<section class="container">
    <h2>Svoodle created</h2>

    {#if url}
        <p class="url">
            Your Svoodle URL is <a href={url}>{url}</a>
        </p>

        <button class="button" on:click={copyURL}
            >Copy to clipboard</button
        >

        <p class="message">{message}</p>
    {/if}
</section>

<style>
    .url {
        margin: 20px 0px;
        word-wrap: break-word;
    }
    .message {
        margin: 5px 0px;
        font-size: 14px;
    }
</style>
