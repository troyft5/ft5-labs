import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const postsDirectory = path.join(process.cwd(), 'content/blog')

function parseFrontmatter(fileContents: string) {
  const match = fileContents.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { data: {} as Record<string, unknown>, content: fileContents }
  return {
    data: (yaml.load(match[1]) ?? {}) as Record<string, unknown>,
    content: match[2]
  }
}

export function getSortedPostsData() {
  if (!fs.existsSync(postsDirectory)) return []
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = parseFrontmatter(fileContents)

    return {
      slug,
      ...(data as { title: string; date: string; excerpt: string; category: string; readTime: string; cover?: string })
    }
  })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = parseFrontmatter(fileContents)
  const meta = data as { title: string; date: string; excerpt: string; category: string; readTime: string; cover?: string }

  // Remove the cover image from body content so it doesn't render twice
  const body = meta.cover
    ? content.replace(new RegExp(`!\\[[^\\]]*\\]\\(${meta.cover.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'), '').trim()
    : content

  return { slug, content: body, ...meta }
}
