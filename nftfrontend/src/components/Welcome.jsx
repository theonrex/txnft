import React from "react";
import { useEffect, useState } from "react";
import Space from "../assets/images/space.png";
import Marketplace from "./Marketplace";
export default function Welcome() {
  const [account, setAccount] = useState(null);

  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
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
  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);
    }
  }, []);
  return (
    <div className=" ">
      <div className="">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <br />
      <div className="Tx_welcome_page container mx-auto">
        <div className="Tx_welcome_page_text">
          <h1>Theon-X NFTS</h1>

          <h2>NFT Collection</h2>
          <p>
            Are you looking for a way to save money on web design, graphics
            design, blockchain web development, website development, or Xmas
            design? Our NFTs offer a unique opportunity for you to claim
            discounts on these services.
          </p>
          <Marketplace />
        </div>
        <div className="Tx_welcome_page_image">
          <img src={Space} alt="" />
        </div>
      </div>
    </div>
  );
}
