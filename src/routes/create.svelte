<script>
    let title = "";
    let description = "";
    let options = [];
    let nextOption = "";
    let inputElement = null;
    let error = "";

    function addOption() {
        if (nextOption == "") return;
        options = [...options, nextOption];
        nextOption = "";
        inputElement.focus();
    }

    function removeOption(index) {
        options.splice(index, 1);
        options = options;
    }

    async function createSvoodle() {
        const res = await fetch("/api/create", {
            method: "POST",
            body: JSON.stringify({ title, description, options }),
        });
        const data = await res.json();
        if (res.ok) {
            const { id } = data;
            window.location.href = `/success?id=${id}`;
        } else {
            error = data.error;
        }
    }
</script>

<svelte:head>
    <title>Svoodle | Create</title>
</svelte:head>

<section class="container">
    <h2>Create a Svoodle</h2>

    <div class="group">
        <label for="title"> Title </label>
        <input id="title" type="text" bind:value={title} required />
    </div>

    <div class="group">
        <label for="description"
            >Description <small>(optional)</small></label
        >

        <textarea id="description" bind:value={description} />
    </div>

    <form class="group" on:submit|preventDefault={addOption}>
        <label for="next">Add an option</label>
        <input
            id="next"
            bind:this={inputElement}
            type="text"
            bind:value={nextOption}
        />
        <button type="submit" class="control">
            <i class="fa-solid fa-plus" />
        </button>
    </form>

    {#if options.length > 0}
        <ul>
            {#each options as option, index}
                <li>
                    <span class="option">
                        {option}
                    </span>
                    <button
                        class="control"
                        type="button"
                        on:click={() => removeOption(index)}
                    >
                        <i class="fa-solid fa-xmark" />
                    </button>
                </li>
            {/each}
        </ul>
    {/if}

    <div class="group">
        <button class="button" on:click={createSvoodle}
            >Create Svoodle</button
        >
    </div>

    {#if error}
        <p class="error">
            {error}
        </p>
    {/if}
</section>

<style>
    label {
        display: block;
        margin-bottom: 4px;
    }
    .group {
        margin: 25px 0px;
    }
    .option {
        background-color: var(--gray-color);
        color: white;
        padding: 6px 14px;
        border-radius: 8px;
    }
    li {
        margin: 14px 0px;
    }
    input,
    textarea {
        width: 90%;
    }
    textarea {
        resize: vertical;
    }
</style>
