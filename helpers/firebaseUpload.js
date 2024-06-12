import { v4 as uuidv4 } from "uuid";
import { storage } from "../config/firebase.js";
import { ref, uploadBytes } from 'firebase/storage';


const uploadFileFirebase = async (file) => {

  const storageRef = ref(storage, 'gami/'+uuidv4());
  const metadata = {
    contentType: "image/webp",
  };
  return uploadBytes(storageRef, file, metadata).then((snapshot) => {
   return (snapshot.metadata.name); 
  });
  
}

export default uploadFileFirebase
 
