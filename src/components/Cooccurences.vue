<template>
  <div class="cooccurences">
    <span
      @click="update_search(value[0])"
      class="term"
      v-for="(value, index) in getRelatedTerms()"
      v-bind:key="index"
      >{{ value[0] }} - <span class="term-count">{{ value[1] }}</span></span
    >
  </div>
</template>
<script>
import { terms } from "../assets/co-occurences";

export default {
  props: {
    lowLevelTerm: String
  },
  data() {
    return {
      terms
    };
  },
  methods: {
    getRelatedTerms() {
      let sortable = [];
      let term = this.terms.find(a => a.term === this.lowLevelTerm);
      for (var t in term) {
        sortable.push([t, term[t]]);
      }

      var sortTags = sortable.sort(function(a, b) {
        return a[1] - b[1];
      });
      sortTags = sortTags.reverse().slice(0, 10);
      return sortTags;
    },
    update_search(item) {
      this.$emit("update_search", item); //Send the new search term up to the Articles component.
    }
  }
};
</script>