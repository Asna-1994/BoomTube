
import { UpdateUserDto } from '../../dto/UserDto';

import { IUser } from '../../entities/User';


export interface IUserService {
getUserById(userId: string): Promise<IUser> 
 updateUser(userId: string, userData: UpdateUserDto): Promise<IUser> 



}