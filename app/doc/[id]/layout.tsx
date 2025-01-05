'use client';

import LoadingSpinner from "@/components/LoadingSpinner";
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";
import { use } from "react";

export default function Layout({
  children, params
}: { children: React.ReactNode, params: Promise<{ id: string; }>; }
) {
  const { id } = use(params);
  return (
    <LiveblocksProvider throttle={16} authEndpoint={'/liveblocks-auth'}>
      <RoomProvider id={id} initialPresence={{ cursor: null }}>
        <ClientSideSuspense fallback={<LoadingSpinner />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}