# prettier-plugin-align

A Prettier plugin for aligning enums, switch statements, and other structured code elements for better readability.

## ✨ Features
- Aligns `enum` definitions for better readability
- Formats `switch` statements to align `case` statements properly
- Ensures consistent formatting without breaking Prettier’s rules

## 📦 Installation

### Using npm:
```sh
npm install --save-dev prettier-plugin-align
```

### Using Yarn:
```sh
yarn add -D prettier-plugin-align
```

### Using pnpm:
```sh
pnpm add -D prettier-plugin-align
```

## 🚀 Usage

### With Prettier CLI
```sh
prettier --plugin=prettier-plugin-align --write "**/*.ts"
```

### In `.prettierrc.json`
Add the plugin to your Prettier config:
```json
{
  "plugins": ["prettier-plugin-align"]
}
```

## 🎯 Example Formatting

### Before:
```ts
enum Status {
  Pending,
  InProgress = "IN_PROGRESS",
  Done = "DONE"
}

switch (status) {
  case Status.Pending: return "Pending"
  case Status.InProgress: return "In Progress"
  case Status.Done: return "Done"
}
```

### After:
```ts
enum Status {
  Pending     = "PENDING",
  InProgress  = "IN_PROGRESS",
  Done        = "DONE"
}

switch (status) {
  case Status.Pending:    return "Pending"
  case Status.InProgress: return "In Progress"
  case Status.Done:       return "Done"
}
```

## 🛠 Configuration
This plugin respects your existing Prettier settings.
You can configure Prettier using `.prettierrc.json`, `.prettierrc.js`, or via CLI flags.

## 🧪 Running Tests
To run the test suite:
```sh
npm test
```

## 📜 License
This project is licensed under the MIT License.

