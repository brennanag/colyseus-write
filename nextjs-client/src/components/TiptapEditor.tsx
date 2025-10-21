"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
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

  // Use semantic tokens from your theme
  const editorBg = "bg.card";
  const editorBorder = "border.default";
  const editorText = "text.main";
  const bubbleMenuBg = "bg.card";

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
        minH="200px"
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
    <Box position="relative">
      {/* Bubble Menu that appears when selecting text */}
      {editor && (
        <BubbleMenu editor={editor}>
          <HStack
            spacing={1}
            p={2}
            bg={bubbleMenuBg}
            borderRadius="md"
            shadow="md"
            border="1px"
            borderColor={editorBorder}
          >
            <Button
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              colorScheme={editor.isActive("bold") ? "blue" : "gray"}
              variant={editor.isActive("bold") ? "solid" : "outline"}
              isDisabled={isDisabled}
            >
              B
            </Button>
            <Button
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              colorScheme={editor.isActive("italic") ? "blue" : "gray"}
              variant={editor.isActive("italic") ? "solid" : "outline"}
              isDisabled={isDisabled}
            >
              I
            </Button>
            <Button
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              colorScheme={editor.isActive("bulletList") ? "blue" : "gray"}
              variant={editor.isActive("bulletList") ? "solid" : "outline"}
              isDisabled={isDisabled}
            >
              List
            </Button>
          </HStack>
        </BubbleMenu>
      )}

      {/* Editor Content */}
      <Box
        border="1px"
        borderColor={editorBorder}
        borderRadius="md"
        bg={editorBg}
        minH="200px"
        sx={{
          "& .ProseMirror": {
            outline: "none",
            minHeight: "180px",
            fontFamily: "body",
            fontSize: "md",
            lineHeight: "1.6",
            padding: "1rem",
            color: editorText,
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
            "&:focus": {
              borderColor: "blue.500",
            },
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
}
