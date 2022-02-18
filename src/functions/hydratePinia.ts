import { mainStore } from '../store'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'

const store = mainStore()

export const hydratePiniaFromFirestore = async () => {
  const db = getFirestore()
  const docRef = doc(db, 'users', store.currentUser.email)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    store.userData = docSnap.data()
  } else {
    await setDoc(doc(db, 'users', store.currentUser.email), {})
  }
}