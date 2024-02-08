// https://github.com/sravimohan/shandcn-ui-extensions

import React from "react"
import { type Editor } from "@tiptap/react"
import {
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react"

import { ToggleGroup, Toolbar } from "@/components/ui/toolbar"

import { Toggle } from "../../toggle"
import { FormatType } from "./format-type"

interface EditorToolbarProps {
  editor: Editor
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  return (
    <Toolbar className="m-0 flex items-center justify-between p-2" aria-label="Formatting options">
      <ToggleGroup className="flex flex-row items-center" type="multiple">
        <Toggle
          size="icon"
          className="mr-1"
          tooltip="Bold"
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          pressed={editor.isActive("bold")}>
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          className="mr-1"
          tooltip="Italic"
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          pressed={editor.isActive("italic")}
          value="italic">
          <Italic className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          className="mr-1"
          tooltip="Strike through"
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          pressed={editor.isActive("strike")}>
          <Strikethrough className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          className="mr-1"
          tooltip="Bullet list"
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          pressed={editor.isActive("bulletList")}>
          <List className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          className="mr-1"
          tooltip="Numbered list"
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          pressed={editor.isActive("orderedList")}>
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          className="mr-1"
          tooltip="Block quote"
          onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          pressed={editor.isActive("blockquote")}>
          <Quote className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          className="mr-1"
          tooltip="Link"
          onPressedChange={() => {
            const url = prompt('Enter the URL');
            if (url) {
              editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            } else if (editor.isActive('link')) {
              editor.chain().focus().unsetLink().run();
            }
          }}
          pressed={editor.isActive('link')}>
          <Link className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          className="mr-1"
          tooltip="Horizontal rule"
          onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="h-4 w-4" />
        </Toggle>

        <FormatType editor={editor} />
      </ToggleGroup>

      <ToggleGroup className="flex flex-row items-center" type="multiple">
        <Toggle
          size="icon"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}>
          <Undo className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}>
          <Redo className="h-4 w-4" />
        </Toggle>
      </ToggleGroup>
    </Toolbar>
  )
}

export default EditorToolbar