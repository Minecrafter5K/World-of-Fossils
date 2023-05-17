import { User } from "./User";

export interface Fossil {
    id: string;
    title: string;
    description: string;
    age: number;
    location: string;
    owner: User;
    image: string[];
    imageURL: string[];
    model: string;
}
