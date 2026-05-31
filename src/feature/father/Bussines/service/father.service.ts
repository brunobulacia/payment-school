import { Injectable } from "@nestjs/common";
import { FatherRepository } from "feature/father/infraestructure/repository";



@Injectable()
export class FatherService {
    constructor(
        private readonly fatherRepository: FatherRepository
    ){}

    public findAll() {
        return this.fatherRepository.findAll();
    }
}