<template>
  <div>
    <span v-for="(category, index) in topics" :key="index">
      <button class="accordion">{{ category.term }}</button>
      <div class="panel">
        <h5>Search terms within this category:</h5>
        <span class="tagsList">
          <li v-for="(tag, index) in category.lowlevel" :key="index">
            <a v-bind:href="getLink(tag)" class="button tag-list">{{ tag }}</a>
          </li>
        </span>
      </div>
    </span>
  </div>
</template>
<script>
import { topics } from "../assets/topics";
export default {
  data() {
    return {
      topics,
    };
  },
  methods: {
    getLink(tag) {
      return (
        "/area-research/search-tool/?lowLevelTerm=" + tag.replace(/ /g, "+")
      );
    },
  },
};
</script>
<style scoped>
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
  text-transform: capitalize;
}

.active,
.accordion:hover {
  background-color: #ccc;
}

.panel {
  padding: 0 18px;
  display: none;
  background-color: white;
  overflow: hidden;
}

.button.tag-list {
  background: #eee;
  color: black;
  font-weight: bold;
  margin-right: 10px;
  margin: 10px;
  padding: 10px;
  height: 10px;
  text-decoration: none;
  text-transform: capitalize;
}

.tagsList {
  display: flex;
  flex-wrap: wrap;
}

li {
  margin-bottom: 20px;
  margin-top: 20px;
  list-style: none;
}
</style>