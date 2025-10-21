"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect } from "react";

interface TiptapEditorProps {
  onContentChange?: (content: string) => void;
  initialContent?: string;
  isDisabled?: boolean;
}

export default function TiptapEditor({
  onContentChange,
  initialContent = "",
  isDisabled = false,
}: TiptapEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    editable: !isDisabled,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onContentChange?.(html);
    },
    onCreate: ({ editor }) => {
      const html = editor.getHTML();
      onContentChange?.(html);
    },
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(!isDisabled);
    }
  }, [editor, isDisabled]);

  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  if (!mounted) {
    return (
      <div className="border border-gray-300 rounded-md p-3 bg-white min-h-[200px] flex items-center justify-center text-gray-500">
        Loading editor...
      </div>
    );
  }

  if (!editor) {
    return null;
  }

  return (
    <div className="relative">
      {/* Bubble Menu that appears when selecting text */}
      {editor && (
        <BubbleMenu editor={editor}>
          <div className="flex space-x-1 p-2 bg-white rounded-md shadow-md border border-gray-300">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={isDisabled}
              className={`px-2 py-1 text-sm rounded ${
                editor.isActive("bold")
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 border border-gray-300"
              } ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-300"
              }`}
            >
              B
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={isDisabled}
              className={`px-2 py-1 text-sm rounded ${
                editor.isActive("italic")
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 border border-gray-300"
              } ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-300"
              }`}
            >
              I
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              disabled={isDisabled}
              className={`px-2 py-1 text-sm rounded ${
                editor.isActive("bulletList")
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 border border-gray-300"
              } ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-300"
              }`}
            >
              List
            </button>
          </div>
        </BubbleMenu>
      )}

      {/* Editor Content */}
      <div className="border border-gray-300 rounded-md bg-white min-h-[200px]">
        <EditorContent
          editor={editor}
          className="prose max-w-none min-h-[180px] p-4 outline-none text-gray-900 font-sans text-base leading-relaxed"
        />
      </div>
    </div>
  );
}
