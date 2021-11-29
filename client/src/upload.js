import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "./firebase";

export default function upload(image, model, directoryName) {
    return new Promise((resolve, reject) => {
        const fileName = image.file.name + "_" + Date.now();
        const storage = getStorage(app);
        const storageRef = ref(storage, `${directoryName}/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, image.file);
    
        uploadTask.on('state_changed', 
            (snapshot) => {                    
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default:
                    break;
                }
            }, 
            (error) => {
                console.log(error);
                reject(error);
            }, 
            async () => {                    
                await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {  
                    resolve(downloadURL)
                    model[image.label] = downloadURL;
                });
            }
        );
    });    
}