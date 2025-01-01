
'use client'

import Document from "@/components/Document";
import { use } from "react";

export default function Page({params}: {params: Promise<{ id: string }>}) {
  const { id } = use(params);
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div >
  );
}