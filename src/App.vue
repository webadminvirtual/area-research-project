<template>
  <div id="app">
    {{ researchData.length }} Total Articles
    <vue-autosuggest
      ref="searchInput"
      v-model="lowLevel"
      @click="filterLowLevel"
      @selected="selectHandler"
      :inputProps="inputProps"
      :on-selected="onSelected"
      :suggestions="filteredSuggestions"
      :getSuggestionValue="s => s.item.label"
      :shouldRenderSuggestions="showSearchSuggestions"
      :class="{ disabled: lockSearchResults }"
    >
      <template slot="after-input">
        <a
          class="clear-search-button"
          :for="inputProps.id"
          @click="resetSuggestions"
          >&#10006;</a
        >
      </template>
      <template slot-scope="{ suggestion }">
        <div>
          <b class="suggestion-item">{{ suggestion.item.label }}</b>
        </div>
      </template>
    </vue-autosuggest>
    <div v-if="selected">
      <Articles
        :articles="researchData"
        :lowLevelTerm="selectedTerm"
        :category="category"
        v-on:updateSearchTerm="updateSearchTerm"
      />
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
      lockSearchResults: false,
      inputProps: {
        id: "autosuggest__input",
        placeholder: "Search Term",
        class: "ddd",
        onInputChange: this.onInputChange
      },
      termsArray: lowLevelTermsArray
    };
  },
  methods: {
    updateSearchTerm(item) {
      this.lowLevel = item;
      this.selectedTerm = item;
    },
    filterLowLevel: function() {},
    selectHandler(item) {
      this.showResultsTable = true;
      this.lockSearchResults = true;
      if (item) {
        this.lowLevel = item.item.label;
        this.category = item.item.category;

        this.selected = item.item;
        this.selectedTerm = this.lowLevel;
      }
    },
    showSearchSuggestions() {
      if (this.lowLevel != "" && this.lockSearchResults === false) {
        return true;
      }
    },
    resetSuggestions() {
      this.lowLevel = "";
      this.selected = null;
      this.showResultsTable = false;
      this.lockSearchResults = false;
    },
    onSelected(option) {
      this.selected = option.item;
    },
    onInputChange(text) {
      if (text === "" || text === undefined) {
        return;
      }
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
#app {
  min-height: 500px;
}
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
  right: 10px;
  top: 2px;
  bottom: 0;
  font-size: 24px;
  cursor: pointer;
}
.disabled input {
  pointer-events: none;
  opacity: 0.5;
}
.autosuggest__results .autosuggest__results-item:active,
.autosuggest__results .autosuggest__results-item:hover,
.autosuggest__results .autosuggest__results-item:focus,
.autosuggest__results
  .autosuggest__results_item.autosuggest__results-item-highlighted {
  background-color: #efefef;
}
</style>
