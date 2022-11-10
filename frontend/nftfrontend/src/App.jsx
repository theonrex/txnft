import "./App.css";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import {NFT_ABI} from "./Abi";
 
const contractAddress = "0x8fA80e4eE5A67BB08e322c828BAD166cD856aBD5";
 
function App() {
 
  const [account, setAccount] = useState(null);
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [NFTContract, setNFTContract] = useState(null);
  // state for whether app is minting or not.
  const [isMinting, setIsMinting] = useState(false);
 
  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);
    }
  }, []);
 
  useEffect(() => {
      function initNFTContract() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setNFTContract(new Contract(contractAddress,NFT_ABI,signer));
      }
      initNFTContract();
  }, [account]);
 
 
  async function connectWallet() {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        setAccount(accounts[0]);
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }

  const data = [
    {
      url: "https://gateway.pinata.cloud/ipfs/QmbQ9H1zXoq3RPUS6kgd2GgeR84enqnsRdxzTP3EdBSpMw",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmbQ9H1zXoq3RPUS6kgd2GgeR84enqnsRdxzTP3EdBSpMw')",
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/QmYEbFuAszzDFuikJ1ewY5McedfAfRM8GUFfR3aFfXJpG9",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmYEbFuAszzDFuikJ1ewY5McedfAfRM8GUFfR3aFfXJpG9')",
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/QmSWBRdk269acZjxVHqyPy7Bwx9NkxFJZTJwdr5HAwdrYm",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmSWBRdk269acZjxVHqyPy7Bwx9NkxFJZTJwdr5HAwdrYm')",
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/QmQm4zTehS2WUvxMaSXFJSisezokxAdEGoF84kJ8dhyZr1",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmQm4zTehS2WUvxMaSXFJSisezokxAdEGoF84kJ8dhyZr1')",
    },
    {
      url: "https://gateway.pinata.cloud/ipfs/QmdyQByUtuPEMa6n8PwtgLgedcFHWBYSbriQyNduAnA66t",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmdyQByUtuPEMa6n8PwtgLgedcFHWBYSbriQyNduAnA66t')",
    },
  ];
 
  async function withdrawMoney(){
    try {
      const response = await NFTContract.withdrawMoney();
      console.log("Received: ", response);
    } catch (err) {
      alert(err);
    }
  }
 
  async function handleMint(tokenURI) {
    setIsMinting(true);
      try {
        const options = {value: ethers.utils.parseEther("0.03")};
        const response = await NFTContract.mintNFT(tokenURI, options);
        console.log("Received: ", response);
      } catch (err) {
        alert(err);
      }
      finally {
        setIsMinting(false);
      }
  }
 
  if (account === null) {
    return (
      <>
        <div className="container ola">
          <br/>
          <h1>Ola NFTS</h1>
          <h2>NFT Marketplace</h2>
          <p>Buy your NFT from our marketplace.</p>

          {isWalletInstalled ? (
            <button class="cssbuttons-io-button" onClick={connectWallet}> Get started
  <div class="icon">
    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
  </div>
</button>
          ) : (
            <p>Install Metamask wallet</p>
          )}
        </div>
      </>
    );
  }
 
  return (
    <> 
      <div className="container ola">
        <br/>
        <h1>Ola NFTS</h1>
      
        <h2>NFT Marketplace</h2>
          {data.map((item, index) => (
            <div className="imgDiv">
              <img
                src={item.url}
                key={index}
                alt="images"
                width={250}
                height={250}
              />
              <button isLoading={isMinting}
                onClick={() => {
                  eval(item.param);
                }}
                className="nft_buy"
              >
                Mint - 0.03 eth
              </button>
            </div>
          ))}
          <br />
              <hr />

          <br />
            <button 
            className="nft_buy"
              onClick={() => {
                withdrawMoney();
              }}
            >
              Withdraw Money from Contract
            </button>
      </div>
    </>
  );
}
 
export default App;