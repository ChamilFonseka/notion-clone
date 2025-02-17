
'use client';

import { use } from "react";
import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import Document from "@/components/Document";
import Cursor from "@/components/Cursor";

export default function Page({
  params
}: { params: Promise<{ id: string; }>; }
) {
  const { id } = use(params);
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    // const cursor = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
    updateMyPresence({ cursor });
  }

  function handlePointerLeave() {
    updateMyPresence({ cursor: null });
  }

  return (

    <div
      className="min-h-screen"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      Cursor: {JSON.stringify(myPresence.cursor)}
      {others.length}

      {others
        .filter((other) => other.presence.cursor !== null)
        .map(({ connectionId, presence, info }) => (
          <Cursor
            key={connectionId}
            x={presence.cursor!.x}
            y={presence.cursor!.y}
            info={{
              name: info.name,
              email: info.email,
              avatar: info.avatar
            }}
          />
        ))}

      <Document id={id} />
    </div>

  );
}