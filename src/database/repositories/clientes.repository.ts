import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateClienteDto } from "src/clientes/dto/create-cliente.dto";
import { ClienteEntity } from "src/clientes/entities/cliente.entity";
import { Repository } from "typeorm";

@Injectable()

export class ClienteRepository {
    constructor(
        @InjectRepository(ClienteEntity)
        private readonly clienteEntity : Repository<ClienteEntity>
    ){}


    async getClientes() : Promise<ClienteEntity[]> {
       return await this.clienteEntity.find()
    }

    async createCliente(cliente : CreateClienteDto) : Promise<Boolean>{
        const createCliente =  this.clienteEntity.create(cliente)
        await this.clienteEntity.save(createCliente)
        return true
    }
}
