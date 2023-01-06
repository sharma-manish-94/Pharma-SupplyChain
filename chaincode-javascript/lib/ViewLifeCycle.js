"use strict";

const {
  Contract
} = require("fabric-contract-api");

class ViewLifeCycle extends Contract {
  constructor() {
    //name of the Smart Contract => registration
    super("org.pharma-network.viewLifeCycle");
  }

  //All the custom functions are listed below

  // This is a basic user defined function used at the time of instantiating the smart contract
  // to print the success message on console

  async instantiate(ctx) {
    console.log("Pharmanet Chaincode is Instantiated");
  }

  //all custom fucntions

  /**
   * ViewHistory on the network
   * @param ctx - The transaction context object
   * @param drugName
   * @param serialNo
   * @returns - Trnasaction ID and details of each transaction
   */

  async viewHistory(ctx, drugName, serialNo) {
    try {
      const productIDKey = ctx.stub.createCompositeKey(
        "org.pharma-network.productIDKey",
        [serialNo, drugName]
      );

    let iterator = await ctx.stub.getHistoryForKey(productIDKey);
    let result = [];
    let res = await iterator.next();
    while (!res.done) {
      if (res.value) {
        console.info(`found state update with value: ${res.value.value.toString('utf8')}`);
        const obj = JSON.parse(res.value.value.toString('utf8'));
        result.push(obj);
      }
      res = await iterator.next();
    }
    await iterator.close();
    return result;  
    } catch (err) {
      return {
        error: "Unable to fetch History of Drug asset on the network, check input parameters",
        errorTrace: err.toString()
      };
    }
  }

  /**
   * View drug current state from the network
   * @param ctx - The transaction context object
   * @param drugName
   * @param serialNo
   * @returns - Drug object
   */
  async viewDrugCurrentState(ctx, drugName, serialNo) {
    try {
      const productIDKey = ctx.stub.createCompositeKey(
        "org.pharma-network.productIDKey",
        [serialNo, drugName]
      );
      let dataBuffer = await ctx.stub.getState(productIDKey).catch((err) => {
        console.log(err);
      });
      return JSON.parse(dataBuffer.toString());
    } catch (err) {
      return {
        error: "Unable to view Current History of Drug asset on the network, check input parameters",
        errorTrace: err.toString()
      };
    }
  }
}
module.exports = ViewLifeCycle;