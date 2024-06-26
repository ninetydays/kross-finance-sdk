Loans class
The `KrossClient` class is a client for interacting with the Kross API's loans-related endpoints. It extends the `KrossClientBase class` and provides methods for checking loans information.

### Table of Contents

---

**Constructor** <br/>

**Methods** <br/>
**_- loanData()_** <br/>

**Constructor** <br/>

---

The `KrossClient` class constructor accepts a KrossClientOptions object as its only argument. This object is used to configure the underlying Axios instance that makes the HTTP requests to the Kross API.

```ts
import { KrossClient } from 'kross-sdk';

const loans = new KrossClient({
  baseURL: 'https://api.kross.com',
  accessId: 'afsdfsdfjsdfsd',
  secretKey: 'sdfsdfsdfsdfsdf',
});
```

**Methods** <br/>

---

`- loanData()` <br/>
The `loanData()` method is used to get Loans data.

```ts
loans.loanData({
  filter: 'state||$in||funding,pending',
  skip: '0',
  take: '3',
  order: 'id.desc',
});
```

##### Arguments <br/>

`select (optional)`: A string that specifies which columns to select in the query. If not provided, all columns will be selected.<br/>
`skip (optional)`: A string that specifies the number of rows to skip in the result set. If not provided, no rows will be skipped.<br/>
`take (optional)`: A string that specifies the maximum number of rows to return in the result set. If not provided, all rows will be returned.<br/>
`order (optional)`: A string that specifies the sorting order for the result set. It can be used to sort data based on one or more columns in ascending or descending order. If not provided, the result set will not be sorted.<br/>
`filter (optional)`: A string that specifies the filter conditions to apply to the result set. It can be used to select rows that meet certain criteria based on the values of one or more columns. If not provided, no filters will be applied.<br/>
`join (optional)`: A string that specifies the join conditions to use when querying data from multiple tables. It can be used to retrieve data from related tables by specifying how the tables are related to each other. If not provided, no joins will be performed.<br/>

Return an array of loans in response on success

```
[{
      "id": 0,
      "no": 0,
      "applicationId": "string",
      "userId": 0,
      "name": "string",
      "category": "string",
      "state": "string",
      "isDisplayed": true,
      "paymentDate": "string",
      "dueDate": "string",
      "repaymentDate": "string",
      "period": 0,
      "interestRate": 0,
      "overdueInterestRate": 0,
      "investorFeeRate": 0,
      "borrowerFeeRate": 0,
      "fundAmount": 0,
      "investedAmount": 0,
      "expectedAmount": 0,
      "repaymentAmount": 0,
      "principal": 0,
      "interestAmount": 0,
      "investorFeeAmount": 0,
      "borrowerFeeAmount": 0,
      "taxAmount": 0,
      "repaymentType": "string",
      "repaymentCycle": 0,
      "repaymentCount": 0,
      "wcTid": "string",
      "wcRtid": "string",
      "wcKeepid": "string",
      "kftcLoanRegisterId": "string",
      "kftcLoanContractId": "string",
      "kftcGoodsId": "string",
      "memo": "string",
      "data": {},
      "createdAt": "2023-03-30T08:18:06.059Z",
      "updatedAt": "2023-03-30T08:18:06.059Z",
      "investableLimit": 0
    }]
```

---
