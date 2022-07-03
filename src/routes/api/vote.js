import { db } from "$lib/firebase.js";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
    const { id, name, choices } = await request.json();
    if (!name) {
        return {
            status: 400,
            body: {
                error: "No name provided",
            },
        };
    }
    const docRef = doc(db, "svoodles", id);
    try {
        await updateDoc(docRef, {
            votes: arrayUnion({ name, choices }),
        });
        return {
            status: 200,
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            body: {
                error: "Could not create vote",
            },
        };
    }
}
