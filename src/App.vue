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
      :shouldRenderSuggestions="checkEmptyInput"
      @focus="checkEmptyInput"
    >
      <template slot-scope="{ suggestion }">
        <div>
          <b>{{suggestion.item.label}}</b>
        </div>
      </template>
    </vue-autosuggest>
    <div v-if="selected" >
      <Articles :articles="researchData" :lowLevelTerm="selectedTerm" :category="category" />
    </div>
    <!-- <button class="button" @click="clickHanderl">Search</button> -->
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
      inputProps: {
        id: "autosuggest__input",
        placeholder: "Search Term",
        class: "ddd"
      },
      termsArray: lowLevelTermsArray
    };
  },
  methods: {
    filterLowLevel: function() {
      // this.lowLevel = this.$refs.searchInput.value;
    },
    selectHandler(item) {
      if (item) {
        this.lowLevel = item.item.label;
        this.category = item.item.category;

        this.selected = item.item;
        this.selectedTerm = this.lowLevel
      }
    },
    clickHanderl() {
      if (this.filteredSuggestions.data.length === 1) {
        this.lowLevel = this.filteredSuggestions.data[0].label;
        this.category = this.filteredSuggestions.data[0].category;
      }
    },
    checkEmptyInput() {
      return this.lowLevel != "";
    }
  },
  computed: {
    filteredSuggestions() {
      return [
        {
          data: this.termsArray.filter(item => {
            this.suggestedLabel = item.label.toLowerCase().indexOf(this.lowLevel.toLowerCase()) > -1
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
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
</style>
