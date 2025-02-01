import type { AstPath, Doc, ParserOptions } from 'prettier'
import { doc } from 'prettier'
import { doc2str } from './utils'

const { join, group, indent, hardline } = doc.builders

type SwitchCase = {
  type: 'SwitchCase'

  /** The test expression (null for default) */
  test: unknown | null

  /** The statements for this case */
  consequent: { type: string }[]
}

type SwitchStatement = {
  type: 'SwitchStatement'

  /** The switch expression */
  discriminant: unknown

  /** An array of cases */
  cases: SwitchCase[]
}

/**
 * This function formats a switch statement.
 *
 * For simple cases (i.e. those with a test and exactly one ReturnStatement),
 * it aligns the return statements so that they all start in the same column.
 *
 * For default cases (when test is null), it outputs "default:" with minimal spacing.
 *
 * For complex cases (blocks with more than one statement), it falls back to standard formatting
 * and adds extra newlines between cases.
 */
export const printSwitch = (path: AstPath<SwitchStatement>, options: ParserOptions, print: (p: AstPath<unknown>) => Doc): Doc => {
  const { cases } = path.node

  /**
   * Create an array of string representations for each case's test expression.
   * If there is no test (default), use "default".
   */
  const testAsStr: string[] = path.map((casePath) => {
    if (casePath.node.test == null) return 'default'

    const testDoc: Doc = casePath.call(print, 'test')
    return doc2str(testDoc)
  }, 'cases')

  /**
   * Calculate the maximum length among all simple case test expressions.
   * Only consider cases with exactly one ReturnStatement.
   */
  const maxTestLength = cases.reduce((max, currentCase, idx) => {
    if (currentCase.consequent.length !== 1 || currentCase.consequent[0].type !== 'ReturnStatement' || currentCase.test === null) return max
    return Math.max(max, testAsStr[idx].length)
  }, 0)

  /** Define prefix strings for normal case and default case. */
  const prefixCase = 'case '
  const prefixDefault = 'default:'

  /**
   * Determine the desired column for the colon.
   * For normal cases: desired length = prefixCase + maxTestLength + 1 (for colon).
   * Use the maximum of that and the length of "default:".
   */
  const desiredColumn = Math.max(prefixCase.length + maxTestLength + 1, prefixDefault.length)
  const totalCases = cases.length

  /** Process each case using path.map on the 'cases' array. */
  const caseDocs: Doc[] = path.map((casePath, idx) => {
    const currentCase = casePath.node as SwitchCase

    /** Check if this is a "simple" case (exactly one ReturnStatement) */
    const isSimple = currentCase.consequent.length === 1 && currentCase.consequent[0].type === 'ReturnStatement'

    if (isSimple) {
      /** If it's a default case (test is null), format without the "case" keyword. */
      if (currentCase.test === null) {
        const printedReturn: Doc = casePath.call(print, 'consequent', 0)

        /** Compute spacing so that the return starts at the desired column. */
        const spacing = ' '.repeat(Math.max(0, desiredColumn - prefixDefault.length))
        return group([prefixDefault, spacing, ' ', printedReturn])
      }

      /** For a normal case, get the printed test expression. */
      const printedTest: Doc = casePath.call(print, 'test')
      const testStr = doc2str(printedTest)

      /** Calculate the spacing needed so that "case " + test + ":" reaches the desired column. */
      const spacing = ' '.repeat(Math.max(0, desiredColumn - (prefixCase.length + testStr.length + 1)))
      const printedReturn: Doc = casePath.call(print, 'consequent', 0)

      /** Format as: "case <test>:<spacing> <return>" */
      return group([prefixCase, printedTest, ':', spacing, ' ', printedReturn])
    } else {
      /** For complex (block) cases, use standard formatting. */
      let docCase = casePath.call(print)

      /** Add a newline before the case if it's not the first one. */
      if (idx > 0) docCase = group([hardline, docCase])

      /** Add a newline after the case if it's not the last one. */
      if (idx < totalCases - 1) docCase = group([docCase, hardline])
      return docCase
    }
  }, 'cases')

  const joinedCases = join(hardline, caseDocs)

  return group(['switch (', path.call(print, 'discriminant'), ') {', indent([hardline, joinedCases]), hardline, '}'])
}
