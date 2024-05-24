import { KrossClientBase } from './base';
import { FunctionRegistered, KrossClientOptions } from '../types';
import {
  AccountResponse,
  UserResponse,
  UserQueryDto,
  UserWengeQueryDto,
} from '../types/kross-client/user';

export class User extends KrossClientBase {
  accountData: FunctionRegistered<AccountResponse, UserQueryDto>;
  userData: FunctionRegistered<UserResponse, UserWengeQueryDto>;

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
  }
}
