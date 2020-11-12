<template>
  <div>
    {{ filteredArticles().length }} Articles matching term
    {{ lowLevelTerm }} which is part of the main topic {{ category }}
    <button
      v-if="selectedArticle"
      @click="selectedArticle = null"
    >Back to Results</button>

    <div class="articles" v-if="!selectedArticle">
      <Table :articles="filteredArticles()" v-on:set_article="updateArticle" />
    </div>
    <div v-if="selectedArticle">
      <Article
        :article="selectedArticle"
        :articles="articles"
        v-on:set_article="updateArticle"
        v-on:reset_results="selectedArticle = null"
      />
    </div>
    <Coocurences
      v-if="!selectedArticle"
      v-on:update_search="updateSearch"
      :lowLevelTerm="lowLevelTerm"
    />
  </div>
</template>
<script>
import Article from "./Article-Single";
import Coocurences from "./Cooccurences";
import Table from "./Table";

export default {
  name: "Articles",
  components: {
    Article,
    Coocurences,
    Table
  },
  props: {
    articles: Array,
    lowLevelTerm: String,
    category: String
  },
  data() {
    return {
      selectedArticle: null,
      relatedIds: null
    };
  },
  methods: {
    filteredArticles: function() {
      return this.articles.filter(article => {
        let match = article["LowLevel"].includes(this.lowLevelTerm);
        return match;
      });
    },
    getRelatedArticles: function() {
      return this.articles.filter(article => {
        this.relatedIds = article["Top20Abs"];

        let match = this.relatedIds.includes(article["Index"]);
        return match;
      });
    },
    updateArticle: function(value) {
      this.selectedArticle = value;
    },
    findCooccurence() {
      let sortable = [];
      let term = this.cooccuring.find(a => a.term === this.lowLevelTerm);
      for (var t in term) {
        sortable.push([t, term[t]]);
      }

      var sortTags = sortable.sort(function(a, b) {
        return a[1] - b[1];
      });
      sortTags = sortTags.reverse().slice(0, 10);
      return sortTags;
    },
    updateSearch(item) {
      this.$emit("updateSearchTerm", item); //Pass the search term from the Cooccurences child component up to the main app.
    }
  }
};
</script>
<style>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
tr,
td {
  border: 1px solid;
  padding: 5px;
}
tr:nth-child(2n) {
  background: #eee;
}
.article-title {
  cursor: pointer;
  font-weight: bold;
  font-style: italic;
}
.articles {
  overflow-y: scroll;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  min-height: 300px;
  max-height: 300px;
}
.cooccurences {
  width: 100%;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.term {
  background: gainsboro;
  width: 10%;
  padding: 5px;
  border: 2px solid white;
  text-align: center;
  font-weight: bold;
  font-style: italic;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>