// https://github.com/sravimohan/shandcn-ui-extensions

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import EditorToolbar from "./toolbar/editor-toolbar";

interface EditorProps {
  content: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Editor = ({ content, placeholder, onChange }: EditorProps) => {
  const editor = useEditor({
    // StarterKit includes Link. Its defaults (open on click, autolink, link on
    // paste, target="_blank" with rel="noopener noreferrer nofollow") are what we want.
    extensions: [StarterKit],
    // Render on the client only, so the server and client HTML match.
    immediatelyRender: false,
    // The toolbar reads editor.isActive()/can() while rendering, so it needs a
    // re-render on every transaction (the default before tiptap 3).
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        class: "focus:outline-hidden",
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return <></>;

  return (
    <div className="prose dark:prose-invert w-full max-w-none rounded-md border border-input bg-background">
      <EditorToolbar editor={editor} />
      <div className="editor">
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
    </div>
  );
};

export default Editor;
