<template>
  <div>
    {{ filteredArticles().length }} Articles matching term
    {{ lowLevelTerm }} which is part of the main topic {{ category }}
    <button v-if="selectedArticle" @click="selectedArticle = null">
      Back to Results
    </button>

    <div class="articles">
      <table
        v-if="!selectedArticle && filteredArticles().length != 0"
        style="width:100%;"
      >
        <thead>
          <tr>
            <td>Year</td>
            <td>Title</td>
            <td>DOI/Publisher Link</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(article, index) in filteredArticles()" v-bind:key="index">
            <td>{{ article["Publication year"] }}</td>
            <td class="article-title">
              <a @click="selectedArticle = article">{{ article["Title"] }}</a>
            </td>
            <td>
              <a :href="article.DOI">Article Link</a>
            </td>
          </tr>
        </tbody>
      </table>
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
      v-on:update_search="updateSearch"
      :lowLevelTerm="lowLevelTerm"
    />
  </div>
</template>
<script>
import Article from "./Article-Single";
import Coocurences from "./Cooccurences";

export default {
  name: "Articles",
  components: {
    Article,
    Coocurences
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
}
.articles {
  overflow-y: scroll;
  width: 80vw;
  margin-left: auto;
  margin-right: auto;
  min-height: 300px;
  max-height: 300px;
}
.cooccurences {
  width: 80vw;
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
</style>