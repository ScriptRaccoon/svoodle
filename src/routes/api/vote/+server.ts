import { db } from "$lib/firebase.js";
import { error, json } from "@sveltejs/kit";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export const POST = async (event) => {
	const { id, name, choices } =
		(await event.request.json()) as voteSubmission;

	if (!name) {
		throw error(400, "No name provided");
	}

	const docRef = doc(db, "svoodles", id);
	try {
		await updateDoc(docRef, {
			votes: arrayUnion({ name, choices }),
		});
		return json("");
	} catch (err) {
		console.log(err);
		throw error(500, "Could not create vote");
	}
};
