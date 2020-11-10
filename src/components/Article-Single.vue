<template>
  <div>
    <div class="article-single">
      <h3>{{ article.Title }}</h3>
      <p>{{ article.Author }} - {{ article["Issue Date"] }}</p>
      <a :href="article.DOI">{{ article.DOI }}</a
      ><br />
      <p>{{ article["Conference Name"] }}</p>
      <hr class="mb-4" />
      <h4>Abstract</h4>
      <p>{{ article.Abstract }}</p>

      <div class="wp-block-buttons">
        <div class="wp-block-button">
          <a
            class="wp-block-button__link has-background"
            :href="article.DOI"
            style="background-color:#33a6b2;border-radius:1px"
            target="_blank"
            >Read More</a
          >
        </div>
      </div>
    </div>
    <hr />
    <h4>Related Articles</h4>
    <ul>
      <li
        v-for="(entry, index) in getRelatedArticles()"
        v-bind:key="index"
        class="related-article-title"
      >
        <a @click="updateArticle(entry)">{{ entry["Title"] }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Article",
  props: {
    article: Object,
    articles: Array
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
      this.$emit("set_article", entry);
    },
    resetResults() {
      this.$emit("reset_results");
    }
  }
};
</script>
<style scoped>
.related-article-title {
  cursor: pointer;
  margin-bottom: 5px;
  list-style-type: none;
}
</style>