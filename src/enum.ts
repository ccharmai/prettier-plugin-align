import { AstPath, Doc, ParserOptions, doc } from 'prettier'

const { join, group, indent, hardline } = doc.builders

type TSEnumMember = {
  id: { name: string }
  initializer?: unknown
}

type TSEnumDeclaration = {
  type: 'TSEnumDeclaration'
  id: { name: string }
  members: TSEnumMember[]
}

export const printEnum = (path: AstPath<TSEnumDeclaration>, options: ParserOptions, print: TCallbackPrint): Doc => {
  const maxMemberLength = path.node.members.reduce((max, member) => Math.max(max, member.id.name.length), 0)

  const memberDocs = path.map((memberPath) => {
    const member = memberPath.node
    const spacing = ' '.repeat(maxMemberLength - member.id.name.length)

    if (member.initializer !== undefined) {
      return [
        `${member.id.name}${spacing} = `,
        memberPath.call(print, 'initializer'),
        ',',
      ]
    }

    return [member.id.name, ',']
  }, 'members')

  const joinedMembers = join(hardline, memberDocs)

  return group([
    `enum ${path.node.id.name} {`,
    indent([hardline, joinedMembers]),
    hardline,
    '}',
  ])
}
