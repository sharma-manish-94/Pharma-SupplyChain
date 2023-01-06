/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const registrationcontract = require('./lib/RegistrationContract.js');
const drugRegistrationcontract = require('./lib/DrugRegistration.js');
const transferDrugContract = require('./lib/TransferDrug.js');
const viewLifecycleContract = require('./lib/ViewLifeCycle.js');

module.exports.contracts = [registrationcontract, drugRegistrationcontract, transferDrugContract, viewLifecycleContract];

