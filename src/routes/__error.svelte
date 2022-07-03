<script context="module">
    export function load({ error, status }) {
        return {
            props: {
                title: `${status}: ${error.message}`,
            },
        };
    }
</script>

<script>
    export let title;
</script>

<section class="container centered">
    <h2>Something went wrong</h2>

    <img
        alt="confused man"
        src="https://media.giphy.com/media/3oz8xZvvOZRmKay4xy/giphy.gif"
    />

    <p class="error">{title}</p>
</section>

<style>
    img {
        display: block;
        max-width: 100%;
        margin: 20px 0px;
    }
</style>
