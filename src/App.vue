<template>
  <div  v-if="isLangAlive">
    <router-view></router-view>
    
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  created() {
    this.getdecimal();
    this.getRouteInvited();
    //document.documentElement.style.overflow = 'hidden';
  },
  watch: {
    address: {
      handler(newVal, oldVal) {
        newVal !== "" && this.getBalance(newVal);
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState(["isLangAlive", "address"]),
  },

  methods: {
    ...mapActions(["login", "getdecimal", "getBalance"]),
    // save route query address
    getRouteInvited() {
      const isRoueInvited = sessionStorage.getItem("isRoueInvited");
      if (isRoueInvited === "undefined" || !isRoueInvited) {
        sessionStorage.setItem("isRoueInvited", this.$route.query.address);
      } else {
        sessionStorage.getItem("isRoueInvited");
      }
    },
    delCookie() {
      var keys = document.cookie.match(/[^ =;]+(?==)/g);
      if (keys) {
        for (var i = keys.length; i--; ) {
          document.cookie =
            keys[i] + "=0;path=/;expires=" + new Date(0).toUTCString(); // 清除当前域名下的,例如：m.ratingdog.cn
          document.cookie =
            keys[i] +
            "=0;path=/;domain=" +
            document.domain +
            ";expires=" +
            new Date(0).toUTCString(); // 清除当前域名下的，例如 .m.ratingdog.cn
          document.cookie =
            keys[i] +
            "=0;path=/;domain=ratingdog.cn;expires=" +
            new Date(0).toUTCString(); // 清除一级域名下的或指定的，例如 .ratingdog.cn
        }
      }
    },
    // 锚点跳转
    toPage(id) {
      console.log(id);
      document.querySelector(`#${id}`).scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    },
  },
};
</script>
<style scoped lang="less">
  @import "@/styles/app.less";
  body{
    background: #110E27;
  }
</style>