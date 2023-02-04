import React from "react";
import { useEffect, useState } from "react";
import { NFT_ABI, NFT_CONTRACT_ADDRESS, PINATA } from "../components/constants";
import { Contract, providers, utils } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Nftimg from "../assets/images/space.png";
import { useAccount, useBalance } from "wagmi";
import { useSigner, useProvider } from "wagmi";

export default function Marketplace() {
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
  // tokenIdsMinted keeps track of the number of tokenIds that have been minted
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open

  const [account, setAccount] = useState(null);
  const [NFTContract, setNFTContract] = useState(null);
  // state for whether app is minting or not.
  const [isMinting, setIsMinting] = useState(false);

  //wagmi signer
  const { data: signer, isError, isLoading } = useSigner();
  // wagmi provider
  const provider = useProvider();
  const { connector: activeConnector, isConnected } = useAccount();

  useEffect(() => {
    function initNFTContract() {
      setNFTContract(new Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, signer));
    }
    initNFTContract();
  }, [account]);

  async function withdrawMoney() {
    try {
      const response = await NFTContract.withdrawMoney();
      console.log("Received: ", response);
    } catch (err) {
      alert(err);
    }
  }

 
  /**
   * publicMint: Mint an NFT
   */
  const publicMint = async () => {
    try {
      console.log("Public mint");
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, signer);
      // call the mint from the contract to mint the LW3Punks
      const tx = await nftContract.mint({
        // value signifies the cost of one LW3Punks which is "0.01" eth.
        // We are parsing `0.01` string to ether using the utils library from ethers.js
        value: utils.parseEther("0.01"),
      });
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      window.alert("You successfully minted a TXA ART!");
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * getTokenIdsMinted: gets the number of tokenIds that have been minted
   */
  const getTokenIdsMinted = async () => {
    try {
      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, provider);
      // call the tokenIds from the contract
      const _tokenIds = await nftContract.tokenIds();
      console.log("tokenIds", _tokenIds);
      //_tokenIds is a `Big Number`. We need to convert the Big Number to a string
      setTokenIdsMinted(_tokenIds.toString());
    } catch (err) {
      console.error(err);
    }
  };

 
    useEffect(() => {
     // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
  

       getTokenIdsMinted();

       // set an interval to get the number of token Ids minted every 5 seconds
       setInterval(async function () {
         await getTokenIdsMinted();
       }, 5 * 1000);
     
   }, [])

  const renderButton = () => {
    // If wallet is not connected, return a button which allows them to connect their wallet
    if (!isConnected) {
      return (
        <button>
          <ConnectButton />
        </button>
      );
    }

    // If we are currently waiting for something, return a loading button
    if (loading) {
      return <button>Loading...</button>;
    }

    return (
      <button className="cssbuttons-io-button" onClick={publicMint}>
        Public Mint 🚀
      </button>
    );
  };


  return (
    <div>
      <div className="marketplace_row">
        <div className="">
          <button>{renderButton()}</button>
          <div>{tokenIdsMinted}/100 have been minted</div>
        </div>
      </div>
    </div>
  );
}
