import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
	collection,
	doc,
	setDoc,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";

const useStorage = (file) => {
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState(null);
	const [url, setUrl] = useState(null);

	useEffect(() => {
		// create reference
		console.log(projectStorage);
		const storageRef = ref(projectStorage, file.name);
		console.log(storageRef);

		const collectionRef = collection(projectFirestore, "images");

		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				let percentage =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + percentage + "% done");
				setProgress(percentage);
			},
			(err) => {
				setError(err);
			},
			() => {
				const createAt = serverTimestamp();

				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					console.log("URL: " + url);
					addDoc(collectionRef, {
						createAt,
						url: url,
					});
					setUrl(url);
				});
			}
		);
	}, [file]);

	return { progress, url, error };
};

export default useStorage;
