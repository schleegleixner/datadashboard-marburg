import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { ReactNode } from 'react'
import Title from '@/components/Elements/Title'
import { ContentImage } from '@schleegleixner/react-statamic-api'

interface MarkdownComponentProps {
  children: ReactNode
}

export const markdownComponents = {
  h1: (props: MarkdownComponentProps) => <Title as={'h1'} {...props} />,
  h2: (props: MarkdownComponentProps) => <Title as={'h2'} {...props} />,
  h3: (props: MarkdownComponentProps) => <Title as={'h3'} {...props} />,
  h4: (props: MarkdownComponentProps) => <Title as={'h4'} {...props} />,
  h5: (props: MarkdownComponentProps) => <Title as={'h5'} {...props} />,
  h6: (props: MarkdownComponentProps) => <Title as={'h6'} {...props} />,
  ul: (props: MarkdownComponentProps) => (
    <ul className="list-disc px-6 mb-4 text-base" {...props} />
  ),
  p: (props: MarkdownComponentProps) => (
    <p className="mb-2 text-base font-normal lg:text-lg" {...props} />
  ),
  a: (props: MarkdownComponentProps & { href?: string }) => (
    <a
      className="underline"
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    />
  ),
  img: ({ alt, src }: { alt?: string; src?: string }) => {
    return (
      <ContentImage
        alt={alt || null}
        default_breakpoints={
          '(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 1024px'
        }
        sizes={[480, 768, 1024]}
        src={src ?? ''}
        width={1024}
      />
    )
  },
  table: (props: MarkdownComponentProps) => (
    <table className="w-full table-auto border-collapse border border-primary mb-4 text-sm rounded-sm bg-white text-primary" {...props} />
  ),
  thead: (props: MarkdownComponentProps) => (
    <thead className="border border-primary" {...props} />
  ),
  tbody: (props: MarkdownComponentProps) => <tbody {...props} />,
  tr: (props: MarkdownComponentProps) => (
    <tr className="border-b border-primary" {...props} />
  ),
  th: (props: MarkdownComponentProps) => (
    <th className="px-4 py-2 text-left font-semibold border-r border-b-2 border-primary" {...props} />
  ),
  td: (props: MarkdownComponentProps) => (
    <td className="px-4 py-2 border-r border-primary" {...props} />
  ),
  blockquote: (props: MarkdownComponentProps) => (
    <blockquote className="border-l-4 border-gray-500 pl-4 italic mb-4" {...props} />
  ),
  code: (props: MarkdownComponentProps) => (
    <code className="bg-gray-100 p-1 rounded" {...props} />
  ),
  pre: (props: MarkdownComponentProps) => (
    <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto" {...props} />
  ),
}

export const markdownPlugins: Array<any> = [remarkGfm, remarkBreaks]
