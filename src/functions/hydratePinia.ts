import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { mainStore } from '../store'

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