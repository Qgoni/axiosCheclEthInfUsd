const axios = require('axios');

async function checkBalance(addresses) {
    for (let i = 0; i < addresses.length; i++) {
        try {
            const response = await axios.post('https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY', {
                jsonrpc: '2.0',
                method: 'eth_getBalance',
                params: [addresses[i], 'latest'],
                id: 1,
            });

            const balance = parseFloat(axios.get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=YOUR_ETHERSCAN_API_KEY')).data.result.ethusd;
            const etherBalance = parseFloat(response.data.result) / 1e18;
            console.log(`Balance of address ${addresses[i]}: ${etherBalance} ETH ($${(etherBalance * balance).toFixed(2)})`);
        } catch (error) {
            console.error(`Error checking balance of address ${addresses[i]}:`, error.message);
        }
    }
}

// Check balance of addresses
const addresses = ['0x123...', '0x456...', '0x789...'];
checkBalance(addresses);
