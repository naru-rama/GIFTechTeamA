import { collection, getDocs, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import db from "../utils/firebase";

// himaActions.js または適切な場所に配置
export const getAllHimaItems = async () => {
    console.log("Getting data from himaItem actions");
    const snap = await getDocs(collection(db, "himaItems"));
    const items = [];
    snap.forEach((doc) => {
        items.push({
            id: doc.id,
            name: doc.data().name,
            doneCount: doc.data().doneCount
        });
    });
    return items;
};


export const addHimaItem = async (name) => {
    console.log("Adding data from hima actions");
    const timestamp = Date.now().toString(16);
    const randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
    const docRef = await addDoc(collection(db, "himaItems"), {
        id: randomHex,
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