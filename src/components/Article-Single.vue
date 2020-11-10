<template>
  <div>
    <div class="article-single">
      {{ article.Title }}
      <br />
      <hr />
      {{ article.Abstract}}
    </div>
    <hr>
    <h4>Related Articles</h4>
    <ul>
      <li v-for="(entry, index) in getRelatedArticles()" v-bind:key="index"> <a @click="updateArticle(entry)">{{ entry['Title']}}</a></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Article",
  props: {
    article: Object,
    articles: Array,
  },
  data() {
    return {
      relatedIds: null,
      relatedArticles: null,
      selectedArticle: null
    };
  },
  methods: {
    getRelatedArticles() {
    this.relatedIds = this.article["Top20Abs"];

      return this.articles.filter(article => {

        let match = this.relatedIds.includes(article["Index"]);
        return match;
      });
    },
    updateArticle(entry) {
        this.$emit('set_article', entry)
    },
    resetResults() {
        this.$emit('reset_results')
    }
  }
};
</script>