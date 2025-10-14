import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './clientes.service';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { CepService } from './cep.service';
import { parse } from 'date-fns';
import { ClienteRepository } from '../../database/repositories/clientes.repository';


describe('Serviço de Clientes', () => {
    let service: ClienteService;
    let repository: jest.Mocked<ClienteRepository>;
    let cepService: CepService;

    const clienteMock = {
        id: 1,
        nomeCompleto: 'João da Silva',
        dataNascimento: new Date('1995-12-25'),
        cpf: '123.456.789-09',
        cep: '12345678',
        bairro: 'Centro',
        cidade: 'Cidade X',
        estado: 'Estado Y',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ClienteService,
                {
                    provide: CepService,
                    useValue: {
                        consultaCep: jest.fn()
                    },
                },

                {
                    provide: ClienteRepository,
                    useValue: {
                        createCliente: jest.fn(),
                        getClienteById: jest.fn(),
                        updateCliente: jest.fn(),
                        getClientes: jest.fn(),
                        removeCliente: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<ClienteService>(ClienteService);
        repository = module.get(ClienteRepository) as jest.Mocked<ClienteRepository>;
        cepService = module.get<CepService>(CepService);
    });

    it('deve estar definido', () => {
        expect(service).toBeDefined();
    });

    describe('Criar cliente', () => {
        it('deve criar um cliente com sucesso', async () => {
            const dto: CreateClienteDto = {
                nomeCompleto: 'João da Silva',
                dataNascimento: '25/12/1995',
                cpf: '123.456.789-09',
                cep: '12345678',
            };

            (repository.createCliente as jest.Mock).mockResolvedValue(true);

            const result = await service.createCliente(dto);

            expect(repository.createCliente).toHaveBeenCalledWith(dto);
            expect(result).toEqual(true);
        });
    });

    describe('Listar clientes', () => {
        it('deve retornar todos os clientes', async () => {
            (repository.getClientes as jest.Mock).mockResolvedValue([clienteMock]);

            const result = await service.getClientes();

            expect(repository.getClientes).toHaveBeenCalled();
            expect(result).toEqual([clienteMock]);
        });
    });

    describe('Obter cliente por ID', () => {
        it('deve retornar um cliente pelo ID', async () => {
            (repository.getClienteById as jest.Mock).mockResolvedValue(clienteMock);

            const result = await service.getClienteById(1);

            expect(repository.getClienteById).toHaveBeenCalledWith(1);
            expect(result).toEqual(clienteMock);
        });

        it('deve retornar undefined se não encontrar o cliente', async () => {
            (repository.getClienteById as jest.Mock).mockResolvedValue(undefined);

            const result = await service.getClienteById(999);

            expect(result).toBeUndefined();
        });
    });


    describe('Atualizar cliente', () => {
        it('deve atualizar um cliente parcialmente', async () => {
            const dto: UpdateClienteDto = { nomeCompleto: 'Novo Nome' };

            (repository.updateCliente as jest.Mock).mockImplementation((entity, update) => ({
                ...entity,
                ...update,
                dataNascimento: update.dataNascimento
                    ? parse(update.dataNascimento as string, 'dd/MM/yyyy', new Date())
                    : entity.dataNascimento,
            }));
            (repository.updateCliente as jest.Mock).mockResolvedValue(true);
            (repository.getClienteById as jest.Mock).mockResolvedValue({
                ...clienteMock,
                ...dto,
            });

            const result = await service.updateCliente(1, dto);

            expect(repository.updateCliente).toHaveBeenCalled();

            expect(repository.updateCliente).toHaveBeenCalledWith(1, dto);

            expect(result).toBe(true);
        });
    });

    describe('Remover cliente', () => {
        it('deve remover um cliente com sucesso', async () => {
            (repository.removeCliente as jest.Mock).mockResolvedValue(true);

            const result = await service.removeCliente(1);
            expect(repository.removeCliente).toHaveBeenCalledWith(1);
            expect(result).toBe(true)

        });
    });
});
