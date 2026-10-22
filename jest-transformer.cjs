const ts = require('typescript')

module.exports = {
  process(sourceText) {
    const result = ts.transpileModule(sourceText, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2023,
        esModuleInterop: true,
      },
    })

    return { code: result.outputText }
  },
}