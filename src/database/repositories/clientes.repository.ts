import { BadRequestException, ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'date-fns';
import { CreateClienteDto } from 'src/clientes/dto/create-cliente.dto';
import { UpdateClienteDto } from 'src/clientes/dto/update-cliente.dto';
import { ClienteEntity } from 'src/clientes/entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteRepository {
    constructor(
        @InjectRepository(ClienteEntity)
        private readonly clienteEntity: Repository<ClienteEntity>,
    ) { }

    async getClientes(): Promise<ClienteEntity[]> {
        return await this.clienteEntity.find();
    }

    async createCliente(cliente: CreateClienteDto): Promise<boolean> {
        try {
            const createCliente = this.clienteEntity.create({
                nomeCompleto: cliente.nomeCompleto,
                dataNascimento: parse(cliente.dataNascimento, 'dd/MM/yyyy', new Date()),
                cep: cliente.cep,
                cpf: cliente.cpf,
                bairro: cliente.bairro,
                cidade: cliente.cidade,
                estado: cliente.estado,
            });

            await this.clienteEntity.save(createCliente)

            return true;
        } catch (error) {
            throw new BadRequestException("Erro ao criar cadastro de cliente.")
        }
    }


    async getClienteById(id: number): Promise<ClienteEntity> {
        const cliente = await this.clienteEntity.findOneBy({
            id: id
        });

        if (!cliente) {
            throw new NotFoundException("Cliente não encontrado")
        }

        return cliente;
    }


    async updateCliente(id: number, clienteDto: UpdateClienteDto): Promise<boolean> {
        try {
            const cliente = await this.clienteEntity.findOneBy({
                id: id
            })

            if (!cliente) {
                throw new BadRequestException("Cliente não encontrado")
            }

            const clienteAtualizado = this.clienteEntity.merge(cliente, {
                ...clienteDto,
                dataNascimento: parse(clienteDto.dataNascimento, 'dd/MM/yyyy', new Date()),
            });

            await this.clienteEntity.save(clienteAtualizado)

            return true
        } catch (error) {
            throw new ConflictException("Erro ao atualizar cadastro de cliente.")
        }
    }

    async removeCliente(id: number): Promise<boolean> {
        const cliente = await this.clienteEntity.findOne({ where: { id } });

        if (!cliente) {
            throw new BadRequestException('Cliente não encontrado');
        }

        await this.clienteEntity.remove(cliente);

        return true;
    }
}
