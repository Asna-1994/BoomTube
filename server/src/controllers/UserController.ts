
import { NextFunction,  Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { STATUSCODE } from "../constants/StatusCodes";
import { UpdateUserDto } from "../dto/UserDto";
import { SuccessMessages } from "../constants/Messages";
import { userService } from "../config/container";


export class UserController {
  async getProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await userService.getUserById(req.user._id);
      res.status(STATUSCODE.OK).json({
        success: true,
        message: SuccessMessages.FETCHED_USER,
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const updateData: UpdateUserDto = req.body;
      const updatedUser = await userService.updateUser(
        req.user._id,
        updateData
      );
      res.status(STATUSCODE.OK).json({
        success: true,
        message: SuccessMessages.UPDATED_USER,
        user : updatedUser,
      });
    } catch (err) {
      next(err);
    }
  }

 async getWalletBalance(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user._id.toString();
        const user = await userService.getUserById(userId);

      res.status(STATUSCODE.OK).json({
        success: true,
        walletBalance: user.wallet,
      });
    } catch (error) {
      next(error);
    }
  }
}


export const userController  = new UserController()