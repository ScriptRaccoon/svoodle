import { db } from "$lib/firebase.js";
import { purge } from "$lib/purge.js";
import {
    addDoc,
    collection,
    serverTimestamp,
} from "firebase/firestore";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
    purge();
    const { options, title, description } = await request.json();
    if (!title) {
        return {
            status: 400,
            body: { error: "No title provided" },
        };
    }
    if (options.length == 0) {
        return {
            status: 400,
            body: { error: "No options provided" },
        };
    }
    if (options.some((option) => option.length == 0)) {
        return {
            status: 400,
            body: { error: "Empty options are not allowed" },
        };
    }
    if (new Set(options).size < options.length) {
        return {
            status: 400,
            body: { error: "Duplicate options are not allowed" },
        };
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
        return {
            status: 200,
            body: { id },
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            body: { error: "Could not create the svoodle" },
        };
    }
}
