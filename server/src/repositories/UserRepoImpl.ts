import User, { IUser } from "../entities/User";
import { IUserRepository } from "../Interfaces/RepositoryInterface/UserRepo";
import { BaseRepository } from "./BaseRepoImpl";





export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).select('+password').exec();
  }

  async findByIdWithPassword(id: string): Promise<IUser | null> {
    return User.findById(id).select('+password').exec(); 
  }

  async findByPhone(phone: string): Promise<IUser | null> {
    return User.findOne({ phone }).select('+password').exec();
  }



  async updateWalletBalance(userId: string, newBalance: number): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      userId,
      { walletBalance: newBalance },
      { new: true }
    ).exec();
  }

    async deductFromWallet(userId: string, amount: number): Promise<IUser | null> {
    const user = await this.findById(userId);
    if (!user || user.wallet< amount) {
      return null;
    }
    
    return await User.findByIdAndUpdate(
      userId,
      { $inc: { walletBalance: -amount } },
      { new: true }
    ).exec();
  }
}

