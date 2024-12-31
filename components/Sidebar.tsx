'use client';

import { MenuIcon } from "lucide-react";
import NewDocumentButton from "@/components/NewDocumentButton";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@clerk/nextjs";
import { useCollection } from 'react-firebase-hooks/firestore';
import { collectionGroup, DocumentData, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import SidebarOption from "./SidebarOption";

interface RoomDocument extends DocumentData {
    createdAt: string;
    roomId: string;
    userId: string;
    role: 'owner' | 'editor';
}

function Sidebar() {
    const { user } = useUser();
    const [gropedRooms, setGropedRooms] = useState<{
        owner: RoomDocument[],
        editor: RoomDocument[];
    }>({ owner: [], editor: [] });

    const [data, loading, error] = useCollection(
        user &&
        query(collectionGroup(db, 'rooms'),
            where('userId', '==', user.emailAddresses[0].emailAddress)
        )
    );

    useEffect(() => {
        if (!data) return;

        data.docs.forEach(doc => {
            console.log(doc.data());
        });

        const groupedRooms = data.docs.reduce<{
            owner: RoomDocument[],
            editor: RoomDocument[];
        }>((acc, curr) => {
            const room = curr.data() as RoomDocument;
            if (room.role === 'owner') {
                acc.owner.push({
                    id: curr.id,
                    ...room
                });
            } else {
                acc.editor.push({
                    id: curr.id,
                    ...room
                });
            }
            return acc;
        }, { owner: [], editor: [] });

        setGropedRooms(groupedRooms);
    }, [data]);

    const menuOptions = (
        <>
            <NewDocumentButton />

            <div className="flex flex-col py-4 space-y-4 ">
                {/* My Documents */}
                {gropedRooms.owner.length === 0 ? (
                    <h2 className="text-gray-500 font-semibold text-sm">
                        No documents found
                    </h2>
                ) : (
                    <>
                        <h2 className="text-gray-500 font-semibold text-sm">
                            My Documents
                        </h2>
                        {gropedRooms.owner.map(room => (
                            <SidebarOption key={room.id} id={room.id} href={`/doc/${room.id}`} />
                        ))}
                    </>
                )}


                {/* Shared with me list... */}
                {gropedRooms.editor.length > 0 && (
                    <>
                        <h2 className="text-gray-500 font-semibold text-sm">
                            Shared with me
                        </h2>
                        {gropedRooms.editor.map(room => (
                            <SidebarOption key={room.id} id={room.id} href={`/doc/${room.id}`} />
                        ))}
                    </>
                )}

            </div>
        </>
    );
    return (
        <div className="p-2 md:p-5 bg-gray-200 relative">
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger>
                        <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <div>{menuOptions}</div>
                    </SheetContent>
                </Sheet>
            </div>

            <div className="hidden md:inline">
                {menuOptions}
            </div>
        </div>
    );
}
export default Sidebar;