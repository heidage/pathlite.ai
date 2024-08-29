import Dexie, { Table} from 'dexie'

export interface Message {
    message: string;
    isUser: boolean;
    sources?: { name: string; link: string; website: boolean }[];
}

export class DB extends Dexie{
    // table name is student
    messages!: Table<Message,number>;
    constructor(){
        super('MessagesDB');
        this.version(1).stores({
            messages: '++id, message, isUser, sources'
        });
    }
}

export const db = new DB();

export const addMessageToDB = async (message: Message) => {
    await db.messages.add(message);
}

export const getAllMessagesFromDB = async () => {
    return await db.messages.toArray();
}