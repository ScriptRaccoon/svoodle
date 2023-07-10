<script lang="ts">
	export let data;

	const { id, title, description, options, votes, counts, date } =
		data;

	let error = "";

	let yourName = "";
	let yourChoices = new Array(options.length).fill(false);

	async function submitVote() {
		const res = await fetch(`/api/vote`, {
			method: "POST",
			body: JSON.stringify({
				id: id,
				name: yourName,
				choices: yourChoices,
			}),
		});
		const data = await res.json();
		if (res.ok) {
			error = "";
			window.location.reload();
		} else {
			error = data.message;
		}
	}
</script>

<svelte:head>
	<title>Svoodle | {title}</title>
</svelte:head>

<section>
	<h2>{title}</h2>

	<p class="date">
		<small>
			created {date}
		</small>
	</p>

	{#if description}
		<p class="description">
			<small>
				{description}
			</small>
		</p>
	{/if}

	<table>
		<thead>
			<tr>
				<td />
				{#each options as option, index}
					<td class="option">
						{option}
						<span class="count">
							{counts[index]}
							{counts[index] == 1 ? "vote" : "votes"}
						</span>
					</td>
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each votes as { name, choices }}
				<tr>
					<td>{name}</td>
					{#each options as _, index}
						<td
							class="choice {choices[index].toString()}"
						>
							<i
								class={choices[index]
									? "fa-solid fa-check"
									: "fa-solid fa-xmark"}
							/>
						</td>
					{/each}
				</tr>
			{/each}

			<tr>
				<td>
					<input
						type="text"
						bind:value={yourName}
						placeholder="Your name"
					/>
				</td>
				{#each options as _, index}
					<td>
						<input
							type="checkbox"
							bind:checked={yourChoices[index]}
						/>
					</td>
				{/each}
			</tr>
		</tbody>
	</table>

	<button class="button" on:click={submitVote}>Submit</button>

	{#if error}
		<p class="error">
			{error}
		</p>
	{/if}
</section>

<style>
	.date {
		color: var(--gray-color);
	}

	.description {
		margin-top: 20px;
		white-space: pre-line;
	}

	table {
		border-collapse: collapse;
		margin: 20px 0px;
	}

	thead {
		font-weight: bold;
	}

	input[type="text"] {
		width: 100px;
	}

	tbody > tr:last-child > td {
		padding-top: 10px;
	}

	td:not(:first-child) {
		text-align: center;
		padding: 6px 10px;
		border-left: 1px solid var(--light-color);
	}

	td:first-child {
		padding-inline: 0px 10px;
	}

	.option {
		white-space: nowrap;
	}

	.count {
		display: block;
		color: var(--gray-color);
		font-size: 14px;
	}

	.choice {
		font-size: 20px;
	}

	.choice.true {
		color: var(--success-color);
	}

	.choice.false {
		color: var(--error-color);
	}
</style>
