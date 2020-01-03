<template>
  <div class="content">
      <div  v-for="site in sites" v-bind:key="site.id" class="container">
        <b-card class="mb-4" no-body>
            <div class="position-relative">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRRZhtlTg6PZNaGCLS4NFesp4_QYxw5_Qjxya3tmTyUqfvQQzSD" class="card-img-top"/>
            </div>
            <b-card-body>
                <h6 class="mb-4 card-subtitle">{{name}}</h6>
            </b-card-body>
        </b-card>
      </div>
  </div>
</template>

<script>
import siteService from "@/services/site.service";

export default {

  data() {
    return {
      sites : []
    };
  },
  methods : {
    loadSites() {
        siteService.read().then(response => {
        this.sites = response.sites
      });
    }
  },
  mounted(){
      this.loadSites();
  }
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
        grid-column-gap: 20% !important;
    }

    .content .container .info-box {
        margin: 50px 0 30px 0;
        border: 2px solid #4cb6bb;
        border-radius: 5px
    }

    .content .container .info-box .view {
        margin: 20px 20px 30px 20px;
        height: 200px;
        border-radius: 5px
    }

    .content .container .info-box .view img {
        width: 100%;
        height: 100%;
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
