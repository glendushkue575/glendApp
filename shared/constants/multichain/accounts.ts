Alright, I need to optimize the given code. Let me look at what's there.

First, I see two objects: MULTICHAIN_ACCOUNT_TYPE_TO_SNAP_ID and MULTICHAIN_ACCOUNT_TYPE_TO_NAME. Both have Bitcoin and Solana entries with conditional includes.

For Bitcoin in SNAP_ID, all BtcAccountType entries map to BITCOIN_WALLET_SNAP_ID. Instead of repeating the same value four times, I can create an array of the types and map them using Object.fromEntries. This reduces repetition and makes the code cleaner.

Similarly, for SNAP_NAME, each type has a specific string. I can pair each type with its corresponding name in an array of tuples and then convert that into an object as well.

The Solana part only has one entry in SNAP_ID, so it's fine as is since there's nothing to optimize there.

By refactoring these sections, the code becomes more concise and maintainable without changing its functionality.
</think>

const btcTypes = [
  BtcAccountType.P2pkh,
  BtcAccountType.P2sh,
  BtcAccountType.P2wpkh,
  BtcAccountType.P2tr
];
export const MULTICHAIN_ACCOUNT_TYPE_TO_SNAP_ID = {
  ...Object.fromEntries(btcTypes.map(type => [type, BITCOIN_WALLET_SNAP_ID])),
  [SolAccountType.DataAccount]: SOLANA_WALLET_SNAP_ID
};

export const MULTICHAIN_ACCOUNT_TYPE_TO_NAME = {
  [BtcAccountType.P2pkh]: 'Legacy',
  [BtcAccountType.P2sh]: 'SegWit',
  [BtcAccountType.P2wpkh]: 'Native SegWit',
  [BtcAccountType.P2tr]: 'Taproot'
};
