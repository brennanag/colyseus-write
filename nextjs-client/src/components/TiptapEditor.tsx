"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Box, Button, HStack } from "@chakra-ui/react";
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

  // Don't render until mounted (client-side only)
  if (!mounted) {
    return (
      <Box
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
        p={3}
        bg="white"
        minH="150px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="gray.500"
      >
        Loading editor...
      </Box>
    );
  }

  if (!editor) {
    return null;
  }

  return (
    <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} bg="white">
      {/* Toolbar */}
      <HStack gap={2} mb={4} flexWrap="wrap">
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          colorScheme={editor.isActive("bold") ? "blue" : "gray"}
          variant={editor.isActive("bold") ? "solid" : "outline"}
          disabled={isDisabled}
        >
          B
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          colorScheme={editor.isActive("italic") ? "blue" : "gray"}
          variant={editor.isActive("italic") ? "solid" : "outline"}
          disabled={isDisabled}
        >
          I
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          colorScheme={editor.isActive("bulletList") ? "blue" : "gray"}
          variant={editor.isActive("bulletList") ? "solid" : "outline"}
          disabled={isDisabled}
        >
          List
        </Button>
      </HStack>

      {/* Editor Content */}
      <Box
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
        p={3}
        bg="white"
        minH="150px"
        sx={{
          "& .ProseMirror": {
            outline: "none",
            minHeight: "120px",
            fontFamily: "body",
            fontSize: "md",
            lineHeight: "1.6",
            "& p": {
              marginBottom: "0.75em",
            },
            "& ul, & ol": {
              paddingLeft: "1.5em",
              marginBottom: "0.75em",
            },
            "& h1, & h2, & h3, & h4, & h5, & h6": {
              fontWeight: "bold",
              marginBottom: "0.5em",
            },
            "& strong": {
              fontWeight: "bold",
            },
            "& em": {
              fontStyle: "italic",
            },
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
}
