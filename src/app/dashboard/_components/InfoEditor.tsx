import { api } from "@/trpc/react";
import { Button, Group, LoadingOverlay, Space } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { About } from "@prisma/client";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type InfoEditorProps = {
  about: About;
};

export default function InfoEditor(props: InfoEditorProps) {
  const content = props.about.content;
  const [loading, { toggle: toggleLoading }] = useDisclosure(false);

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content,
  });

  const updateAbout = api.about.editById.useMutation({
    onMutate: () => {
        toggleLoading()
    },
    onSettled: () => {
        toggleLoading()
    },
  });

  return (
    <>
      <RichTextEditor editor={editor}>
        <LoadingOverlay visible={loading} zIndex={1000} />
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>

          <Group justify="stretch" gap="xs" ml="auto">
            <Button
              h="100%"
              leftSection={<IconDeviceFloppy size={16} />}
              onClick={() => {
                const result = editor?.getHTML();
                if (result) {
                  updateAbout.mutate({ id: props.about.id, content: result });
                }
              }}
            >
              Save
            </Button>
            <Button h="100%" variant="default">
              Cancel
            </Button>
          </Group>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>{" "}
      <Space h={200} />
    </>
  );
}
