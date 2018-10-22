const argument = process.argv[2];
if (!argument) return console.log('не указан компонент');
const fs = require('fs');

const PATH = './components';
const BASE = 'Material';
const ROOT = '../../script';

/** {MaterialComponentBuilder} @class
  */
  class MaterialComponentBuilder {
  /** */
    constructor(title) {
      title = title.toLowerCase();
      this.ROOT = PATH + '/' + title;
      this.TAG  = BASE.toLowerCase() + '-' + title;
      this.NAME = BASE + title.split('-').map(e => e.charAt(0).toUpperCase() + e.slice(1)).join('');
      this.BASE = ROOT + '/' + BASE + '.js';
    }

  /** */
    get root() {
      return this.ROOT;
    }

  /** */
    get absolute() {
      return '/material' + this.root.slice(1);
    }

  /** */
    get call() {
      return this.TAG;
    }

  /** */
    get name() {
      return this.NAME;
    }

  /** */
    get base() {
      return this.BASE;
    }

  /** */
    get import() {
      return `<link rel="import" href="${this.absolute}" id="${this.call}" />`;
    }

  /** */
    get tag() {
      return `<${this.call}></${this.call}>`;
    }

  /** */
    get htmlPath() {
      return this.root + '/index.html';
    }

  /** */
    get scriptPath() {
      return this.root + '/' + this.call + '.js';
    }

  /** */
    get stylePath() {
      return this.root + '/' + this.call + '.css';
    }

  /** */
    get htmlValue() {
      return [
        `<script src="./${this.call}.js" type="module"></script>`,
        "",
        `<template id="${this.call}">`,
        `  <link rel="stylesheet" href="../../style/material.css" />`,
        `  <link rel="stylesheet" href="./${this.call}.css" />`,
        "",
        "  <div class=\"root\">",
        "    <slot></slot>",
        "  </div>",
        "",
        "</template>",
        ""
      ].join('\n');
    }

  /** */
    get scriptValue() {
      return [
        `import ${BASE} from '${this.base}'`,
        `const element = '${this.call}';`,
        "",
        `/** {${this.name}} @class @default @export`,
        "  * ",
        "  */",
        `  export default class ${this.name} extends ${BASE} {`,
        `  /** {${this.name}} @constructor`,
        "    *",
        "    */",
        "    constructor() {",
        "      super(element);",
        "    }",
        "",
        "  /** ",
        "    * ",
        "    */",
        "    init() { // ready",
        "      const content = this.content;",
        "      ",
        "      return this;",
        "    }",
        "",
        `  /** Является ли узел элементом {${this.name}} @static`,
        "    * @param {HTMLElament} node проверяемый узел",
        `    * @return {boolean} node instanceof ${this.name}`,
        "    */",
        "    static is(node) {",
        "      return Material.is(node, element);",
        "    }",
        "  }",
        "",
        `customElements.define(element, ${this.name});`,
        "",
        "// #region [Private]",
        "",
        "// #endregion",
        ""
      ].join('\n');
    }

  /** */
    get styleValue() {
      this;
      return [
        "@charset \"utf-8\";",
        "",
        ":host {",
        "",
        "}",
        "",
        "div.root {",
        "",
        "}",
        ""
      ].join('\n');
    }

  /** */
    html() {
      fs.writeFileSync(this.htmlPath, this.htmlValue);
      return this;
    }

  /** */
    script() {
      fs.writeFileSync(this.scriptPath, this.scriptValue);
      return this;
    }

  /** */
    style() {
      fs.writeFileSync(this.stylePath, this.styleValue);
      return this;
    }

  /** */
    output() {
      console.info(this.import);
      console.warn(this.tag);
    }
  }

const component = new MaterialComponentBuilder(argument);

fs.mkdirSync(component.root);
component.html().script().style().output();
