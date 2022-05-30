export async function connect() {
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
