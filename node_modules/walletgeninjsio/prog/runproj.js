const Web3 = require('web3').default;
const fs = require('fs');
const path = require('path');

const web3 = new Web3();
//
const numWallets = 10;

const filePath = path.join(__dirname, 'wallets.txt');

const wallets = Array.from({ length: numWallets }, () => {
  const account = web3.eth.accounts.create();
  return {
    address: account.address,
    privateKey: account.privateKey,
  };
});

const data = 'Address\t\tPrivate Key\n' + wallets.map(wallet => `${wallet.address}\t${wallet.privateKey}`).join('\n');
fs.writeFileSync(filePath, data);

console.log(`Wallets generated and saved to ${filePath}`);
