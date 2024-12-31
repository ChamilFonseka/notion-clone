'use client'

import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

function SidebarOption({ href, id }: {
  href: string;
  id: string;
}) {
  const [data, loading, error] = useDocumentData(doc(db, 'documents', id));
  const pathname = usePathname();
  const isActive = href.includes(pathname);
  return (
    <Link href={href}
      className={`border p-1 rounded-md ${isActive ? "border-black" : "border-gray-400"}`}>
      <p className="truncate">
        {data?.title}
        {loading && '...'}
      </p>
    </Link>
  );
}
export default SidebarOption;