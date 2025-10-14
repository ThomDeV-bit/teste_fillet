import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { ClienteService } from '../service/clientes.service';

@Controller('cliente')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    @Post()
    async create(@Body() createClienteDto: CreateClienteDto) {
        try {
            await this.clienteService.createCliente(createClienteDto);

            return {
                message: 'Cliente criado com sucesso'
            }
        } catch (error) {
            throw error
        }
    }

    @Get()
    async getClientes() {
        try {
            return this.clienteService.getClientes();
        } catch (error) {
            throw new BadRequestException()
        }
    }

    @Get(':id')
    async getClienteById(@Param('id') id: string) {
        try {
            return this.clienteService.getClienteById(+id);
        } catch (error) {
            throw error
        }
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
        try {
            await this.clienteService.updateCliente(+id, updateClienteDto);

            return {
                message: 'Cliente alterado com sucesso.'
            }
        } catch (error) {
            throw error
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            await this.clienteService.removeCliente(+id);

            return {
                message: 'Cliente excluido com sucesso.'
            }
        } catch (error) {
            throw error
        }
    }
}
