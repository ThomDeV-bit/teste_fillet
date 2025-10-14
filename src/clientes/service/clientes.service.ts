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

    async createCliente(createClienteDto: CreateClienteDto) : Promise<boolean> {
        const cep = await this.cepService.consultaCep(createClienteDto.cep)

        if(cep) {
            createClienteDto.bairro = cep.bairro
            createClienteDto.cidade = cep.localidade
            createClienteDto.estado = cep.estado
        }

        return await this.clienteRepository.createCliente(createClienteDto);
    }

    async getClientes(): Promise<ClienteEntity[]> {
        return await this.clienteRepository.getClientes();
    }

    async getClienteById(id: number) : Promise<ClienteEntity>{
        return await this.clienteRepository.getClienteById(id)
    }

    async updateCliente(id: number, updateClienteDto: UpdateClienteDto): Promise<boolean> {
        const cep = await this.cepService.consultaCep(updateClienteDto.cep)

        if(cep) {
            updateClienteDto.bairro = cep.bairro
            updateClienteDto.cidade = cep.localidade
            updateClienteDto.estado = cep.estado
        }

        return await this.clienteRepository.updateCliente(id, updateClienteDto)
    }

   async removeCliente(id: number) {
        return await this.clienteRepository.removeCliente(id)
    }
}
