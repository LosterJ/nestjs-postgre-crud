import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.save({ ...createUserDto });
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.userRepository.findOneBy({ id });
    if (!userToUpdate) {
      throw new Error(`User with id ${id} not found`);
    }
    Object.assign(userToUpdate, updateUserDto);
    return this.userRepository.save(userToUpdate);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
