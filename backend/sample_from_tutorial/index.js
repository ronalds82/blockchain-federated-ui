// index.js
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.6.0/dist/ethers.esm.min.js";
import { abi, contractAddress } from "./new_contract.js";

const connectButton = document.getElementById("connectButton");
const getStatusButton = document.getElementById("getStatusButton");
const updateStatusButton = document.getElementById("updateStatusButton");
const currentStatusSpan = document.getElementById("currentStatus");
const statusSelect = document.getElementById("statusSelect");

connectButton.onclick = connect;
getStatusButton.onclick = getStatus;
updateStatusButton.onclick = updateStatus;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      connectButton.innerHTML = "Connected";
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      console.log("Connected accounts:", accounts);
    } catch (error) {
      console.error(error);
    }
  } else {
    connectButton.innerHTML = "Please install MetaMask";
  }
}

async function getStatus() {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Connect to the contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);

      // Call the getStatus function
      const status = await contract.getStatus();
      currentStatusSpan.innerHTML = status;
      console.log("Current Status:", status);
    } catch (error) {
      console.error("Error getting status:", error);
    }
  } else {
    alert("Please install MetaMask");
  }
}

async function updateStatus() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const selectedStatus = statusSelect.value;
      console.log("Updating status to:", selectedStatus);

      // Connect to the contract with a signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Ensure the account is unlocked
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Send the transaction to updateStatus
      const txResponse = await contract.updateStatus(selectedStatus);
      await listenForTransactionMine(txResponse, provider);
      console.log("Status updated");

      // Refresh the displayed status
      getStatus();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  } else {
    alert("Please install MetaMask");
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        `Completed with ${transactionReceipt.confirmations} confirmations.`
      );
      resolve();
    });
  });
}
