import { db } from "$lib/firebase.js";
import { getDoc, doc } from "firebase/firestore";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
    const { id } = params;
    try {
        const docRef = doc(db, "svoodles", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const { title, description, options, votes, created } =
                docSnap.data();
            const date = created
                .toDate()
                .toISOString()
                .split("T")[0]
                .split("-")
                .reverse()
                .join(".");
            const counts = options.map(
                (_, index) =>
                    votes.filter(
                        (vote) => vote.choices[index] == true
                    ).length
            );
            return {
                status: 200,
                body: {
                    id,
                    title,
                    description,
                    options,
                    votes,
                    counts,
                    date,
                },
            };
        } else {
            return {
                status: 404,
            };
        }
    } catch (err) {
        console.log(err);
        return {
            status: 500,
        };
    }
}
