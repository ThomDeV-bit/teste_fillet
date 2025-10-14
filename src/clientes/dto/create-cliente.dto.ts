import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, Matches } from "class-validator"
import { IsValidCpf } from "../../common/custom-decorators/isValidCpf.decorator";
import { IsValidDate } from "../../common/custom-decorators/isValidDate.decorator";

export class CreateClienteDto {
    @ApiProperty({
        nullable: false
    })
    @IsString()
    @Length(5, 60, {
        message: 'O nome completo deve ter entre 5 e 60 caracteres.',
    })
    nomeCompleto: string

    @ApiProperty({
        example: '25/12/1995',
        description: 'Data de nascimento no formato dd/MM/yyyy',
    })
    @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
        message: 'A data deve estar no formato dd/MM/yyyy',
    })
    @IsValidDate('dd/MM/yyyy', { message: 'Data de nascimento inválida' })
    dataNascimento: string;

    @ApiProperty({
        example: '123.456.789-09',
        description: 'CPF no formato 000.000.000-00 ou 00000000000',
    })
    @IsNotEmpty({ message: 'O CPF é obrigatório.' })
    @Matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, {
        message: 'CPF deve estar no formato 000.000.000-00 ou 00000000000',
    })
    @IsValidCpf()
    cpf: string

    @ApiProperty()
    @Length(8, 8, { message: 'Cep inválido!' })
    @IsString()
    cep: string

    bairro?: string

    cidade?: string

    estado?: string
}

