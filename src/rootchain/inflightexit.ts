import BN from 'bn.js';
import { keccak256 } from 'ethereumjs-util';
import { Buffer } from 'buffer';

import * as ContractsModule from '@lib/contracts';
import * as RootchainTransactionsModule from '@lib/rootchain/transaction';
import * as Interfaces from '@lib/common/interfaces';

export interface IGetInflightExitId {
  txBytes: string;
};

/** @internal */
export async function getInFlightExitId ({
  txBytes
}: IGetInflightExitId): Promise<string> {
  const { contract } = await this.getPaymentExitGame();
  return contract.methods.getInFlightExitId(txBytes).call();
};

export interface IGetInflightExitData {
  exitIds: Array<string>;
};

// NMTODO: define this interface
export interface IInflightExitData {};

/** @internal */
export async function getInFlightExitData ({
  exitIds
}: IGetInflightExitData): Promise<IInflightExitData> {
  const { contract } = await this.getPaymentExitGame();
  return contract.methods.inFlightExits(exitIds).call();
};

export interface IStartInflightExit {
  inFlightTx: string;
  inputTxs: Array<any>;
  inputUtxosPos: Array<Interfaces.IComplexAmount>;
  inputTxsInclusionProofs: Array<string>;
  inFlightTxSigs: Array<string>;
  txOptions: Interfaces.ITransactionOptions
};

/** @internal */
export async function startInflightExit ({
  inFlightTx,
  inputTxs,
  inputUtxosPos,
  inputTxsInclusionProofs,
  inFlightTxSigs,
  txOptions
}: IStartInflightExit): Promise<Interfaces.ITransactionReceipt> {
  const _inputUtxoPos = inputUtxosPos.map(i => i.toString());
  const { address, contract, bonds } = await this.getPaymentExitGame();

  const transactionData = ContractsModule.getTxData(
    contract,
    'startInFlightExit',
    [
      inFlightTx,
      inputTxs,
      _inputUtxoPos,
      inputTxsInclusionProofs,
      inFlightTxSigs
    ]
  );

  return RootchainTransactionsModule.sendTransaction.call(this, {
    from: txOptions.from,
    to: address,
    data: transactionData,
    value: bonds.inflightExit,
    gasLimit: txOptions.gasLimit,
    gasPrice: txOptions.gasPrice,
    privateKey: txOptions.privateKey
  });
};

export interface IPiggybackInflightExitOnOutput {
  inFlightTx: string;
  outputIndex: number;
  txOptions: Interfaces.ITransactionOptions;
};

/** @internal */
export async function piggybackInFlightExitOnOutput ({
  inFlightTx,
  outputIndex,
  txOptions
}: IPiggybackInflightExitOnOutput): Promise<Interfaces.ITransactionReceipt> {
  const { address, contract, bonds } = await this.getPaymentExitGame();

  const transactionData = ContractsModule.getTxData(
    contract,
    'piggybackInFlightExitOnOutput',
    [
      inFlightTx,
      outputIndex
    ]
  );

  return RootchainTransactionsModule.sendTransaction.call(this, {
    from: txOptions.from,
    to: address,
    data: transactionData,
    value: bonds.piggyback,
    gasLimit: txOptions.gasLimit,
    gasPrice: txOptions.gasPrice,
    privateKey: txOptions.privateKey
  });
}

export interface IPiggybackInflightExitOnInput {
  inFlightTx: string;
  inputIndex: number;
  txOptions: Interfaces.ITransactionOptions;
};

/** @internal */
export async function piggybackInFlightExitOnInput ({
  inFlightTx,
  inputIndex,
  txOptions
}: IPiggybackInflightExitOnInput): Promise<Interfaces.ITransactionReceipt> {
  const { address, contract, bonds } = await this.getPaymentExitGame();

  const transactionData = ContractsModule.getTxData(
    contract,
    'piggybackInFlightExitOnInput',
    [
      inFlightTx,
      inputIndex
    ]
  );

  return RootchainTransactionsModule.sendTransaction.call(this, {
    from: txOptions.from,
    to: address,
    data: transactionData,
    value: bonds.piggyback,
    gasLimit: txOptions.gasLimit,
    gasPrice: txOptions.gasPrice,
    privateKey: txOptions.privateKey
  });
}

export interface IChallengeInflightExitNotCanonical {
  inputTx: string;
  inputUtxoPos: Interfaces.IComplexAmount;
  inFlightTx: string;
  inFlightTxInputIndex: number;
  competingTx: string;
  competingTxInputIndex: number;
  competingTxPos: '0x' | number | BN;
  competingTxInclusionProof: string;
  competingTxWitness: string;
  txOptions: Interfaces.ITransactionOptions;
};

/** @internal */
export async function challengeInFlightExitNotCanonical ({
  inputTx,
  inputUtxoPos,
  inFlightTx,
  inFlightTxInputIndex,
  competingTx,
  competingTxInputIndex,
  competingTxPos,
  competingTxInclusionProof,
  competingTxWitness,
  txOptions
}: IChallengeInflightExitNotCanonical): Promise<Interfaces.ITransactionReceipt> {
  const { address, contract } = await this.getPaymentExitGame();

  const transactionData = ContractsModule.getTxData(
    contract,
    'challengeInFlightExitNotCanonical',
    [
      inputTx,
      inputUtxoPos.toString(),
      inFlightTx,
      inFlightTxInputIndex,
      competingTx,
      competingTxInputIndex,
      competingTxPos.toString(),
      competingTxInclusionProof,
      competingTxWitness
    ]
  );

  return RootchainTransactionsModule.sendTransaction.call(this, {
    from: txOptions.from,
    to: address,
    data: transactionData,
    gasLimit: txOptions.gasLimit,
    gasPrice: txOptions.gasPrice,
    privateKey: txOptions.privateKey
  });
}

export interface IRespondToNonCanonicalChallenge {
  inFlightTx: string;
  inFlightTxPos: Interfaces.IComplexAmount;
  inFlightTxInclusionProof: string;
  txOptions: Interfaces.ITransactionOptions;
};

/** @internal */
export async function respondToNonCanonicalChallenge ({
  inFlightTx,
  inFlightTxPos,
  inFlightTxInclusionProof,
  txOptions
}: IRespondToNonCanonicalChallenge): Promise<Interfaces.ITransactionReceipt> {
  const { address, contract } = await this.getPaymentExitGame();

  const transactionData = ContractsModule.getTxData(
    contract,
    'respondToNonCanonicalChallenge',
    inFlightTx,
    inFlightTxPos.toString(),
    inFlightTxInclusionProof
  );

  return RootchainTransactionsModule.sendTransaction.call(this, {
    from: txOptions.from,
    to: address,
    data: transactionData,
    gasLimit: txOptions.gasLimit,
    gasPrice: txOptions.gasPrice,
    privateKey: txOptions.privateKey
  });
}

export interface IChallengeInFlightExitInputSpent {
  inFlightTx: string;
  inFlightTxInputIndex: number;
  challengingTx: string;
  challengingTxInputIndex: number;
  challengingTxWitness: string;
  inputTx: string;
  inputUtxoPos: Interfaces.IComplexAmount;
  txOptions: Interfaces.ITransactionOptions;
};

/** @internal */
export async function challengeInFlightExitInputSpent ({
  inFlightTx,
  inFlightTxInputIndex,
  challengingTx,
  challengingTxInputIndex,
  challengingTxWitness,
  inputTx,
  inputUtxoPos,
  txOptions
}: IChallengeInFlightExitInputSpent): Promise<Interfaces.ITransactionReceipt> {
  const { address, contract } = await this.getPaymentExitGame();

  const transactionData = ContractsModule.getTxData(
    contract,
    'challengeInFlightExitInputSpent',
    [
      inFlightTx,
      inFlightTxInputIndex,
      challengingTx,
      challengingTxInputIndex,
      challengingTxWitness,
      inputTx,
      inputUtxoPos.toString(),
      keccak256(Buffer.from(txOptions.from))
    ]
  )
  return RootchainTransactionsModule.sendTransaction.call(this, {
    from: txOptions.from,
    to: address,
    data: transactionData,
    gasLimit: txOptions.gasLimit,
    gasPrice: txOptions.gasPrice,
    privateKey: txOptions.privateKey
  });
}

export interface IChallengeInFlightExitOutputSpent {
  inFlightTx: string;
  inFlightTxInclusionProof: string;
  inFlightTxOutputPos: Interfaces.IComplexAmount;
  challengingTx: string;
  challengingTxInputIndex: number;
  challengingTxWitness: string;
  txOptions: Interfaces.ITransactionOptions;
};

/** @internal */
export async function challengeInFlightExitOutputSpent ({
  inFlightTx,
  inFlightTxInclusionProof,
  inFlightTxOutputPos,
  challengingTx,
  challengingTxInputIndex,
  challengingTxWitness,
  txOptions
}: IChallengeInFlightExitOutputSpent): Promise<Interfaces.ITransactionReceipt> {
  const { address, contract } = await this.getPaymentExitGame();

  const transactionData = ContractsModule.getTxData(
    contract,
    'challengeInFlightExitOutputSpent',
    [
      inFlightTx,
      inFlightTxInclusionProof,
      inFlightTxOutputPos.toString(),
      challengingTx,
      challengingTxInputIndex,
      challengingTxWitness,
      keccak256(Buffer.from(txOptions.from))
    ]
  );

  return RootchainTransactionsModule.sendTransaction.call(this, {
    from: txOptions.from,
    to: address,
    data: transactionData,
    gasLimit: txOptions.gasLimit,
    gasPrice: txOptions.gasPrice,
    privateKey: txOptions.privateKey
  });
}

export interface IDeleteNonPiggybackedInFlightExit {
  exitId: string;
  txOptions: Interfaces.ITransactionOptions;
};

/** @internal */
export async function deleteNonPiggybackedInFlightExit ({
  exitId,
  txOptions
}: IDeleteNonPiggybackedInFlightExit): Promise<Interfaces.ITransactionReceipt> {
  const { address, contract } = await this.getPaymentExitGame();

  const transactionData = ContractsModule.getTxData(
    contract,
    'deleteNonPiggybackedInFlightExit',
    exitId
  );

  return RootchainTransactionsModule.sendTransaction.call(this, {
    from: txOptions.from,
    to: address,
    data: transactionData,
    gasLimit: txOptions.gasLimit,
    gasPrice: txOptions.gasPrice,
    privateKey: txOptions.privateKey
  });
}