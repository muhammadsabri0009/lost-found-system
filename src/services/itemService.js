import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "../firebase/firebaseConfig"

export async function createItem(itemData) {
  const docRef = await addDoc(collection(db, "items"), {
    ...itemData,
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return docRef.id
}

export async function getAllItems() {
  const q = query(collection(db, "items"), orderBy("createdAt", "desc"))
  const querySnapshot = await getDocs(q)

  const items = querySnapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }))

  return items
}

export async function getItemById(id) {
  const itemRef = doc(db, "items", id)
  const itemSnap = await getDoc(itemRef)

  if (!itemSnap.exists()) {
    return null
  }

  return {
    id: itemSnap.id,
    ...itemSnap.data(),
  }
}

export async function getItemsByUser(userId) {
  const q = query(
    collection(db, "items"),
    where("postedBy", "==", userId)
  )

  const querySnapshot = await getDocs(q)

  const items = querySnapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }))

  return items.sort((a, b) => {
    const dateA = a.createdAt?.seconds || 0
    const dateB = b.createdAt?.seconds || 0

    return dateB - dateA
  })
}

export async function updateItemStatus(itemId, newStatus) {
  const allowedStatuses = ["active", "resolved"]

  if (!allowedStatuses.includes(newStatus)) {
    throw new Error("Invalid item status.")
  }

  const itemRef = doc(db, "items", itemId)

  await updateDoc(itemRef, {
    status: newStatus,
    updatedAt: serverTimestamp(),
  })
}

export async function markItemResolved(itemId) {
  await updateItemStatus(itemId, "resolved")
}

export async function reopenItem(itemId) {
  await updateItemStatus(itemId, "active")
}

export async function updateItemDetails(itemId, updatedData) {
  const itemRef = doc(db, "items", itemId)

  const safeUpdatedData = {
    title: updatedData.title.trim(),
    category: updatedData.category,
    description: updatedData.description.trim(),
    location: updatedData.location.trim(),
    date: updatedData.date,
    contactInfo: updatedData.contactInfo.trim(),
    imageUrl: updatedData.imageUrl || "",
    updatedAt: serverTimestamp(),
  }

  await updateDoc(itemRef, safeUpdatedData)
}

export async function deleteItem(itemId) {
  const itemRef = doc(db, "items", itemId)

  await deleteDoc(itemRef)
}