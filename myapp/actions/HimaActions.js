import { collection, getDocs, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import db from "../utils/firebase";

export const getData = async () => {
    console.log("Getting data from hima actions");
    const snap = await getDocs(collection(db, "ramen"));
    snap.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().name}`);
    });
}

export const getAllHimaItems = async () => {
    console.log("Getting data from himaItem actions");
    console.log(new Date());
    const snap = await getDocs(collection(db, "himaItems"));
    snap.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().name}, ${doc.data().doneCount}`);
    });
}

export const addHimaItem = async (name) => {
    console.log("Adding data from hima actions");
    const docRef = await addDoc(collection(db, "himaItems"), {
        name: name,
        doneCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
}

export const completeHimaItem = async (id) => {
    console.log("Completing data from hima actions");
    const ref = doc(db, "himaItems", id);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
        console.log("No such document!");
        return;
    }
    const doneCount = snap.data().doneCount;
    console.log(doneCount);
    await updateDoc(ref, {
        doneCount: doneCount + 1,
        updatedAt: new Date()
    });
    console.log("completed");
}

// 多分使わない
// export const updateHimaItem = async (id, name) => {
//     console.log("Updating data from hima actions");
//     const ref = doc(db, "himaItems", id);
//     await updateDoc(ref, {
//         name: name,
//         updatedAt: new Date()
//     });
//     console.log("updated");
// }