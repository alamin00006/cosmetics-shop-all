import { useRef, useState } from "react";
import { Editor } from "primereact/editor";

const TextEditor2 = ({ setEditorValue, editorValue }) => {
  const [height, setHeight] = useState(300);
  const editorRef = useRef(null);
  const resizeRef = useRef(null);
  const isResizing = useRef(false);

  // Handle mouse down to start resizing
  const handleMouseDown = (e) => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Handle mouse move to resize the editor
  const handleMouseMove = (e) => {
    if (!isResizing.current || !editorRef.current) return;

    const newHeight = e.clientY - editorRef.current.getBoundingClientRect().top;
    if (newHeight >= 100 && newHeight <= 1500) {
      setHeight(newHeight);
    }
  };

  // Handle mouse up to stop resizing
  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={editorRef}
      style={{
        position: "relative",
        border: "1px solid #ccc",
        padding: "8px",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      <Editor
        value={editorValue}
        onTextChange={(e) => setEditorValue(e.htmlValue)}
        style={{ height: `${height}px` }}
      />

      <div
        ref={resizeRef}
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          height: "5px",
          cursor: "row-resize",
          backgroundColor: "#e0e0e0",
        }}
      ></div>
    </div>
  );
};

export default TextEditor2;
