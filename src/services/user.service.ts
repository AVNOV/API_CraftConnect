import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/CreateUserDto';
import { UpdateUserDto } from 'src/dto/UpdateUserDto';
import { UpdateUserRoleDto } from 'src/dto/UpdateUserRoleDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.user.create({ ...user, password: hashedPassword });
    return await this.user.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.user.find({ relations: ['artisan'] });
  }

  async findOne(id: number): Promise<User | null> {
    return await this.user.findOne({
      where: { id },
      relations: ['artisan'],
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.user.findOne({
      where: { email },
      relations: ['artisan'],
    });
    return user;
  }

  async update(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    return await this.user.update(id, user);
  }

  async updateRole(id: number, user: UpdateUserRoleDto): Promise<UpdateResult> {
    return await this.user.update(id, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.user.delete(id);
  }
}
