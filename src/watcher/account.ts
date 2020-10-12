import * as Interfaces from '@lib/common/interfaces';
import * as Transporter from '@lib/transport';

/** @internal */
export async function getUtxos (address: string): Promise<Array<Interfaces.IUTXO>> {
  return Transporter.post({
    url: `${this.watcherUrl}/account.get_utxos`,
    body: { address },
    proxyUrl: this.watcherProxyUrl
  });
}

export interface IBalance {
  amount: Interfaces.IComplexAmount;
  currency: string;
};

/** @internal */
export async function getBalance (address: string): Promise<Array<IBalance>> {
  return Transporter.post({
    url: `${this.watcherUrl}/account.get_balance`,
    body: { address },
    proxyUrl: this.watcherProxyUrl
  });
}