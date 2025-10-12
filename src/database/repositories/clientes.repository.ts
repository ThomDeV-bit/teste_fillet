import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'date-fns';
import { CreateClienteDto } from 'src/clientes/dto/create-cliente.dto';
import { ClienteEntity } from 'src/clientes/entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteRepository {
    constructor(
        @InjectRepository(ClienteEntity)
        private readonly clienteEntity: Repository<ClienteEntity>,
    ) {}

    async getClientes(): Promise<ClienteEntity[]> {
        return await this.clienteEntity.find();
    }

    async createCliente(cliente: CreateClienteDto): Promise<boolean> {
        const createCliente = this.clienteEntity.create({
            nomeCompleto: cliente.nomeCompleto,
            dataNascimento: parse(cliente.dataNascimento, 'dd/MM/yyyy', new Date()),
            cep: cliente.cep,
            cpf: cliente.cpf,
            bairro: cliente.bairro,
            cidade: cliente.cidade,
            estado: cliente.estado,
        });
        await this.clienteEntity.save(createCliente);
        return true;
    }
}
