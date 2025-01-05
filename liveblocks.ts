import { Liveblocks } from "@liveblocks/node";

const secretKey = process.env.LIVEBLOCKS_SECRET_KEY;

if (!secretKey) {
  throw new Error("Missing LIVEBLOCKS_SECRET_KEY");
}

const liveblocks = new Liveblocks({
  secret: secretKey,
});

export default liveblocks;