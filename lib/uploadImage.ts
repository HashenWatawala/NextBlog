import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadPostImage(file: File, folder: string, fileName: string) {
    const fileExt = file.name.split(".").pop() || "jpg";
    const storageRef = ref(storage, `${folder}/${fileName}.${fileExt}`);

    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
}
