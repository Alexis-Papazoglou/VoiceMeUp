import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import "./App.css";

const Autocomplete = ({ models, setModel }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (inputValue) => {
    const trimmedValue = inputValue.trim().toLowerCase();
    const inputLength = trimmedValue.length;

    if (inputLength < 2) {
      return [];
    }

    const maxSuggestions = 10;

    const filteredSuggestions = models
      .filter((model) => model.title.toLowerCase().includes(trimmedValue))
      .slice(0, maxSuggestions);

    return filteredSuggestions;
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    setModel(newValue); // Call the parent's setModel function to update the model value
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderSuggestion = (suggestion) => <div>{suggestion.title}</div>;

  const inputProps = {
    placeholder: "Search for a model. E.g. Elon Musk",
    value,
    onChange: onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => suggestion.title}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={{
        input: "myInput",
        suggestionsContainer: "mySuggestionsContainer",
        suggestion: "mySuggestion",
      }}
    />
  );
};

export default Autocomplete;
