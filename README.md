


![FIO](https://user-images.githubusercontent.com/8824657/111978900-b94ea080-8b04-11eb-89e0-871a25bf354f.png)



# fio-bank-payment-request

 [![Version](https://img.shields.io/npm/v/fio-bank-payment-request.svg)](https://www.npmjs.com/package/fio-bank-payment-request) [![Downloads](https://img.shields.io/npm/dt/fio-bank-payment-request.svg)](https://www.npmjs.com/package/fio-bank-payment-request)

> **Unofficial** FIO BANK module to post EURO payment requests using FIO API 




## :cloud: Installation

```sh
# Using npm
npm install --save fio-bank-payment-request
```



## :computer: Usage

```js
const fio = require('fio-bank-payment-request');
fio.setToken(" < YOUR FIO TOKEN >");

// Payment Object - supports also an array of objects
fio.postPayments({
  accountFrom: "2601234567",
  currency: "EUR",
  amount: "100.00",
  accountTo: "SK8975000000000012345671",
  ks: "0558",
  vs: "111111",
  ss: "111111",
  date: "2021-03-22",
  comment: "Internal Comment",
  benefName: "John smith",
  benefStreet: "Street 5",
  benefCity: "Sample City",
  benefCountry: "SK",
  remittanceInfo1: "Info for beneficiary 1",
  remittanceInfo2: "Info for beneficiary 2",
  remittanceInfo3: "Info for beneficiary 3",
  paymentType: "431008"
}).then((response) => {
  console.log("Posted to Server.");
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```


## :page_facing_up: Options

```js
// Set different FIO URL
// Default is : https://www.fio.cz/ib_api/rest/import/
fio.setURL(String url);
```




## :clipboard: Payment Object
```sh
M - mandatory
O - optional, can be left out or be empty string

More info see Documents - FIO Banka API manual.pdf
```

![2021-03-22 12_52_51-API_Bankovnictvi pdf](https://user-images.githubusercontent.com/8824657/111986060-b906d300-8b0d-11eb-8236-2d9aca735e12.png)



## :question: Get Help
For bug reports and feature requests, open issues. :bug:




## :yum: How to contribute
Have an idea? Found a bug? Let me know :thumbsup:

Thanks! :heart:


<!--
## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:
-->


## :scroll: License

[MIT] © Oliver Goossens
