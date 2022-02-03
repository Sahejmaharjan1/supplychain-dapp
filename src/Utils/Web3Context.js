import { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { contractAbi, contractAddress } from './contractAbi';

const WebContext = createContext({});



export default function Web3Context({ children }) {
    const [ercContract, setErcContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [currentAccount, setCurrentAccount] = useState(null);

    useEffect(() => {
        const init = async () => {
            let providers = window.ethereum;
            let erc20Contract;
            setProvider(providers)
            if (typeof providers !== 'undefined') {
                providers
                    .request({ method: 'eth_requestAccounts' })
                    .then((accounts) => {
                        setCurrentAccount(accounts[0])
                        console.log(`Selected account is ${accounts[0]}`);
                    })
                    .catch((err) => {
                        console.log(err);
                        return;
                    });

                window.ethereum.on('accountsChanged', function (accounts) {
                    setCurrentAccount(accounts[0])
                    console.log(`Selected account changed to ${accounts[0]}`);
                });
            }

            const web3 = new Web3(providers);

            erc20Contract = new web3.eth.Contract(
                contractAbi, contractAddress
            );

            setErcContract(erc20Contract)
        };
        init();
    }, []);



    return (
        <WebContext.Provider value={{ ercContract, setErcContract, provider, setProvider, currentAccount, setCurrentAccount }}>
            {children}
        </WebContext.Provider>
    );
}

export const useWeb3Context = () => useContext(WebContext);
