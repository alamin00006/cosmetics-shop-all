/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({ setEditorValue, editorValue }) => {
  const [height, setHeight] = useState(250);
  const editorRef = useRef(null);

  const handleEditorChange = (content) => {
    setEditorValue(content);
  };
  const handleImageUpload = (callback, value: any, meta: any) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target?.files?.[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    };

    input.click();
  };

  // const handleImageUpload = (callback, value, meta) => {
  //   const input = document.createElement("input");
  //   input.type = "file";
  //   input.accept = "image/*";
  //   input.onchange = (e) => {
  //     const file = e?.target?.files[0] ;
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       callback(reader.result);
  //     };
  //     if (file) {
  //       reader.readAsDataURL(file);
  //     }
  //   };
  //   input.click();
  // };

  return (
    <div
      ref={editorRef}
      style={{
        position: "relative",
        borderRadius: "4px",
        resize: "none",
        overflow: "hidden",
      }}
    >
      <Editor
        apiKey="nvbvxd0cj96xmtdbsjv7bqktdbgfzzu9txnvx4pov58i8q0f"
        value={editorValue}
        onEditorChange={handleEditorChange}
        init={{
          height: height,
          menubar: true,
          plugins: ["advlist", "autolink", "lists", "link", "image", "code"],
          toolbar:
            "undo redo | bold italic | fontselect fontsizeselect | forecolor backcolor | alignleft aligncenter alignright | link image | code",
          file_picker_callback: handleImageUpload,
          fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
          content_style: `
          body, p, span, div {
            color: #000 !important;
            font-size: 16px !important;
            line-height: 1.6 !important;
            font-family: Arial, sans-serif !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        
          p {
            margin: 10px 10px 0 10px !important;
          }
        
          * {
            color: #000 !important;
          }
        `,
        
        }}
      />
    </div>
  );
};

export default TextEditor;
