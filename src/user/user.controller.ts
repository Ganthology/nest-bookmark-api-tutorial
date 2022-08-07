import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../../src/auth/decorator';
import { JwtGuard } from '../../src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

// Block the route depends on validation
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // GET /users/me
  @Get('me')
  getMe(@GetUser() user: User) {
    // req is the response from validate() in strategy
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
