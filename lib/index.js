"use strict";

/*
  *
  * Used FIO source: https://www.fio.sk/docs/cz/API_Bankovnictvi.pdf
  * Also attached in GIT project
  *
 */

// External modules
const builder = require('xmlbuilder');
const request = require('request');

// Module settings
let fioURL = "https://www.fio.cz/ib_api/rest/import/";
let fioToken = "";

function setToken(token) {
  fioToken = token;
}

function setURL(url) {
  fioURL = url;
}

/*
  * Main function to process the payments
  *
  * Expected: payment object or an Array of those
  *
  * Payment object fields - mandatory:
  * accountFrom : account number from FIO to make the payments, standard format
  * currency : "EUR"
  * amount : "100.00"
  * accountTo : IBAN format
  * date : YYYY-MM-DD
  * comment : Internal FIO comment
  * benefName : Name of the beneficiary account
  * remittanceInfo1 : Payment information for the beneficiary
  * paymentType : 431008 - standard || 431009 - priority
 */

function postPayments(data) {
  return new Promise((resolve, reject) => {

    if (fioToken) {

      let payments = [];

      // Build an array if a single one was provided
      if (!Array.isArray(data)) {
        payments.push(data);
      } else {
        payments = data;
      }

      // Check if provided object is an Array
      if (Array.isArray(payments)) {

        // Check if we have positive number of requests to do
        if (payments.length > 0) {

          // Check if all properties of all objects exist
          for (let i = 0; i < payments.length; i++) {

            // Check if the array is full of objects which are not null
            if (typeof payments[i] !== 'object' || payments[i] === null) {
              reject("One of the payments is not a non-null object");
            }

            // Check if it has all properties
            if (!('accountFrom' in payments[i]) || !('currency' in payments[i]) || !('amount' in payments[i]) || !('accountTo' in payments[i]) || !('date' in payments[i]) || !('comment' in payments[i]) || !('benefName' in payments[i]) || !('remittanceInfo1' in payments[i]) || !('paymentType' in payments[i])) {
              reject("One of the payment requests is missing required parameters");
            }
          }

          // Define the XML structure
          var obj = {
            Import: {
              '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
              '@xsi:noNamespaceSchemaLocation': 'http://www.fio.cz/schema/importIB.xsd',
              Orders: {
                T2Transaction: payments
              }
            }
          };

          // Build the XML
          let xml = builder.create(obj, {
            version: '1.0',
            encoding: 'UTF-8'
          }).end({pretty: true});

          // Upload the XML
          let req = request.post(fioURL, function (err, resp, body) {
            if (err) {
              reject("The REQUEST could not be posted to the SERVER, ERROR: " + err);
            } else {
              resolve(body)
            }
          });

          // Yes, form can be edited after "req" has been created - until the start of the next event loop
          let form = req.form();
          form.append('type', 'xml');
          form.append('token', fioToken);
          form.append('file', xml, {
            filename: 'batch.xml',
            contentType: 'text/xml'
          });

        } else {
          reject("Empty array provided");
        }
      }
    } else {
      reject("FIO token not set. Use setToken(<token>) first.");
    }
  });
}

module.exports.setToken = setToken;
module.exports.setURL = setURL;
module.exports.postPayments = postPayments;