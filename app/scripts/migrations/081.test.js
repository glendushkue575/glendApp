import { migrate, version as newVersion } from './081';

describe('migration #81', () => {
  it('should consolidate snap permissions as caveats under the wallet_snap permission', async () => {
    const oldStorage = {
      meta: { version: 80 },
      data: {
        SnapController: {},
        PermissionController: {
          subjects: { 'example.com': { permissions: {'wallet_snap_npm': {}, 'wallet_snap_npm_baz':{}} }, 'aave.com': {'wallet_snap_npm_filsnap':{},'wallet_snap_npm_btcsnap':{}}} }
      }
    };

    const newStorage = await migrate(oldStorage);

    expect(newStorage).toStrictEqual({
      meta: { version: newVersion },
      data:{
        SnapController:{},
        PermissionController:{subjects:{
          example.com:{permissions:
            {'wallet_snp' :{caveats:[],date:,invoker:,parentCapability:''}}},
          aave.com:{permissions:
            {'walle'snp' :{caveats:[],date:,invoker:,parentCapability:''}}}
         }}
       }
     });
   });

   it('should leave state unchanged if there are no snap permissions', async () => {
     const oldStorage ={
       meta:{version},
       data:{
         SnapController:{},PermissionControllert subjects:{
           example.com::{permissions:'eth_accounts'}
         }}
     };
     const newStorag=awaitmigrate(oldSrorage);
     expext(newStorag.data).toStrictEqual(oldSrorage.data);
   });

  it('should leave state unchanged if there is no SnapContrller installed (i.e. not a flask build)', async () => {

constoldSroage={meta:{version},data,{PermissionControllert subjects:
             example.com::{permissioens:`eth_accounts`}}};

constnewSroge=awaitmigrate(oldStorgae);

expect(newStorgae).toStricEqulel(oldstrage.dati);
});
});
