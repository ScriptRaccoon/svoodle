import { db } from "$lib/firebase.js";
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
        snap.forEach(async (doc) => {
            console.log(`delete ${doc.id}`);
            await deleteDoc(doc.ref);
        });
    } catch (err) {
        console.log(err);
    }
}
