import { ETH_CHAINS_INFO } from "@/config/chains";
import { connect } from "@/utils/metamask";
import { setCookie, getCookie, clearCookie } from "@/utils/cookie";

const state = {
  chainId: undefined,
  address: undefined,
  balance: 0,
  isSupportChain: false,
};
const mutations = {
  SET_ADDRESS(state, address) {
    console.log("SET_ADDRESS", address);
    state.address = address;
    address ? setCookie("address", address, 15) : clearCookie();
  },
  SET_CHAINID(state, chainId) {
    state.chainId = chainId;
    state.isSupportChain =
      chainId && Object.keys(ETH_CHAINS_INFO).includes(chainId.toString());
  },
  SET_BALANCE(state, balance) {
    state.balance = balance;
  },
};
const actions = {
  login({ commit }, flag = true) {
    console.log("---login---");
    if (typeof window.ethereum !== "undefined") {
      const address = window.ethereum.selectedAddress;
      const addressCache = getCookie("address");
      if (address && addressCache) {
        const chainId = window.ethereum.chainId;
        commit("SET_ADDRESS", address);
        commit("SET_CHAINID", chainId);
      } else if (flag) {
        connect().then(({ address, chainId }) => {
          commit("SET_ADDRESS", address);
          commit("SET_CHAINID", chainId);
        });
      }
      window.ethereum.on("chainChanged", () => window.location.reload());
      window.ethereum.on("accountsChanged", () => window.location.reload());
    } else {
      throw Error("Please install MetaMask.");
    }
  },
  logout({ commit }) {
    commit("SET_ADDRESS", undefined);
    commit("SET_CHAINID", undefined);
    commit("SET_BALANCE", 0);
  },
};

export default {
  state,
  mutations,
  actions,
};
