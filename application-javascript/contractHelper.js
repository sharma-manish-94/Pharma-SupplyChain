/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const { Gateway, Wallets } = require('fabric-network')
const FabricCAServices = require('fabric-ca-client')
const path = require('path')
const {
  buildCAClient,
  registerAndEnrollUser,
  enrollAdmin,
} = require('../test-application/javascript/CAUtil.js')
const {
  buildCCPManufacturer,
  buildWallet,
  buildCCPDistributor,
  buildCCPRetailer,
  buildCCPConsumer,
  buildCCPTransporter,
} = require('../test-application/javascript/AppUtil.js')
const channelName = 'pharmachannel'
const chaincodeName = 'pharmanet'
const gateway = new Gateway()

async function getContractInstance(orgName) {
  // A gateway defines which peer is used to access Fabric network
  // It uses a common connection profile (CCP) to connect to a Fabric Peer
  // A CCP is defined manually in file connection-profile-iit.yaml

  //if loop to point to the right CCP and pull the right contract
  if (orgName == 'Manufacturer') {
    try {
      const ccp = buildCCPManufacturer()
      const caClient = buildCAClient(
        FabricCAServices,
        ccp,
        'ca.manufacturer.pharma-network.com',
      )
      const walletPath = path.join(__dirname, 'wallet', 'manufacturer')
      const wallet = await buildWallet(Wallets, walletPath)
      await enrollAdmin(caClient, wallet, 'ManufacturerMSP')
      await registerAndEnrollUser(
        caClient,
        wallet,
        'ManufacturerMSP',
        'manufacturer',
        'org1.department1',
      )
      console.log('.....Connecting to Fabric Gateway')
      await gateway.connect(ccp, {
        wallet,
        identity: 'manufacturer',
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
      })
      console.log('.....Connecting to channel - pharmachannel')
      const network = await gateway.getNetwork(channelName)
      console.log('.....Connecting to pharmanet Smart Contract')
      return network.getContract(chaincodeName)
    } catch (error) {
      console.error(`******** FAILED to run the application: ${error}`)
    }
  } else if (orgName == 'Distributor') {
    try {
      const ccp = buildCCPDistributor()
      const caClient = buildCAClient(
        FabricCAServices,
        ccp,
        'ca.distributor.pharma-network.com',
      )
      const walletPath = path.join(__dirname, 'wallet', 'distributor')
      const wallet = await buildWallet(Wallets, walletPath)
      await enrollAdmin(caClient, wallet, 'DistributorMSP')
      await registerAndEnrollUser(
        caClient,
        wallet,
        'DistributorMSP',
        'distributor',
        'org1.department1',
      )
      console.log('.....Connecting to Fabric Gateway')
      await gateway.connect(ccp, {
        wallet,
        identity: 'distributor',
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
      })
      console.log('.....Connecting to channel - pharmachannel')
      const network = await gateway.getNetwork(channelName)
      console.log('.....Connecting to pharmanet Smart Contract')
      return network.getContract(chaincodeName)
    } catch (error) {
      console.error(`******** FAILED to run the application: ${error}`)
    }
  } else if (orgName == 'Retailer') {
    try {
      const ccp = buildCCPRetailer()
      const caClient = buildCAClient(
        FabricCAServices,
        ccp,
        'ca.retailer.pharma-network.com',
      )
      const walletPath = path.join(__dirname, 'wallet', 'retailer')
      const wallet = await buildWallet(Wallets, walletPath)
      await enrollAdmin(caClient, wallet, 'RetailerMSP')
      await registerAndEnrollUser(
        caClient,
        wallet,
        'RetailerMSP',
        'retailer',
        'org1.department1',
      )
      console.log('.....Connecting to Fabric Gateway')
      await gateway.connect(ccp, {
        wallet,
        identity: 'retailer',
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
      })
      console.log('.....Connecting to channel - pharmachannel')
      const network = await gateway.getNetwork(channelName)
      console.log('.....Connecting to pharmanet Smart Contract')
      return network.getContract(chaincodeName)
    } catch (error) {
      console.error(`******** FAILED to run the application: ${error}`)
    }
  } else if (orgName == 'Consumer') {
    try {
      const ccp = buildCCPConsumer()
      const caClient = buildCAClient(
        FabricCAServices,
        ccp,
        'ca.consumer.pharma-network.com',
      )
      const walletPath = path.join(__dirname, 'wallet', 'consumer')
      const wallet = await buildWallet(Wallets, walletPath)
      await enrollAdmin(caClient, wallet, 'ConsumerMSP')
      await registerAndEnrollUser(
        caClient,
        wallet,
        'ConsumerMSP',
        'consumer',
        'org1.department1',
      )
      console.log('.....Connecting to Fabric Gateway')
      await gateway.connect(ccp, {
        wallet,
        identity: 'consumer',
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
      })
      console.log('.....Connecting to channel - pharmachannel')
      const network = await gateway.getNetwork(channelName)
      console.log('.....Connecting to pharmanet Smart Contract')
      return network.getContract(chaincodeName)
    } catch (error) {
      console.error(`******** FAILED to run the application: ${error}`)
    }
  } else if (orgName == 'Transporter') {
    try {
      const ccp = buildCCPTransporter()
      const caClient = buildCAClient(
        FabricCAServices,
        ccp,
        'ca.transporter.pharma-network.com',
      )
      const walletPath = path.join(__dirname, 'wallet', 'transporter')
      const wallet = await buildWallet(Wallets, walletPath)
      await enrollAdmin(caClient, wallet, 'TransporterMSP')
      await registerAndEnrollUser(
        caClient,
        wallet,
        'TransporterMSP',
        'transporter',
        'org1.department1',
      )
      console.log('.....Connecting to Fabric Gateway')
      await gateway.connect(ccp, {
        wallet,
        identity: 'transporter',
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
      })
      console.log('.....Connecting to channel - pharmachannel')
      const network = await gateway.getNetwork(channelName)
      console.log('.....Connecting to pharmanet Smart Contract')
      return network.getContract(chaincodeName)
    } catch (error) {
      console.error(`******** FAILED to run the application: ${error}`)
    }
  } else {
    return {
      message: 'Please enter valid organisation name.',
    }
  }

  // Set connection options; identity and wallet
}

function disconnect() {
  console.log('.....Disconnecting from Fabric Gateway')
  gateway.disconnect()
}

module.exports.getContractInstance = getContractInstance
module.exports.disconnect = disconnect
