User class
The `User` class is a client for interacting with the Kross API's user-related endpoints. It extends the `KrossClientBase class` and provides methods for checking user information, user register/unregister and user virtual account information.

### Table of Contents

---

**Constructor** <br/>

**Methods** <br/>
**_- userData()_** <br/>
**_- accountData()_** <br/>

**Constructor** <br/>

---

The `User` class constructor accepts a KrossClientOptions object as its only argument. This object is used to configure the underlying Axios instance that makes the HTTP requests to the Kross API.

```ts
import { User } from 'kross-sdk';

const user = new User({
  baseURL: 'https://api.kross.com',
  accessId: 'afsdfsdfjsdfsd',
  secretKey: 'sdfsdfsdfsdfsdf',
});
```

**Methods** <br/>

---

`- userData()` <br/>
The `userData()` method is used to get user details.

```ts
user.userData({
  userQuery: {
    take: '1',
    skip: '0',
  },
  enabled,
});
```

##### Arguments <br/>

`select (optional)`: A string that specifies which columns to select in the query. If not provided, all columns will be selected.<br/>
`skip (optional)`: A string that specifies the number of rows to skip in the result set. If not provided, no rows will be skipped.<br/>
`take (optional)`: A string that specifies the maximum number of rows to return in the result set. If not provided, all rows will be returned.<br/>
`order (optional)`: A string that specifies the sorting order for the result set. It can be used to sort data based on one or more columns in ascending or descending order. If not provided, the result set will not be sorted.<br/>
`filter (optional)`: A string that specifies the filter conditions to apply to the result set. It can be used to select rows that meet certain criteria based on the values of one or more columns. If not provided, no filters will be applied.<br/>
`join (optional)`: A string that specifies the join conditions to use when querying data from multiple tables. It can be used to retrieve data from related tables by specifying how the tables are related to each other. If not provided, no joins will be performed.<br/>
`enabled (0ptional)`: enabled to true means make request to backend false means don't make request to backend

Return an array of users data response on success

```
[{
      "id": "string",
      "memberNo": "string",
      "keyid": "string",
      "name": "string",
      "memberType": "string",
      "state": "string",
      "nickName": "string",
      "birthday": "string",
      "ssn": "string",
      "email": "string",
      "mobile": "string",
      "zip": "string",
      "address1": "string",
      "address2": "string",
      "joinPath": "string",
      "kftcType": "string",
      "phoneVerified": true,
      "idCardVerified": true,
      "bankAccountVerified": true,
      "financialProvider": true,
      "isCorp": true,
      "fdsExcept": true,
      "depositControl": true,
      "notifyOnNewProducts": true,
      "notifyOnRepayments": true,
      "retireAt": "2023-03-30T10:55:44.490Z"
}]
```

---

`- accountData()` <br />
The `accountData()` method is used to get user account data.

```js
user.accountData(
  {
    accountQuery : {
      limit: '1',
      offset: '0'
    },
    enabled: true
  }
{

});
```

##### Arguments

`query` - query for filtering user data. <br/>
`limit, offset` : pagination props <br/>
`sort_by`: order lets you sort users data based on fields<br/>

Return an array of user data in response on success

```
[{
    "available_withdraw_amount": 0,
    "amount": 0,
    "pending_withdrawal": 0,
    "pending_investment": 0,
    "pending_etc": 0,
    "impossible_withdraw_sub_deposit_amount": 0,
    "bank_code": "string",
    "account_no": "string",
    "v_account_no": "string",
    "v_bank_code": "string"
}]
```

---
