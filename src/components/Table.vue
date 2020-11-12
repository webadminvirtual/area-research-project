<template>
  <transition appear name="fade">
    <table style="width:100%;" v-if="articles.length != 0">
      <thead>
        <tr>
          <td>Year</td>
          <td>Title</td>
          <td>DOI/Publisher Link</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(article, index) in sortedArticles(param)" v-bind:key="index">
          <td>{{ article["Publication year"] }}</td>
          <td class="article-title">
            <a @click="updateArticle(article)">{{ article["Title"] }}</a>
          </td>
          <td>
            <a :href="article.DOI">Article Link</a>
          </td>
        </tr>
      </tbody>
    </table>
  </transition>
</template>
<script>
export default {
  props: {
    articles: Array
  },
  data() {
    return {
      param: "Publication year"
    };
  },
  methods: {
    sortedArticles() {
      return this.articles.sort((a, b) => a["Publication year"] < b["Publication year"]);
    },
    updateArticle(article) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      this.$emit("set_article", article);
    }
  }
};
</script>
<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>