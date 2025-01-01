'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState, useTransition } from "react";

function Document({ id }: { id: string; }) {
  const [data] = useDocumentData(doc(db, 'documents', id));
  const [title, setTitle] = useState('');
  const [isUpdating, startTransition] = useTransition();

  useEffect(() => {
    if (data) {
      setTitle(data.title);
    }
  }, [data]);

  const updateTitle = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, 'documents', id), {
          title: title,
        });
      });
    }
  };

  return (
    <div>
      <div className="flex max-w-6xl mx-auto justify-between pb-5">
        {/* Update title */}
        <form onSubmit={updateTitle} className="flex flex-1 space-x-2">
          <Input name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </div>

      {/* If the user is the owner, can delete & invite */}

      {/* Manage Users/Avatars */}

      {/* Editor */}
    </div>
  );
}
export default Document;