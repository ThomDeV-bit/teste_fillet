import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from './clientes.controller';
import { ClienteService } from '../service/clientes.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';

describe('Controlador de Clientes', () => {
  let controlador: ClienteController;
  let servico: ClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [
        {
          provide: ClienteService,
          useValue: {
            createCliente: jest.fn(),
            getClientes: jest.fn(),
            getClienteById: jest.fn(),
            updateCliente: jest.fn(),
            removeCliente: jest.fn(),
          },
        },
      ],
    }).compile();

    controlador = module.get<ClienteController>(ClienteController);
    servico = module.get<ClienteService>(ClienteService);
  });

  it('deve estar definido', () => {
    expect(controlador).toBeDefined();
  });

  // -------------------------------
  // CRIAR CLIENTE
  // -------------------------------
  describe('Criar cliente', () => {
    it('deve criar um cliente com sucesso', async () => {
      const dto: CreateClienteDto = {
        nomeCompleto: 'João da Silva',
        dataNascimento: '25/12/1995',
        cpf: '123.456.789-09',
        cep: '12345678',
      };
      (servico.createCliente as jest.Mock).mockResolvedValue(undefined);

      const resultado = await controlador.create(dto);

      expect(servico.createCliente).toHaveBeenCalledWith(dto);
      expect(resultado).toEqual({ message: 'Cliente criado com sucesso' });
    });

    it('deve lançar erro se o serviço falhar', async () => {
      const dto: CreateClienteDto = {
        nomeCompleto: 'João da Silva',
        dataNascimento: '25/12/1995',
        cpf: '123.456.789-09',
        cep: '12345678',
      };
      (servico.createCliente as jest.Mock).mockRejectedValue(new BadRequestException());

      await expect(controlador.create(dto)).rejects.toThrow();
    });
  });

  // -------------------------------
  // LISTAR CLIENTES
  // -------------------------------
  describe('Listar clientes', () => {
    it('deve retornar um array de clientes', async () => {
      const clientes = [{ nomeCompleto: 'João' }];
      (servico.getClientes as jest.Mock).mockResolvedValue(clientes);

      const resultado = await controlador.getClientes();

      expect(servico.getClientes).toHaveBeenCalled();
      expect(resultado).toEqual(clientes);
    });

    it('deve lançar BadRequestException se ocorrer erro', async () => {
      (servico.getClientes as jest.Mock).mockRejectedValue(new BadRequestException());

      await expect(controlador.getClientes()).rejects.toThrow(BadRequestException);
    });
  });


  describe('Obter cliente por ID', () => {
    it('deve retornar um cliente pelo ID', async () => {
      const cliente = { id: 1, nomeCompleto: 'João' };
      (servico.getClienteById as jest.Mock).mockResolvedValue(cliente);

      const resultado = await controlador.getClienteById('1');

      expect(servico.getClienteById).toHaveBeenCalledWith(1);
      expect(resultado).toEqual(cliente);
    });

    it('deve lançar erro se o serviço falhar', async () => {
      (servico.getClienteById as jest.Mock).mockRejectedValue(new NotFoundException());

      await expect(controlador.getClienteById('1')).rejects.toThrow();
    });
  });

  // -------------------------------
  // ATUALIZAR CLIENTE
  // -------------------------------
  describe('Atualizar cliente', () => {
    it('deve atualizar um cliente parcialmente', async () => {
      const dto: UpdateClienteDto = { nomeCompleto: 'Novo Nome' };
      (servico.updateCliente as jest.Mock).mockResolvedValue(undefined);

      const resultado = await controlador.update('1', dto);

      expect(servico.updateCliente).toHaveBeenCalledWith(1, dto);
      expect(resultado).toEqual({ message: 'Cliente alterado com sucesso.' });
    });

    it('deve atualizar vários campos', async () => {
      const dto: UpdateClienteDto = {
        nomeCompleto: 'Novo Nome',
        cep: '87654321',
      };
      (servico.updateCliente as jest.Mock).mockResolvedValue(undefined);

      const resultado = await controlador.update('1', dto);

      expect(servico.updateCliente).toHaveBeenCalledWith(1, dto);
      expect(resultado).toEqual({ message: 'Cliente alterado com sucesso.' });
    });

    it('deve lançar erro se o serviço falhar', async () => {
      const dto: UpdateClienteDto = { nomeCompleto: 'Erro' };
      (servico.updateCliente as jest.Mock).mockRejectedValue(new Error());

      await expect(controlador.update('1', dto)).rejects.toThrow();
    });
  });

  // -------------------------------
  // REMOVER CLIENTE
  // -------------------------------
  describe('Remover cliente', () => {
    it('deve remover um cliente com sucesso', async () => {
      (servico.removeCliente as jest.Mock).mockResolvedValue(undefined);

      const resultado = await controlador.remove('1');

      expect(servico.removeCliente).toHaveBeenCalledWith(1);
      expect(resultado).toEqual({ message: 'Cliente excluido com sucesso.' });
    });

    it('deve lançar erro se o serviço falhar', async () => {
      (servico.removeCliente as jest.Mock).mockRejectedValue(new Error());

      await expect(controlador.remove('1')).rejects.toThrow();
    });
  });
});
