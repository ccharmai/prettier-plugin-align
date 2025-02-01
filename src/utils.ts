import { Doc } from 'prettier'

export const doc2str = (doc: Doc): string => {
  if (typeof doc === 'string') return doc
  if (Array.isArray(doc)) return doc.map(doc2str).join('')
  if (doc && typeof doc === 'object') {
    if ('parts' in doc && Array.isArray(doc.parts)) return doc2str(doc.parts)
    if ('content' in doc) return doc2str(doc.content as Doc)
  }
  return ''
}
