import { UserRepository } from "./users-repository"


export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async registerUser(name: string, phone: string, role?: string) {

        const exists = await this.userRepository.findByPhone(phone);
        if (exists) {
            return { user: exists, isExisting: true };
        }
        const newUser = await this.userRepository.create({ name, phone, role });
        return { user: newUser, isExisting: false };
        

        

    }

    async getById(userId: string) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }
        return user;
    }

    async getAll() {
        return this.userRepository.findAll();
    }
}





