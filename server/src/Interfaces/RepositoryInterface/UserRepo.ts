import { IUser } from "../../entities/User";
import { BaseRepository } from "../../repositories/BaseRepoImpl";




export interface IUserRepository extends BaseRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
  findByPhone(phone: string): Promise<IUser | null>;
  findByIdWithPassword(id: string): Promise<IUser | null>; 
updateWalletBalance(userId: string, newBalance: number): Promise<IUser | null> 
   deductFromWallet(userId: string, amount: number): Promise<IUser | null>

}