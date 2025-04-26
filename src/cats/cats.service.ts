import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  create(createCatDto: CreateCatDto) {
    this.cats.push(createCatDto);
    return createCatDto;
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
