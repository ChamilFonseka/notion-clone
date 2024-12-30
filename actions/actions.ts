'use server';

import { adminDb } from '@/firebase-admin';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function createNewDocument() {
    await auth.protect();

    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress!;

    try {
        const docRef = await adminDb.collection('documents')
            .add({
                title: 'New Document'
            });

        await adminDb.collection('users')
            .doc(email)
            .collection('rooms')
            .doc(docRef.id).set({
                userId: email,
                role: 'owner',
                createdAt: new Date(),
                roomId: docRef.id,
            });

        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}