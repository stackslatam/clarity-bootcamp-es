import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { StacksTestnet } from '@stacks/network';
import {
  AnchorMode,
  callReadOnlyFunction,
  makeContractCall,
  standardPrincipalCV,
  broadcastTransaction,
} from '@stacks/transactions';
import { uintCV, UIntCV, cvToHex, hexToCV, ClarityType } from '@stacks/transactions';

/**
 * Comunicarse con un método de lectura de un contrato
 */
async getTeamDetail() {
    try {
        const network = new StacksTestnet();
        const params = uintCV(2);

        const txOptions = {
            contractAddress: 'STJ3BSDKGMMQF6DJK80XRPAMYHPTS1Z0QEQZ8AT1',
            contractName: 'football-fixture',
            functionName: 'get-team-detail',
            functionArgs: [params],
            network,
            senderAddress: 'STJ3BSDKGMMQF6DJK80XRPAMYHPTS1Z0QEQZ8AT1',
        };

        const transaction = await callReadOnlyFunction(txOptions);

        return {
            message: 'Transaction Success',
            transaction: this.convertBigintToString(transaction),
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            this._logger.error(error);
            throw new BadRequestException(error);
        }
        throw error;
    }
}

/**
 * Comunicarse con una función de un contrato
 */
  async initFootballPlay() {
    try {
        const network = new StacksTestnet();
        const senderKey = await this.getPrivateKey();

        const txOptions = {
            contractAddress: 'STJ3BSDKGMMQF6DJK80XRPAMYHPTS1Z0QEQZ8AT1',
            contractName: 'football-fixture',
            functionName: 'init-football-play',
            functionArgs: [],
            senderKey,
            validateWithAbi: true,
            network,
            anchorMode: AnchorMode.Any,
        };

        const transaction = await makeContractCall(txOptions);
        const broadcastResponse = await broadcastTransaction(transaction, network);
        const txId = broadcastResponse.txid;

        return {
            message: 'Transaction Success',
            txId,
            transaction: this.convertBigintToString(transaction),
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            this._logger.error(error);
            throw new BadRequestException(error);
        }
        throw error;
    }
}