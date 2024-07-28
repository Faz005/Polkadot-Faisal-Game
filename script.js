document.addEventListener('DOMContentLoaded', (event) => {
    const balanceElement = document.getElementById('balance');
    const bidPriceElement = document.getElementById('bidPrice');
    const askPriceElement = document.getElementById('askPrice');
    const messageElement = document.getElementById('message');
    const unitsInput = document.getElementById('units');
    const buyButton = document.getElementById('buyBtn');
    const sellButton = document.getElementById('sellBtn');
    const nextRoundButton = document.getElementById('nextRoundBtn');
    const walletAddressInput = document.getElementById('walletAddress');
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const walletMessage = document.getElementById('walletMessage');

    let balance = 500;
    let walletAddress = '';

    // Connect to Polkadot Wallet
    connectWalletBtn.addEventListener('click', () => {
        walletAddress = walletAddressInput.value.trim();
        if (walletAddress) {
            walletMessage.textContent = `Connected to wallet: ${walletAddress}`;
        } else {
            walletMessage.textContent = 'Please enter a valid wallet address.';
        }
    });

    function updateMarketQuote() {
        const bidPrice = (Math.random() * 10).toFixed(2);
        const askPrice = (parseFloat(bidPrice) + Math.random()).toFixed(2);
        bidPriceElement.textContent = bidPrice;
        askPriceElement.textContent = askPrice;
    }

    function updateBalance(amount) {
        balance += amount;
        balanceElement.textContent = balance;
    }

    async function UniqueNetworkTransaction() {
        
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('Transaction processed using Unique Network and Polkadot parachain');
            }, 2000);
        });
    }

    buyButton.addEventListener('click', () => {
        const units = parseInt(unitsInput.value);
        const askPrice = parseFloat(askPriceElement.textContent);
        const cost = units * askPrice;

        if (units > 0 && cost <= balance) {
            updateBalance(-cost);
            messageElement.textContent = `Bought ${units} units for ${cost}.`;
        } else {
            messageElement.textContent = 'Insufficient balance or invalid units.';
        }
    });

    sellButton.addEventListener('click', () => {
        const units = parseInt(unitsInput.value);
        const bidPrice = parseFloat(bidPriceElement.textContent);
        const revenue = units * bidPrice;

        if (units > 0) {
            updateBalance(revenue);
            messageElement.textContent = `Sold ${units} units for ${revenue}.`;
        } else {
            messageElement.textContent = 'Invalid units.';
        }
    });

    nextRoundButton.addEventListener('click', async () => {
        updateMarketQuote();
        messageElement.textContent = '';
        unitsInput.value = '';
        const networkMessage = await UniqueNetworkTransaction();
        messageElement.textContent = networkMessage;
    });

    // Initial market quote
    updateMarketQuote();
});
