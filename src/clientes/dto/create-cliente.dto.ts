import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, Length, Matches } from "class-validator"

export class CreateClienteDto {
    @ApiProperty()
    @IsString()
    @Length(5, 60)
    nomeCompleto: string

    @ApiProperty({
        example: '25/12/1995',
        description: 'Data de nascimento no formato dd/MM/yyyy',
    })
    @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
        message: 'A data deve estar no formato dd/MM/yyyy',
    })
    @Transform(({ value }) => {
        if (!value) return value;

        const [dia, mes, ano] = value.split('/');
        const data = new Date(`${ano}-${mes}-${dia}T00:00:00`);

        return data;
    })
    @IsDate({ message: 'Data de nascimento inválida' })
    dataNascimento: Date;

    @ApiProperty({
        example: '123.456.789-09',
        description: 'CPF no formato 000.000.000-00 ou 00000000000',
    })
    @IsNotEmpty({ message: 'O CPF é obrigatório.' })
    @Matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, {
        message: 'CPF deve estar no formato 000.000.000-00 ou 00000000000',
    })
    cpf: string

    @ApiProperty()
    @IsString()
    cep: string

    @ApiProperty()
    @IsString()
    bairro: string

    @ApiProperty()
    @IsString()
    cidade: string

    @ApiProperty()
    @IsString()
    estado: string
}

