import { db } from "$lib/firebase";
import {
	collection,
	query,
	where,
	getDocs,
	deleteDoc,
} from "firebase/firestore";

export async function purge() {
	console.log("purge old svoodles");
	const now_ms = new Date().getTime();
	const thirtyDaysAgo = new Date(now_ms - 1000 * 60 * 60 * 24 * 30);

	const oldSvoodles = query(
		collection(db, "svoodles"),
		where("created", "<=", thirtyDaysAgo)
	);

	try {
		const snap = await getDocs(oldSvoodles);

		snap.forEach((doc) => {
			deleteDocument(doc);
		});
	} catch (err) {
		console.log(err);
	}
}

async function deleteDocument(doc: any) {
	console.log(`delete ${doc.id}`);
	await deleteDoc(doc.ref);
}
