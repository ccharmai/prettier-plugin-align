import type { SupportLanguage, Parser, Printer, SupportOption } from 'prettier'
import * as prettierPluginBabel from 'prettier/plugins/babel'
import * as prettierPluginTypeScript from 'prettier/plugins/typescript'
import * as prettierPluginEstree from 'prettier/plugins/estree'

import { printEnum } from './enum'
import { printSwitch } from './switch'

export const languages: Partial<SupportLanguage>[] = [
  {
    name: 'JavaScript/TypeScript',
    parsers: ['babel', 'typescript'],
    extensions: ['.js', '.ts', '.tsx'],
    vscodeLanguageIds: ['javascript'],
  },
]

export const parsers: Record<'babel' | 'typescript', Parser> = {
  babel: prettierPluginBabel.parsers.babel,
  typescript: prettierPluginTypeScript.parsers.typescript,
}

export const printers: Record<'estree', Printer> = {
  estree: {
    ...prettierPluginEstree.printers.estree,

    print: (path, options, print) => {
      const node = path.getNode()
      const printed = prettierPluginEstree.printers.estree.print(path, options, print)

      if (node.type === 'TSEnumDeclaration') return printEnum(path, options, print)
      else if (node.type === 'SwitchStatement') return printSwitch(path, options, print)

      return printed
    },
  },
}
