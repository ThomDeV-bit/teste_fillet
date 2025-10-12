import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { ClienteRepository } from 'src/database/repositories/clientes.repository';
import { ClienteEntity } from '../entities/cliente.entity';
import { CepService } from './cep.service';


@Injectable()
export class ClienteService {
    constructor(
        private readonly clienteRepository: ClienteRepository,
        private readonly cepService: CepService
    ) { }
    async create(createClienteDto: CreateClienteDto) {
        const cep = await this.cepService.consultaCep(createClienteDto.cep)
        if(cep) {
            createClienteDto.bairro = cep.bairro
            createClienteDto.cidade = cep.localidade
            createClienteDto.estado = cep.estado
        }

        return await this.clienteRepository.createCliente(createClienteDto);
    }

    async findAll(): Promise<ClienteEntity[]> {
        return await this.clienteRepository.getClientes();
    }

    findOne(id: number) {
        return `This action returns a #${id} cliente`;
    }

    update(id: number, updateClienteDto: UpdateClienteDto) {
        return `This action updates a #${id} cliente`;
    }

    remove(id: number) {
        return `This action removes a #${id} cliente`;
    }
}
