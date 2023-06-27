import { v4 } from "uuid";
import { RoomID } from "../mobX/store";

export function useRoomID(roomID) {
    if (roomID) return roomID;
    const room = v4();
    RoomID.setRoom(room)
    return room;
}