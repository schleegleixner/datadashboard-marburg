import React from 'react'
import ReactMarkdown from 'react-markdown'
import {
  markdownComponents as baseComponents,
  markdownPlugins,
} from '@/utils/markdown'
import { TilePayloadType } from '@/types/tiles'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { getDataPoint } from '@/utils/payload'
import rehypeRaw from 'rehype-raw'
import remarkAnimate from '@/utils/markdown/remarkAnimate'

interface MarkdownProps {
  content: string
  tile_payload?: TilePayloadType
}

export default function Markdown({ content, tile_payload }: MarkdownProps) {
  const markdownComponents = {
    ...baseComponents,
    animate: ({ children }: { children: React.ReactNode }) => (
      <AnimatedNumber>
        {getDataPoint(tile_payload!, String(children).trim()) ?? 0}
      </AnimatedNumber>
    ),
  }

  return (
    <ReactMarkdown
      components={markdownComponents as any}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[...markdownPlugins, remarkAnimate]}
    >
      {content}
    </ReactMarkdown>
  )
}
