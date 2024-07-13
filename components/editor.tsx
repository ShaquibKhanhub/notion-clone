'use client';

import React, { useEffect } from 'react';
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import '@blocknote/core/style.css';
import { useTheme } from 'next-themes';
import { useEdgeStore } from '@/lib/edgestore';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({
      file,
    });
    return res.url;
  };

  const { editor } = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  // Effect to handle editor content changes
  useEffect(() => {
    if (!editor) return;

    const handleEditorChange = () => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    };

    editor.on('change', handleEditorChange);

    return () => {
      editor.off('change', handleEditorChange);
    };
  }, [editor, onChange]);

  if (!editor) return null; // Ensure editor is initialized

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      />
    </div>
  );
};

export default Editor;
