import { test, describe, expect, beforeAll } from 'vitest'
import { format, getGroup } from './utils'

describe('Enum test', () => {
  let fixtures: Awaited<ReturnType<typeof getGroup>>
  beforeAll(async () => fixtures = await getGroup('enum'))

  test('Input should match output', async () => {
    const formatted = await format(fixtures.input)
    expect(formatted).toBe(fixtures.output)
  })
})

describe('Switch test', () => {
  let fixtures: Awaited<ReturnType<typeof getGroup>>
  beforeAll(async () => fixtures = await getGroup('switch'))

  test('Input should match output', async () => {
    const formatted = await format(fixtures.input)
    console.log(formatted)
    expect(formatted).toBe(fixtures.output)
  })
})
