import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  @IsOptional()
  breed?: string;
}
