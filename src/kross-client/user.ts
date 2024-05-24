import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import {
  AccountResponse,
  UserResponse,
  UserQueryDto,
  UserWengeQueryDto,
  UserUpdateDto,
  UserUpdateResponse,
} from '../types/kross-client/user';

export class User extends KrossClientBase {
  accountData: FunctionRegistered<AccountResponse, UserQueryDto>;
  userData: FunctionRegistered<UserResponse, UserWengeQueryDto>;
  userDataUpdate: FunctionRegistered<UserUpdateResponse, UserUpdateDto>;

  constructor(options: KrossClientOptions) {
    super(options);

    this.accountData = User.registerFunction<AccountResponse, UserQueryDto>({
      url: '/users/account',
      method: 'get',
    });

    this.userData = User.registerFunction<UserResponse, UserWengeQueryDto>({
      url: '/users',
      method: 'get',
    });

    this.userDataUpdate = User.registerFunction<
      UserUpdateResponse,
      UserUpdateDto
    >({
      url: '/users',
      method: 'put',
    });
  }
}
