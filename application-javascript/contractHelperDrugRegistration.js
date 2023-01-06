'use strict'

const { Gateway, Wallets } = require('fabric-network')
const path = require('path')
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
  let ccp
  let fabricUserName
  let wallet

  if (orgName == 'Manufacturer') {
    ccp = buildCCPManufacturer()
    fabricUserName = 'manufacturer'
    const walletPath = path.join(__dirname, 'wallet', 'manufacturer')
    wallet = await buildWallet(Wallets, walletPath)
  } else if (orgName == 'Distributor') {
    ccp = buildCCPDistributor()
    fabricUserName = 'distributor'
    const walletPath = path.join(__dirname, 'wallet', 'distributor')
    wallet = await buildWallet(Wallets, walletPath)
  } else if (orgName == 'Retailer') {
    ccp = buildCCPRetailer()
    fabricUserName = 'retailer'
    const walletPath = path.join(__dirname, 'wallet', 'retailer')
    wallet = await buildWallet(Wallets, walletPath)
  } else if (orgName == 'Consumer') {
    ccp = buildCCPConsumer()
    fabricUserName = 'consumer'
    const walletPath = path.join(__dirname, 'wallet', 'consumer')
    wallet = await buildWallet(Wallets, walletPath)
  } else if (orgName == 'Transporter') {
    ccp = buildCCPTransporter()
    fabricUserName = 'transporter'
    const walletPath = path.join(__dirname, 'wallet', 'transporter')
    wallet = await buildWallet(Wallets, walletPath)
  } else {
    return {
      message: 'Please enter valid organisation name.',
    }
  }

  // Set connection options; identity and wallet
  let connectionOptions = {
    wallet: wallet,
    identity: fabricUserName,
    discovery: {
      enabled: true,
      asLocalhost: true,
    },
  }

  // Connect to gateway using specified parameters
  console.log('.....Connecting to Fabric Gateway')
  await gateway.connect(ccp, connectionOptions)

  // Access certification channel
  console.log('.....Connecting to channel - pharmachannel')
  const channel = await gateway.getNetwork(channelName)

  // Get instance of deployed Certnet contract
  // @param Name of chaincode
  // @param Name of smart contract
  console.log('.....Connecting to PHARMANET Smart Contract')
  return channel.getContract(
    chaincodeName,
    'org.pharma-network.drugRegistration',
  )
}

function disconnect() {
  console.log('.....Disconnecting from Fabric Gateway')
  gateway.disconnect()
}

module.exports.getContractInstance = getContractInstance
module.exports.disconnect = disconnect
