import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const useFirestore = (collect) => {
	const [docs, setDocs] = useState([]);

	useEffect(() => {
		const q = query(
			collection(projectFirestore, collect),
			orderBy("createAt", "desc")
		);
		const unsub = onSnapshot(q, (snap) => {
			let documents = [];
			snap.forEach((doc) => {
				documents.push({ ...doc.data(), id: doc.id });
			});
			setDocs(documents);
		});

		return () => unsub();
	}, [collection]);

	return { docs };
};

export default useFirestore;
