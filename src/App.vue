<template>
  <div id="app">
    {{ researchData.length }} Total Articles
    <vue-autosuggest
      ref="searchInput"
      v-model="lowLevel"
      @click="filterLowLevel"
      @selected="selectHandler"
      :inputProps="inputProps"
      :suggestions="filteredSuggestions"
      :getSuggestionValue="s => s.item.label"
      :shouldRenderSuggestions="showSearchSuggestions"
    >
      <template slot="after-input">
        <a
          class="clear-search-button"
          :for="inputProps.id"
          href="#"
          @click="resetSuggestions"
        >&#10006;</a>
      </template>
      <template slot-scope="{ suggestion }">
        <div>
          <b>{{suggestion.item.label}}</b>
        </div>
      </template>
    </vue-autosuggest>
    <div v-if="selected">
      <Articles :articles="researchData" :lowLevelTerm="selectedTerm" :category="category" />
    </div>
  </div>
</template>

<script>
import json from "./assets/area-research-data.json";
import Articles from "./components/Articles";
import { lowLevelTermsArray } from "./assets/terms";
import { VueAutosuggest } from "vue-autosuggest";
export default {
  name: "App",
  components: {
    Articles,
    VueAutosuggest
  },
  data: function() {
    return {
      researchData: json,
      lowLevel: "",
      showSearchResults: false,
      selected: null,
      category: null,
      selectedTerm: null,
      showResultsTable: false,
      inputProps: {
        id: "autosuggest__input",
        placeholder: "Search Term",
        class: "ddd"
      },
      termsArray: lowLevelTermsArray
    };
  },
  methods: {
    filterLowLevel: function() {},
    selectHandler(item) {
      this.showResultsTable = true;
      if (item) {
        this.lowLevel = item.item.label;
        this.category = item.item.category;

        this.selected = item.item;
        this.selectedTerm = this.lowLevel;
      }
    },
    showSearchSuggestions() {
      if (this.lowLevel != "" && this.showSearchResults === false) {
        return true;
      }
    },
    resetSuggestions() {
      console.log("reset");
      this.lowLevel = "";
      this.selected = null;
      this.showResultsTable = false;
    }
  },
  computed: {
    filteredSuggestions() {
      return [
        {
          data: this.termsArray.filter(item => {
            this.suggestedLabel =
              item.label.toLowerCase().indexOf(this.lowLevel.toLowerCase()) >
              -1;
            return (
              item.label.toLowerCase().indexOf(this.lowLevel.toLowerCase()) > -1
            );
          })
        }
      ];
    }
  }
};
</script>

<style>
#autosuggest {
  max-width: 240px;
  position: relative;
}
ul[role="listbox"] {
  max-height: 100px;
  overflow-y: scroll;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  list-style: none;
  text-align: left;
}
.clear-search-button {
  position: absolute;
  right: 0;
  top: 5px;
  bottom: 0;
  text-decoration: none;
  color: black;
}
</style>
