import { FatherRepositoryInterface } from "../interface/father-repository.interface";
import { Repository } from "typeorm";
import { Father } from "@database/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FatherRepository implements FatherRepositoryInterface {

    constructor(
        @InjectRepository(Father)
        private readonly repository: Repository<Father>
    ){}

    public findAll(): Promise<Father[]> {
        return this.repository.find();
    }
    public findById(id: number): Promise<Father | null> {
        return this.repository.findOne({ where: { id } });
    }

    public findByName(name: string): Promise<Father | null> {
        return this.repository.findOne({ where: { name } });
    }
}