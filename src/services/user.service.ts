import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.user.create({ ...user, password: hashedPassword });
    return await this.user.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.user.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.user.findOne({
      where: { id },
      relations: ['artisan'],
    });
  }

  async update(id: number, user: User): Promise<UpdateResult> {
    return await this.user.update(id, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.user.delete(id);
  }
}
