enum TEST_1 {
  FOO = 'FOO',
  BAR = 'BAR',
}

enum TEST_2 {
  F   = 'F',
  OO  = 'OO',
  OOO = 'OOO',
}

enum TEST_3 {
  Foo,
  F,
  OO,
}

enum TEST_4 {
  ONE   = 1,
  TWO   = 2,
  THREE = 3,
}

enum TEST_5 {
  A,
  B = 2,
  C,
}

enum TEST_6 {
  ALPHA = 'A',
  BETA  = 'BETA',
  GAMMA = 'Γ',
  DELTA = 'Δ',
}

enum TEST_7 {
  SHORT  = 'S',
  MEDIUM = 'MEDIUM_TEXT',
  LONGER = 'LONGER_STRING',
}

namespace _ {
  enum TEST_8 {
    FO  = 'FO',
    BAR = 'BAR',
  }
}

enum TEST_9 {
  /** This is foo */
  FOO    = 'FOO',
  BAR    = 'BAR', /** This is bar */
  // This is foobar
  FOOBAR = 'FOOBAR',
  BARFOO = 'BARFOO', // This is barfoo
}
