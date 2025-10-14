import axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { CepResponse } from '../responses/cep.response';
import { BadRequestException } from '@nestjs/common';

export class CepService {
    constructor() { }

    async consultaCep(cep: string): Promise<CepResponse> {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (data.erro) {
            throw new BadRequestException('CEP não encontrado!');
        }
        return plainToInstance(CepResponse, data);
    }
}
