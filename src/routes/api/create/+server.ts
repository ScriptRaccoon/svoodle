import { db } from "$lib/firebase";
import { purge } from "$lib/purge";
import {
	addDoc,
	collection,
	serverTimestamp,
} from "firebase/firestore";

import { json, error } from "@sveltejs/kit";

export const POST = async (event) => {
	purge();

	const body = await event.request.json();
	const { options, title, description } = body as svoodleSubmission;

	if (!title) {
		throw error(400, "No title provided");
	}

	if (options.length == 0) {
		throw error(400, "No options provided");
	}

	if (options.some((option) => option.length == 0)) {
		throw error(400, "Empty options are not allowed");
	}

	if (new Set(options).size < options.length) {
		throw error(400, "Duplicate options are not allowed");
	}

	try {
		const docRef = await addDoc(collection(db, "svoodles"), {
			title,
			options,
			description,
			votes: [],
			created: serverTimestamp(),
		});
		const id = docRef.id;
		return json({ id });
	} catch (err) {
		console.log(err);
		throw error(500, "Could not create the svoodle");
	}
};
