const ChildChain = require('../src')
const assert = require('chai').assert

const childChain = new ChildChain('watcher_url', 'childChain_url')

describe('createTransaction', () => {
  it('should create a hex-encoded unsigned transaction', () => {
    const txBody = {
      "inputs": [
        {
          "txindex": 0,
          "oindex": 0,
          "currency": "0000000000000000000000000000000000000000",
          "blknum": 19774001,
          "amount": 1000000000000000000
        }
      ],
      "outputs": [
        {
          "owner": "0xf4ebbe787311bb955bb353b7a4d8b97af8ed1c9b",
          "amount": 1000000000000000000
        }
      ]
    }

    const unsignedTx = childChain.createTransaction(txBody)
    const expectedTx = 'f85384012dba31808080808094000000000000000000000000000000000000000094f4ebbe787311bb955bb353b7a4d8b97af8ed1c9b880de0b6b3a764000094000000000000000000000000000000000000000080'
    assert.equal(unsignedTx, expectedTx)
  })

  it('should create a hex-encoded unsigned transaction with 2 inputs and 2 outputs', () => {
    const txBody = {
      "inputs": [
        {
          "txindex": 0,
          "oindex": 0,
          "currency": "0000000000000000000000000000000000000000",
          "blknum": 19774001,
        },
        {
          "txindex": 0,
          "oindex": 0,
          "currency": "0000000000000000000000000000000000000000",
          "blknum": 19774002,
        }
      ],
      "outputs": [
        {
          "owner": "0xf4ebbe787311bb955bb353b7a4d8b97af8ed1c9b",
          "amount": 1000000000000000000
        },
        {
          "owner": "0x3272ee86d8192f59261960c9ae186063c8c9041f",
          "amount": 1000000000000000000
        }
      ]
    }

    const unsignedTx = childChain.createTransaction(txBody)
    const expectedTx = 'f85f84012dba31808084012dba32808094000000000000000000000000000000000000000094f4ebbe787311bb955bb353b7a4d8b97af8ed1c9b880de0b6b3a7640000943272ee86d8192f59261960c9ae186063c8c9041f880de0b6b3a7640000'
    assert.equal(unsignedTx, expectedTx)
  })
})
