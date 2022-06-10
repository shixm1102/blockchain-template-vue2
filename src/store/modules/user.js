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
  SET_ADDRESS(state, { address, flag }) {
    state.address = address;
    if (address) {
      if (flag) {
        setCookie("address", address, 30);
        setTimeout(() => {
          clearCookie();
          state.address = undefined;
        }, 1800000);
      } else {
        setInterval(() => {
          const addressCache = getCookie("address");
          if (!addressCache) {
            state.address = undefined;
          }
        }, 60000);
      }
    } else {
      clearCookie();
    }
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
    if (typeof window.ethereum !== "undefined") {
      commit("SET_METAMASK", true);
      // const address = window.ethereum.selectedAddress;
      const addressCache = getCookie("address");
      // console.log(address, addressCache);
      if (addressCache) {
        //   const chainId = window.ethereum.chainId;
        //   commit("SET_ADDRESS", address);
        //   commit("SET_CHAINID", chainId);
        // } else if (flag) {
        connect().then(({ address, chainId }) => {
          commit("SET_ADDRESS", { address, flag });
          commit("SET_CHAINID", chainId);
        });
      } else if (flag) {
        connect().then(({ address, chainId }) => {
          commit("SET_ADDRESS", { address, flag: true });
          commit("SET_CHAINID", chainId);
        });
      }
      window.ethereum.on("chainChanged", () => window.location.reload());
      window.ethereum.on("accountsChanged", () => window.location.reload());
    } else {
      commit("SET_METAMASK", false);
      throw Error("Please install MetaMask.");
    }
  },
  logout({ commit }) {
    commit("SET_ADDRESS", { address: undefined });
    commit("SET_CHAINID", undefined);
    commit("SET_BALANCE", 0);
  },
};

export default {
  state,
  mutations,
  actions,
};
