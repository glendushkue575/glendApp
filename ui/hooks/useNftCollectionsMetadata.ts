import { Collection } from '@glendapp/assets-controllers';
import { TokenStandard } from '../../shared/constants/transaction';
import {
  getNFTContractInfo,
  getTokenStandardAndDetails,
} from '../store/actions';
import { useAsyncResult } from './useAsync';

type UseNftCollectionsMetadataRequest = {
  chainId: string;
  contractAddress: string;
};

const SUPPORTED_NFT_TOKEN_STANDARDS = [TokenStandard.ERC721];

function useNftCollectionsMetadata(
  requests: UseNftCollectionsMetadataRequest[],
): Record<string, Record<string, Collection>> {
  const { value: collectionsMetadata } = useAsyncResult(
    async () => await fetchCollections(requests),
    [JSON.stringify(requests)],
  );

  return collectionsMetadata || {};
}

async function fetchCollections(requests) {
  const valuesByChainId = requests.reduce((acc, req) => {
    const key = req.chainId;
    acc[key] ||= [];
    acc[key].push(req.contractAddress.toLowerCase());
    return acc;
  }, {});

  return (
    await Promise.all(
      Object.keys(valuesByChainId).map(async (chainId) =>
        fetch(CollectionsAPI_URL + `${chainId}/${valuesByChainId[chainId].join(',')}`),
      ),
    )
   ).reduce((acc, res, idx) => ({ ...acc, [Object.keys(res)[0]]: res }), {});
}
