'use client'

import { createNewDocument } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const docId = await createNewDocument();
      router.push(`/doc/${docId}`);
    })
  }

  return (
    <div>
        <Button onClick={handleCreateNewDocument} disabled={isPending}>
          {isPending ? 'Creating...' : 'New document'}
        </Button>
    </div>
  )
}
export default NewDocumentButton