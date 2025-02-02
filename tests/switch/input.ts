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
;(option: Options) => {
  switch (option) {
    case Options.A: {
      return 'A'
    }
    case Options.BB: {
      return 'BB'
    }
    default: {
      return 'CCC'
    }
  }
}
;(option: Options) => {
  switch (option) {
    case Options.A: return 'A' /** Because I can */
    /** Because We can */
    case Options.BB: return 'BB'
    default: {
      // Why not?
      return 'CCC'
    }
  }
}
switch (Options.A) {
  case Options.A:
    console.log('A')
    break
}
