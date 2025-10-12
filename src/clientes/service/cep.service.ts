/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { CepResponse } from '../responses/cep.response';
import { BadRequestException } from '@nestjs/common';

export class CepService {
    constructor() {}

    async consultaCep(cep: string): Promise<CepResponse> {
        const {data} = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (data.erro) {
            console.log('passou aqui');
            throw new BadRequestException('CEP não encontrado!');
        }

        return plainToInstance(CepResponse, data);
    }
}
