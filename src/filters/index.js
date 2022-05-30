import Vue from "vue";
import * as filter from "./filter";

Object.keys(filter).forEach((k) => Vue.filter(k, filter[k]));

Vue.prototype.$toDecimal = Vue.filter("toDecimal");
Vue.prototype.$fromToken = Vue.filter("fromToken");
Vue.prototype.$toToken = Vue.filter("toToken");
Vue.prototype.$formatAddress = Vue.filter("formatAddress");
