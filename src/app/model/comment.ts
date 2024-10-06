import { User } from "./user";

export class Comment {
    id?: number;
    title?: string;
    message?:string;
    createdAt?: Date;
    user?: User
}
