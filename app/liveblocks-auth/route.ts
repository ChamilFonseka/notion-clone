import { adminDb } from "@/firebase-admin";
import liveblocks from "@/liveblocks";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const user = await currentUser();
  console.log(user);
  return new Response(JSON.stringify(user));
}

export async function POST(request: NextRequest) {
  await auth.protect();

  const user = await currentUser();
  const { room } = await request.json();

  const userRooms = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", user?.primaryEmailAddress?.emailAddress)
    .get();

  const isUserInCurrentRoom = userRooms.docs.find((doc) => doc.id === room)?.exists;

  if (isUserInCurrentRoom) {
    const session = liveblocks.prepareSession(
      user?.primaryEmailAddress?.emailAddress!,
      {
        userInfo: {
          name: user?.fullName!,
          email: user?.primaryEmailAddress?.emailAddress!,
          avatar: user?.imageUrl!,
        }
      }
    );

    session.allow(room, session.READ_ACCESS);

    const { status, body } = await session.authorize();
    return new Response(body, { status });
  } else {
    return new Response('Unauthorized', { status: 403 });
  }
}