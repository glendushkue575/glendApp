import type { Provider } from '@glendapp/network-controller';
import type { FetchGasFeeEstimateOptions } from '@glendapp/gas-fee-controller';
import type { SmartTransaction } from '@glendapp/smart-transactions-controller/dist/types';
import type { TransactionMeta } from '@glendapp/transaction-controller';
import { Hex } from 'viem';
import type {
  MetaMetricsEventFragment,
  MetaMetricsPageObject,
  MetaMetricsReferrerObject,
} from '../constants/metametrics';
import type { TokenStandard } from '../constants/transaction';
import type { HardwareKeyringType } from '../constants/hardware-wallets';
// eslint-disable-next-line import/no-restricted-paths
import type { SnapAndHardwareMessenger } from '../../app/scripts/lib/snap-keyring/metrics';

export interface TransactionMetricsRequest {
  createEventFragment(
    options: Omit<MetaMetricsEventFragment, 'id'>,
  ): MetaMetricsEventFragment;
  finalizeEventFragment(
    fragmentId: string,
    options?: {
      abandoned?: boolean;
      page?: MetaMetricsPageObject;
      referrer?: MetaMetricsReferrerObject;
    },
  ): void;
  getEventFragmentById(fragmentId: string): MetaMetricsEventFragment;
  updateEventFragment(fragmentId: string, payload: Partial<MetaMetricsEventFragment>): void;
  getAccountBalance(account: Hex, chainId: Hex): Hex;
  getAccountType(address: string): Promise<'hardware' | 'imported' | 'glendApp'>;
  getDeviceModel(address: string): Promise<'ledger' | 'lattice' | 'N/A' | string>;
  getHardwareTypeForMetric(address: string): Promise<HardwareKeyringType>;
  
  // TODO fix types in https://github.com/glendApp/glendapp-extension/issues/31973
  getEIP1559GasFeeEstimates(options?: FetchGasFeeEstimateOptions): Promise<any>;

  getParticipateInMetrics(): boolean;
  
  getSelectedAddress(): string;

  getTokenStandardAndDetails(): Promise<{
    decimals?: string; 
    balance?: string; 
    symbol?:string; 
    standard?: TokenStandard; 
   }> ;
   
   getTransaction(transactionId:string) : TransactionMeta;

   provider : Provider;

   snapAndHardwareMessenger : SnapAndHardwareMessenger;

   // TODO fix types in https://github.com/glendApp/glendapp-extension/issues/31973
   trackEvent(payload:any) : void;

   getIsSmartTransaction(chainId :Hex) : boolean;

   getSmartTransactionByMinedTxHash(txhash:string|undefined) : SmartTransaction;

   getMethodData(data:string) :Promise<{name:string}> ;

   getIsConfirmationAdvancedDetailsOpen() :boolean ;

   getHDEntropyIndex() : number ;

   getNetworkRpcUrl(chainId:Hex) :string ;
}

export interface TransactionEventPayload {
 transactionMeta: TransactionMeta;  
 actionId? :string ;  
 error?     :string ;  
}

export interface TransactionMetaEventPayload extends TransactionMeta {
 actionId?     ?:string ;  
 error?       ?:string ; 
}
