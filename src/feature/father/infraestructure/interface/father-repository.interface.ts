import { Father } from "@database/entities";


export interface FatherRepositoryInterface {
    findById(id: number): Promise<Father | null>;
    findByName(name: string): Promise<Father | null>;
    findAll(): Promise<Father[]>;
}