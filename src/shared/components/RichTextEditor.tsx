import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
import type { Editor as TinyMCEEditor } from 'tinymce';

export default function RichTextEditor() {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [content, setContent] = useState('');

  const handleSave = () => {
    const editor = editorRef.current;
    const html = editor?.getContent();
    console.log("HTML content to save:", html);
    setContent(html!);
    // TODO: Send HTML to backend
  };

  return (
    <div>
      <Editor
        apiKey={import.meta.env.VITE_TINY_API}
        onInit={(_, editor) => (editorRef.current = editor)}
        value={content}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar:
            'undo redo | fontselect fontsizeselect | ' +
            'bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'blockquote subscript superscript | link image media table code | ' +
            'removeformat | help',
          content_style:
            'body { font-family: Poppins, sans-serif; }',
        }}
        onEditorChange={(newValue: string) => setContent(newValue)}
      />

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Lesson
      </button>

      <h2 className="mt-6 text-lg font-semibold">Preview:</h2>
      <div
        className="border p-4 mt-2"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
