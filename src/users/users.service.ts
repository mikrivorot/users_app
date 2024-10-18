import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcryptjs from "bcryptjs";
import { User, UserDocument } from "./user.schema";
import { CreateUserDto } from './dto/request/user.create.dto';
import { UpdateUserDto } from './dto/request/user.update.dto';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(createUserDto.password, salt);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findOneByPseudonyme(pseudonyme: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ pseudonyme }).exec();
  }

  async findById(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async findAll(filters): Promise<UserDocument[]> {
    const query = {};
    if (filters.pseudonyme) {
      query['pseudonyme'] = filters.pseudonyme;
    }
    if (filters.name) {
      query['name'] = filters.name;
    }
    if (filters.userType) {
      query['userType'] = filters.userType;
    }

    if (filters.commentaire) {
      query['commentaire'] = { $regex: filters.commentaire, $options: 'i' };
    }
    if (filters.address) {
      query['address'] = { $regex: filters.address, $options: 'i' };
    }
    return this.userModel.find(query).exec();
  }

  async update(pseudonyme: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    const user: UserDocument = await this.findOneByPseudonyme(pseudonyme);
    if (updateUserDto.password) {
      const salt = await bcryptjs.genSalt();
      updateUserDto.password = await bcryptjs.hash(updateUserDto.password, salt);
    }
    Object.assign(user, updateUserDto);
    return user.save();
  }

  async delete(pseudonyme: string): Promise<UserDocument> {
    const user: UserDocument = await this.findOneByPseudonyme(pseudonyme);
    if (!user) {
      throw new NotFoundException(`User ${pseudonyme} not found`);
    }
    const result = await this.userModel.findByIdAndDelete(user?._id).exec();
    if (!result) {
      throw new NotFoundException(`User with ID ${user?._id} not found`);
    }
    return result;
  }
}
