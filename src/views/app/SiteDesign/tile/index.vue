<template>
  <div class="content">
      <div class="container">
          <div class="info-box">
              <div class="view"></div>
              <p>Box</p>
          </div>
          <div class="info-box">
              <div class="view"></div>
              <p>Box</p>
          </div>
          <div class="info-box">
              <div class="view"></div>
              <p>Box</p>
          </div>
          <div class="info-box">
              <div class="view"></div>
              <p>Box</p>
          </div>
             <div class="info-box">
              <div class="view"></div>
              <p>Box</p>
          </div>
          <div class="info-box">
              <div class="view"></div>
              <p>Box</p>
          </div>
          <div class="info-box">
              <div class="view"></div>
              <p>Box</p>
          </div>
          <div class="info-box">
              <div class="view"></div>
              <p>Box</p>
          </div>
      </div>
  </div>
</template>

<script>
import toolTypeService from "@/services/toolType.service";
import Vuetable from "vuetable-2";

export default {
  components: {
    Vuetable
  },
  data() {
    return {
      toolTypes: [],
      fields: [
        {
          name: "",
          title: "<span>Serial No.</span>",
          sortField: "",
          dataClass: ""
        },
        {
          name: "",
          sortField: "",
          title: "<span>Clmn 2<span>",
          dataClass: ""
        },
        {
          name: "",
          sortField: "",
          title: "<span>Clmn 3</span>",
          dataClass: ""
        }
      ]
    };
  },
}
</script>


<style>
    .content {
        background: #fff;
        border-radius: 5px;
    }
   .content .container {
        display: grid;
        width: 70%;
        margin: auto;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 25% !important;
    }

    .content .container .info-box {
        margin: 50px 0 30px 0;
        border: 2px solid #4cb6bb;
        border-radius: 5px
    }

    .content .container .info-box .view {
        margin: 20px 20px 30px 20px;
        border: 2px solid #4cb6bb;
        height: 200px;
        border-radius: 5px
    }

    .content .container .info-box p {
        text-align: center;
        width: 100%;
        margin: 0 0 70px 0;
        font-size: 20px !important;
        color: #4cb6bb
    }

</style>