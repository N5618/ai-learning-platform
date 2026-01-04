import { Model } from "mongoose";
import { IUser } from "./model";

export class UserRepository {
  constructor(private readonly userModel: Model<IUser>) { }

  create(data: Partial<IUser>) {
    return this.userModel.create(data);
  }

  findByPhone(phone: string) {
    return this.userModel.findOne({ phone });
  }

  findById(id: string) {
    return this.userModel.findById(id);
  }

  findAll() {
    return this.userModel.find();
  }
}