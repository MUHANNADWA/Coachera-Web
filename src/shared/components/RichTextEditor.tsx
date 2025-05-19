import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function RichTextEditor() {
  const [value, setValue] = useState('');

  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],
      ["clean"],
    ]
  };

  const formats = [
    "font", "size",
    "bold", "italic", "underline", "strike",
    "color", "background",
    "script",
    "blockquote", "code-block",
    "list", "bullet", "align",
    "link", "image", "video", "formula",
  ];


  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        onBlur={() => console.log(value)}
        modules={modules}
        formats={formats}
        placeholder="Type your response here..."
      />
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: value }}
      >
        {/* value : {value} */}
      </div>
    </>
  );
}
