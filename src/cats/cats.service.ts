import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const updatedCat = await this.catModel.findByIdAndUpdate(id, updateCatDto, {
      new: true,
    });

    if (!updatedCat) {
      throw new NotFoundException('Cat not found');
    }

    return updatedCat;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedCat = await this.catModel.findByIdAndDelete(id);

    if (!deletedCat) {
      throw new NotFoundException('Cat not found');
    }

    return { message: 'Cat deleted successfully' };
  }
}
