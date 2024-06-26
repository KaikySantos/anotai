"use client"

import {
  BlockNoteEditor,
  PartialBlock
} from "@blocknote/core"
import {
  BlockNoteView,
  useBlockNote
} from "@blocknote/react"

import "@blocknote/react/style.css"

import { useTheme } from "next-themes"

import { useEdgeStore } from "@/lib/edgestore"

interface EditorProps {
  onChange: (value: string) => void
  initialContent?: string
  editable?: boolean
}

const Editor = ({
  onChange,
  editable,
  initialContent
}: EditorProps) => {
  const { resolvedTheme } = useTheme()
  const { edgestore } = useEdgeStore()

  const handleUplaod = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file
    })

    return response.url
  }

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? JSON.parse(initialContent)
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
    },
    uploadFile: handleUplaod
  })

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  )
}

export default Editor