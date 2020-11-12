<template>
  <div id="app" class="container">
    <h3 class="text-center">{{ researchData.length }} Total Articles</h3>
    <p>
      XYZ tool is a searchable database of {{ researchData.length }} articles
      pulled since 2017. AREA members can search through this database and
      access relevant URL links to research, abstracts, and graphical
      information about AR enterprise research.
    </p>
    <a
      class="top-link"
      href="/area-research/area-research-agenda/name-of-tool/explore-categories/"
      >Explore all main topics</a
    >
    <vue-autosuggest
      ref="searchInput"
      v-model="lowLevel"
      @click="filterLowLevel"
      @selected="selectHandler"
      :inputProps="inputProps"
      :on-selected="onSelected"
      :suggestions="filteredSuggestions"
      :getSuggestionValue="(s) => s.item.label"
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
          <span class="suggestion-item">{{ suggestion.item.label }}</span>
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
    VueAutosuggest,
  },
  data: function () {
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
        onInputChange: this.onInputChange,
      },
      termsArray: lowLevelTermsArray,
    };
  },
  methods: {
    updateSearchTerm(item) {
      this.lowLevel = item;
      this.selectedTerm = item;
    },
    filterLowLevel: function () {},
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
    },
  },
  computed: {
    filteredSuggestions() {
      return [
        {
          data: this.termsArray.filter((item) => {
            return (
              item.label.toLowerCase().indexOf(this.lowLevel.toLowerCase()) > -1
            );
          }),
        },
      ];
    },
  },
};
</script>

<style>
#app {
  min-height: 500px;
  max-width: 100%;
  overflow: hidden;
}
#autosuggest {
  width: 300px;
  position: relative;
}
#autosuggest__input {
  width: 300px;
  background-color: #f1f1f1;
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
  border-radius: 10em;
}
ul[role="listbox"] {
  max-height: 100px;
  overflow-y: scroll;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  list-style: none;
  text-align: left;
  padding-left: 0;
}
.clear-search-button {
  position: absolute;
  top: 5px;
  font-size: 20px;
  cursor: pointer;
  left: 300px;
}
.disabled input {
  pointer-events: none;
  opacity: 0.5;
}
.autosuggest__results .autosuggest__results-item:active,
.autosuggest__results .autosuggest__results-item:hover,
.autosuggest__results .autosuggest__results-item:focus,
.autosuggest__results-item--highlighted.autosuggest__results-item {
  background-color: #efefef;
}
.top-link {
  float: right;
}
.text-center {
  text-align: center;
}
.suggestion-item {
  font-family: "Lato", sans-serif;
  font-size: 20px;
  color: #0a3a4a;
  font-weight: 300;
  line-height: 17px;
  margin-bottom: 3px;
}
#autosuggest-autosuggest__results {
  border: 1px solid;
  padding-left: 5px;
}
</style>
