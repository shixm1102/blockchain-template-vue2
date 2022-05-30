import Web3 from "web3";
import ERC20ABI from "@/config/abi/ERC20.abi.json";

export async function connect() {
  console.log("connect");
  try {
    const [accounts, chainId] = await Promise.all([
      window.ethereum.request({
        method: "eth_requestAccounts",
      }),
      window.ethereum.request({ method: "eth_chainId" }),
    ]);
    return {
      address: accounts[0],
      chainId: Number(chainId).toString(),
    };
  } catch (error) {
    console.error(error);
    throw Error(error.message);
  }
}

export async function getAddress() {
  const account = await window.ethereum.request({
    method: "eth_accounts",
  });
  console.log("account", account);
  return account.length > 0 ? account[0] : "";
}

export async function getBalance(address) {
  const balance = await window.ethereum.request({
    method: "eth_getBalance",
    params: [address, "latest"],
  });

  return Number(balance).toString(10);
}

export async function signMessage(address, str) {
  const random = Web3.utils.toHex(str);
  const signedMessage = await window.ethereum.request({
    method: "personal_sign",
    params: [random, address],
  });
  return { random: str, signedMessage };
}

export async function transfer(transactionParameters) {
  // const transactionParameters = {
  //   nonce: '0x00', // ignored by MetaMask
  //   gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
  //   gas: '0x2710', // customizable by user during MetaMask confirmation.
  //   to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
  //   from: ethereum.selectedAddress, // must match user's active address.
  //   value: '0x00', // Only required to send ether to the recipient from the initiating external account.
  //   data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
  //   chainId: '0x3' // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  // }
  // txHash is a hex string
  // As with any RPC call, it may throw an error
  console.log("--- metamask transfer ---", transactionParameters);
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  });
  return txHash;
}

export async function transferContract({ contractAddress, from, to, value }) {
  const web3 = window.web3 ? new Web3(window.web3.currentProvider) : new Web3();
  const contract = new web3.eth.Contract(ERC20ABI, contractAddress);
  const result = await contract.methods.transfer(to, value).send({
    // from: Web3.utils.toChecksumAddress(from)
    from,
  });
  return result;
}
