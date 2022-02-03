// import NFTContractBuild from 'contracts/NFT.json';
import Web3 from 'web3';
import { contractAbi, contractAddress } from './contractAbi';

let selectedAccount;

let erc20Contract;

let isInitialized = false;

export const init = async () => {
    let provider = window.ethereum;

    if (typeof provider !== 'undefined') {
        provider
            .request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                selectedAccount = accounts[0];
                console.log(`Selected account is ${selectedAccount}`);
            })
            .catch((err) => {
                console.log(err);
                return;
            });

        window.ethereum.on('accountsChanged', function (accounts) {
            selectedAccount = accounts[0];
            console.log(`Selected account changed to ${selectedAccount}`);
        });
    }

    const web3 = new Web3(provider);

    // const networkId = await web3.eth.net.getId();

    erc20Contract = new web3.eth.Contract(
        contractAbi, contractAddress
    );

    isInitialized = true;
    web3.eth.getAccounts().then(async function (accounts) {
        console.log("accounts testing ", accounts);
        var receipt = await erc20Contract.methods
            .newItem('prodname', 'thisdate')
            .send({ from: accounts[0], gas: 1000000 })
            .then((receipt) => {
                console.log("receipt", receipt);
            })
            .catch((e) => {
                console.log("error", e);
            });
    });
};

export const getOwnBalance = async () => {
    if (!isInitialized) {
        await init();
    }

    return erc20Contract.methods
        .balanceOf(selectedAccount)
        .call()
        .then((balance) => {
            return Web3.utils.fromWei(balance);
        });
};


export const addItemTest = () => {

}
// export const mintToken = async () => {
// 	if (!isInitialized) {
// 		await init();
// 	}

// 	return nftContract.methods
// 		.mint(selectedAccount)
// 		.send({ from: selectedAccount });
// };
