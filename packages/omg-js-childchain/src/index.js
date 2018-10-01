const newTransaction = require('./transaction/newTx')
const { singleSign, signedEncode } = require('./transaction/signature')
const { base16Encode } = require('./transaction/base16')
const submitTx = require('./transaction/submitRPC')
const getUtxo = require('./transaction/getUtxo')
const { hexToByteArr, byteArrToBuffer, InvalidArgumentError } = require('omg-js-util')
global.Buffer = global.Buffer || require('buffer').Buffer

/*
*Summary: Interact with Tesuji Plasma Childchain from JavaScript (Node.js and Browser)
*Description: allows user to interact with Tesuji Plasma from JavaScript. look up examples for implementations in boith Client and Server
*
*@param {string} watcherUrl contains the url of the watcher server
*@param {string} childChainUrl contains the url of the childchain server to communicate with
*@param {string} web3Provider contains the url of geth node
*@param {string} plasmaAddr contains the url of the plasma smart contract already deployed
*
*/

class ChildChain {
  constructor (watcherUrl, childChainUrl) {
    this.watcherUrl = watcherUrl
    this.childChainUrl = childChainUrl
  }
  /**
   * generate, sign, encode and submit transaction to childchain
   *
   * @method sendTransaction
   * @param {array} inputs
   * @param {array} currency
   * @param {array} outputs
   * @return {object} success/error message with `tx_index`, `tx_hash` and `blknum` params
   */

  async sendTransaction (inputs, currency, outputs, privKey) {
    // Validate arguments
    validateInputs(inputs)
    validateCurrency(currency)
    validateOutputs(outputs)
    validatePrivateKey(privKey)

    // turns 2 hex addresses input to 2 arrays
    outputs[0].newowner1 = Array.from(hexToByteArr(outputs[0].newowner1))
    outputs[1].newowner2 = Array.from(hexToByteArr(outputs[1].newowner2))
    // turn privkey string to addr
    privKey = byteArrToBuffer(hexToByteArr(privKey))
    // creates new transaction object
    let transactionBody = await newTransaction(inputs, currency, outputs)
    // sign transaction
    let signedTx = await singleSign(transactionBody, privKey)
    // encode transaction with RLP
    let obj = signedTx.raw_tx
    let rlpEncodedTransaction = await signedEncode(obj, signedTx.sig1, signedTx.sig2)
    // encode transaction with base16
    let base16 = await base16Encode(rlpEncodedTransaction)
    // submit via JSON RPC
    return submitTx(base16, this.childChainUrl)
  }

  /**
   * Obtain UTXO of an address
   *
   * @method getUtxo
   * @param {String} address
   * @return {array} arrays of UTXOs
   */

  async getUtxo (address) {
    validateAddress(address)
    return getUtxo(this.watcherUrl, address)
  }
}

function validateInputs (arg) {
  // TODO
  const valid = true
  if (!valid) {
    throw new InvalidArgumentError()
  }
}

function validateOutputs (arg) {
  // TODO
  const valid = true
  if (!valid) {
    throw new InvalidArgumentError()
  }
}

function validateCurrency (arg) {
  // TODO
  const valid = true
  if (!valid) {
    throw new InvalidArgumentError()
  }
}

function validatePrivateKey (arg) {
  // TODO
  const valid = true
  if (!valid) {
    throw new InvalidArgumentError()
  }
}

function validateAddress (arg) {
  // TODO
  const valid = true
  if (!valid) {
    throw new InvalidArgumentError()
  }
}

module.exports = ChildChain