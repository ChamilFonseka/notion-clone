'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";

function Document({id}: {id: string}) {
  const [data, loading, error] = useDocumentData(doc(db, 'documents', id));

  return (
    <div>

      <div>
        {/* Update title */}
        <form>
          <Input name="title" defaultValue={data?.title} />
          <Button type="submit" >
            Update
          </Button>
        </form>
      </div>

      {/* If the user is the owner, can delete & invite */}

      {/* Manage Users/Avatars */}
  
      {/* Editor */}
    </div>
  )
}
export default Document