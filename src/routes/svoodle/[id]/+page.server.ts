import { db } from "$lib/firebase.js";
import { error } from "@sveltejs/kit";
import { getDoc, doc } from "firebase/firestore";

export const load = async (event) => {
	const id = event.params.id;
	try {
		const docRef = doc(db, "svoodles", id);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			throw error(404);
		}

		const { title, description, options, votes, created } =
			docSnap.data() as svoodleData;

		const date = created
			.toDate()
			.toISOString()
			.split("T")[0]
			.split("-")
			.reverse()
			.join(".");

		const counts = options.map(
			(_, index) =>
				votes.filter((vote) => vote.choices[index]).length
		);

		return {
			id,
			title,
			description,
			options,
			votes,
			counts,
			date,
		};
	} catch (err) {
		console.log(err);
		throw error(500);
	}
};
