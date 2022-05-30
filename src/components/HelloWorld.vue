<template>
  <div class="hello">
    <h1 v-if="address">{{ address | formatAddress }}</h1>
    <h2>{{ isSupportChain && "请切换至支持的公链" }}</h2>
    <button @click="login">connect Wallet</button>
    <button @click="logout">logout</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "HelloWorld",
  computed: {
    ...mapGetters(["address"]),
  },
  methods: {
    ...mapActions(["login", "logout"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  margin: 40px 0 0;
  color: red;
}
</style>
