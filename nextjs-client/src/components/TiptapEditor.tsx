// components/TiptapEditor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Box, Button, HStack, useColorModeValue } from "@chakra-ui/react";
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

  // Replace the useColorModeValue hooks with your semantic tokens
  const editorBg = "bg.card";
  const editorText = "text.main";
  const editorBorder = "border.default";
  const toolbarBg = "bg.subtle";
  const buttonHover = "action.hover";

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
      <Box
        border="1px"
        borderColor={editorBorder}
        borderRadius="md"
        p={3}
        bg={editorBg}
        minH="150px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="text.subtle"
      >
        Loading editor...
      </Box>
    );
  }

  if (!editor) {
    return null;
  }

  return (
    <Box
      border="1px"
      borderColor="border.default"
      borderRadius="md"
      p={4}
      bg="bg.card"
    >
      {/* Toolbar */}
      <HStack
        gap={2}
        mb={4}
        flexWrap="wrap"
        p={2}
        bg="bg.subtle"
        borderRadius="md"
      >
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          colorScheme={editor.isActive("bold") ? "blue" : "gray"}
          variant={editor.isActive("bold") ? "solid" : "outline"}
          disabled={isDisabled}
          _hover={{ bg: buttonHover }}
        >
          B
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          colorScheme={editor.isActive("italic") ? "blue" : "gray"}
          variant={editor.isActive("italic") ? "solid" : "outline"}
          disabled={isDisabled}
          _hover={{ bg: buttonHover }}
        >
          I
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          colorScheme={editor.isActive("bulletList") ? "blue" : "gray"}
          variant={editor.isActive("bulletList") ? "solid" : "outline"}
          disabled={isDisabled}
          _hover={{ bg: buttonHover }}
        >
          List
        </Button>
      </HStack>

      {/* Editor Content with Chakra styling */}
      <Box
        border="1px"
        borderColor="border.default"
        borderRadius="md"
        p={3}
        bg="bg.card"
        minH="150px"
        sx={{
          "& .ProseMirror": {
            // ... your styles using semantic tokens
            color: "text.main",
            "& p, & ul, & ol, & h1, & h2, & h3": {
              color: "text.main",
            },
            "& code": {
              backgroundColor: "bg.subtle",
              color: "text.main",
            },
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
}
