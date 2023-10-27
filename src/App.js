import './App.css';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function App() {
    const [web3, setWeb3] = useState();
    const [account, setAccount] = useState('');

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            try {
                const web = new Web3(window.ethereum);
                setWeb3(web);
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

    const connectWallet = async () => {
        try {
            await window.ethereum.enable(); // MetaMask에 연결 요청
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
        } catch (error) {
            console.error("Error connecting to MetaMask: " + error);
        }
    };

    return (
        <div className="App">
            <button
                className="metaConnect"
                onClick={() => {
                    connectWallet();
                }}
            >
                Connect to MetaMask
            </button>
            <div className="userInfo">Address: {account}</div>
        </div>
    );
}

export default App;
