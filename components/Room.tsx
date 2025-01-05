import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import Cursor from "./Cursor";

export function Room() {
  const [myPresence, updateMyPresence] = useMyPresence();

  // Get list of other users
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
      style={{ width: "100vw", height: "100vh" }}
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
              name: 'name',
              email: 'emailxxx',
              avatar: 'avatar'
            }}
          />
        ))}
    </div>
  );
}
