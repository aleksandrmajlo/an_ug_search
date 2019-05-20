<template>
  <div class="block_linl_widget">
    <div class="item" v-for="(item,key)  in datas " :key="key">
      <a :href="item.link">{{item.name}}</a> -
      <span class="count">{{item.count}}</span>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import { TweenMax } from "greensock";
if (location.port) {
  var urlPropertytype = "http://anugorod.local/wp-json/wp/v2/tm-property_type";
} else {
  let fullAddress =
    location.protocol +
    "//" +
    location.hostname +
    (location.port ? ":" + location.port : "");
  var urlPropertytype = fullAddress + "/wp-json/wp/v2/tm-property_type";
}
export default {
  data() {
    return {
      datas: []
    };
  },
  mounted() {
    axios.get(urlPropertytype).then(response => {
      this.datas = response.data;
    });
  }
};
</script>
<style lang="scss">
.block_linl_widget {
  box-sizing: border-box;
  .item {
    margin-bottom: 10px;
    .count {
      font-weight: bold;
      font-size: 110%;
    }
  }
}
</style>


