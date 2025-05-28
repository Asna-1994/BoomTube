
import { ErrorMessages } from '../constants/Messages';
import { STATUSCODE } from '../constants/StatusCodes';
import { UpdateUserDto } from '../dto/UserDto';
import { IUser } from '../entities/User';
import { IUserRepository } from '../Interfaces/RepositoryInterface/UserRepo';
import { CustomError } from '../middlewares/errorHandler';

import { IUserService } from '../Interfaces/ServiceInterface/UserServiceInterface';

export class UserService implements IUserService {


  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(userId: string): Promise<IUser> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new CustomError(ErrorMessages.USER_NOT_FOUND, STATUSCODE.NOT_FOUND);
    }
    return user;
  }

  async updateUser(userId: string, userData: UpdateUserDto): Promise<IUser> {
    const updatedUser = await this.userRepository.update(userId, {
      ...(userData.firstName && { firstName: userData.firstName }),
      ...(userData.lastName && { lastName: userData.lastName }),
      ...(userData.phone && { phone: userData.phone }),
      ...(userData.dob && { dob: new Date(userData.dob) })
    });

    if (!updatedUser) {
      throw new CustomError(ErrorMessages.USER_NOT_FOUND, STATUSCODE.NOT_FOUND);
    }

    return updatedUser;
  }


}

