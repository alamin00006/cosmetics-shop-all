import TagsInput from "react-tagsinput";

const Filters = ({ setSearchQuery, setTags, tags, searchName }) => {
  const handleTagsChange = (newTags) => {
    const filteredTags = newTags.filter((tag) => tag.trim());
    setTags(filteredTags);
    setSearchQuery(filteredTags.join(","));
  };

  // Custom render for input to match Tailwind styling
  const renderInput = (props) => {
    return (
      <input
        {...props}
        className="flex-1 border-0 bg-transparent px-2 py-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0"
        placeholder={`${searchName}...`}
      />
    );
  };

  // Custom render for tags to match Tailwind styling
  const renderTag = (props) => {
    const { tag, key, onRemove, getTagDisplayValue } = props;
    return (
      <span
        key={key}
        className="mr-2 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 transition-all duration-200 hover:bg-blue-200"
      >
        {getTagDisplayValue(tag)}
        <button
          type="button"
          onClick={() => onRemove(key)}
          className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-300 text-white hover:bg-blue-400 focus:outline-none"
          aria-label={`Remove ${tag}`}
        >
          ×
        </button>
      </span>
    );
  };

  // Custom layout to add Clear All button
  const renderLayout = (tagComponents, inputComponent) => {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {tagComponents}
        {inputComponent}
        {tags.length > 0 && (
          <button
            type="button"
            onClick={() => handleTagsChange([])}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            Clear All
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      <TagsInput
        value={tags}
        onChange={handleTagsChange}
        inputProps={{
          id: "search",
          "aria-describedby": "search-help",
        }}
        renderInput={renderInput}
        renderTag={renderTag}
        renderLayout={renderLayout}
        addKeys={[13, 188]} // Enter, Comma
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200"
      />
    </div>
  );
};

export default Filters;
