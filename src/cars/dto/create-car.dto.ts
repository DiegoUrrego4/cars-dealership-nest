import { IsString, MinLength } from 'class-validator';

// Acá definimos únicamente las propiedades que vamos a recibir
export class CreateCarDTO {
  // @IsString({ message: 'The brand must be a cool string' }) así se personalizan mensajes de error
  @IsString()
  readonly brand: string;
  @IsString()
  @MinLength(3)
  readonly model: string;
}
