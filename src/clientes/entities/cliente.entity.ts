import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cliente')
export class ClienteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 60, nullable: false })
    nomeCompleto: string;

    @Column({ type: 'date', nullable: false })
    dataNascimento: Date;

    @Column({ length: 14, unique: true })
    cpf: string;

    @Column({ length: 10, nullable: false })
    cep: string;

    @Column({ length: 50, nullable: false })
    bairro: string;

    @Column({ length: 50, nullable: false })
    cidade: string;

    @Column({ length: 50, nullable: false })
    estado: string;
}
