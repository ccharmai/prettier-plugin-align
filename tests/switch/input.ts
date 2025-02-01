enum Options {
  A,
  BB,
  CCC,
}

;(option: Options) => {
  switch (option) {
    case Options.A:
      return 'A'
    case Options.BB:
      return 'BB'
    case Options.CCC:
      return 'CCC'
  }
}
;(option: Options) => {
  switch (option) {
    case Options.A: {
      const a = 'A'
      return a
    }
    case Options.BB:
      return 'BB'
    case Options.CCC:
      return 'CCC'
    default:
      return 'f'
  }
}
;(option: Options) => {
  switch (option) {
    case Options.A: {
      const a = 'A'
      return a
    }
    case Options.BB:
      return 'BB'
    case Options.CCC:
      return 'CCC'
    default: {
      const f = 'f'
      return f
    }
  }
}

switch (Options.A) {
  case Options.A:
    console.log('A')
    break
}
