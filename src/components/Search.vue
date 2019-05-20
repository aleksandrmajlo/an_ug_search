<template>
  <div id="cont">
    <label>
      <span class="tm-re-search-form__label">Местоположение</span>
      <input type="hidden" name="property_location" :value="property_location">
      <input
        type="text"
        v-model="property_location"
        class="tm-re-search-form__field"
        placeholder="Например: Кабардинка"
        @focus="showTip=true"
      >
    </label>
    <div class="overTip" v-show="showTip">
      <table>
        <tbody v-if="сitySearch.length>0">
          <tr
            v-for="(item,i) in city"
            :key="i"
            @click="complete(i)"
            v-if="item.indexOf(property_location) != -1"
          >
            <td>{{ item }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td>Совпадений не найдено</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      city: [],
      property_location: "",
      showTip: false
    };
  },
  created() {
    let urlPropertytype = "";
    if (location.port) {
      urlPropertytype = "http://anugorod.local/wp-admin/admin-ajax.php";
    } else {
      let fullAddress =
        location.protocol +
        "//" +
        location.hostname +
        (location.port ? ":" + location.port : "");
      urlPropertytype = fullAddress + "/wp-admin/admin-ajax.php";
    }
    const formData = new FormData();
    formData.append("action", "getcity");
    axios
      .post(urlPropertytype, formData)
      .then(response => {
        this.city = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    document.addEventListener("click", this.documentClick);
  },
  computed: {
    сitySearch() {
      let results = [];
      this.city.forEach(element => {
        if (element.indexOf(this.property_location) != -1) {
          results.push(element);
        }
      });
      return results;
    },
    valSearch() {
      return this.property_location;
    }
  },
  methods: {
    complete(i) {
      this.property_location = this.city[i];
      this.showTip = false;
    },
    documentClick(e) {
      let el = document.getElementById("cont");
      let target = e.target;
      if (el !== target && !el.contains(target)) {
        this.showTip = false;
      }
    }
  }
};
</script>

<style lang="scss" >
.tm-re-search-form__group {
  position: relative;
  .overTip {
    position: absolute;
    left: 0;
    top: 70px;
    background: #ffffff;
    color: #000;
    z-index: 22;
    width: 100%;
    width: 100%;
    -webkit-box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    max-height: 250px;
    overflow-y: scroll;
    table {
      margin-bottom: 0;
      width: 100%;
      tr {
        cursor: pointer;
        &:hover {
          background: rgba(0, 0, 0, 0.5);
          color: rgb(0, 175, 255);
        }
        td {
          padding: 2px 10px;
        }
      }
    }
  }
  #cont {
    width: 100%;
    position: relative;
  }
}
body.homeCustom {
  .overTip {
    top: 50px !important;
  }
}
</style>


