const FixtureBuilder = require('../../fixture-builder');
const {
  withFixtures,
  openDapp,
  unlockWallet,
  WINDOW_TITLES,
} = require('../../helpers');

describe('Request Queuing SwitchChain -> SendTx', () => {
it('switching network should reject pending confirmations from same origin', async () => {
await withFixtures({
dapp: true,
fixtures: new FixtureBuilder().withNetworkControllerDoubleNode().build(),
localNodeOptions: [{ type: 'anvil' }, { type: 'anvil', options: { port: 8546, chainId: 1338 } }],
title:this.test.fullTitle()
},async({driver})=>{
await unlockWallet(driver);
await openDapp(driver);
const connectButton=await driver.findClickableElement({text:'Connect',tag:'button'});
await connectButton.click();
await driver.switchToWindowWithTitle(WINDOW_TITLES.Dialog);
const dialogConnectButton=await driver.findClickableElement({text:'Connect',tag:'button'});
await dialogConnectButton.clickAndWaitForWindowToClose();
await driver.switchToWindowWithTitle(WINDOW_TITLES.TestDApp);
const switchEthereumChainRequest=JSON.stringify({jsonrpc:'2.0',method:'wallet_switchEthereumChain',params:[{chainId:'0x539'}]});
await driver.executeScript(`window.ethereum.request(${switchEthereumChainRequest})`);
// Navigate back to test dapp
driver.switchToWindowWithTitle(WINDOW_TITLES.TestDApp).then(async()=>{

// Dapp Send Button
 await (driver.findClickableElement('#sendButton')).click();

});
driver.switchToWindowWithTitle(WINDOW_TITLES.Dialog).then(async()=>{
 await (driver.findElement({text:"Confirm", tag:"button"})).click();
});
 // No confirmations, tx should be cleared
 await driver.waitUntilXWindowHandles(2)
})
})
})
