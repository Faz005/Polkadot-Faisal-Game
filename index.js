const { ApiPromise, WsProvider } = require('@polkadot/api');

async function connectToPolkadot() {
  const provider = new WsProvider('wss://polkadot.api.onfinality.io/public-ws');
  const api = await ApiPromise.create({ provider });
  return api;
}

async function querySmartContract(contractAddress, functionName) {
  const api = await connectToPolkadot();
  const contract = await api.query.contracts.contracts.at(contractAddress);

  // Query the contract
  const { output } = await contract.query[functionName]();
  console.log('Contract Output:', output.toHuman());
}

async function sendTransaction(contractAddress, functionName, params) {
  const api = await connectToPolkadot();
  const contract = api.tx.contracts.call(contractAddress, 0, 0, api.tx[functionName](params));

  const { nonce } = await api.query.system.account('YOUR_ACCOUNT_ADDRESS');
  await contract.signAndSend('YOUR_ACCOUNT_ADDRESS', { nonce });
}

// Example usage
(async () => {
  await querySmartContract('YOUR_CONTRACT_ADDRESS', 'get_balance');
  await sendTransaction('YOUR_CONTRACT_ADDRESS', 'update_balance', 50);
})();
