import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-paragraph');
const updateAttribute = {
  /** */
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/** Параграф @class
  * @description Текстовый (и не только) блок
  */
  export default class MaterialParagraph extends Material {
  /** Создание компонента {MaterialParagraph} @constructor
    * @param {object} store данные для отображения текста
    */
    constructor(store) {
      super(component);
      if (store) this.store(store);
    }

  /** */
    init() {
      // const node = this.shadowRoot;
      const {text = this.innerText, payload} = this.store();
      // const result = text.replace(/\*/g, '\\*') // todo!
      payload
        .sort((a, b) => b.length - a.length)  // закрывающие по убыванию
        .sort((a, b) => a.offset - b.offset); // открывающие по возрастанию

      // console.log('init!');
      const tree = treeGenerate({data: text}, {array: payload});
      // console.log({text, payload, tree});
      // console.log(tree);

      this.innerText = '';
      insert(this, tree);

      return this;
    }

  /** Отслеживаемые атрибуты / observedAttributes @readonly @static
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialParagraph} @this
    */
    mount(node) {
      return super.mount(node, updateAttribute);
    }

  /** Обновление отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name     Название атрибута
    * @param {string} previous Предыдущее значение ?null
    * @param {string} current  Устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous && (name in updateAttribute)) {
        updateAttribute[name].call(this, root, current, previous);
      }
    }

  /** Является ли узел элементом {MaterialParagraph} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialParagraph
    */
    static is(node) {
      return Material.is(node, MaterialParagraph);
    }
  }

Material.attributes(MaterialParagraph);
// Material.properties(MaterialParagraph);
Material.define(component, MaterialParagraph);

// #region [Private]
/** */
  function treeGenerate(text, payload) {
    // console.log(payload);
    if (!text.from)    text.from    = 0;
    if (!text.to)      text.to      = text.data.length;
    if (!payload.from) payload.from = 0;
    if (!payload.to)   payload.to   = payload.array.length;

    if (payload.array.length === 0 || payload.to - payload.from === 0) return [{text: text.data.substring(text.from, text.to)}]; // || payload.from > payload.length

    const result = [];
    let index = payload.from;
    let start = text.from;

    // console.log('before', index, start);

    while (start <= text.to && index >= 0 && index < payload.to) {
      const current = payload.array[index];
      start = Math.min(start, current.offset);
      const entity = start === current.offset;
      const finish = entity ? current.offset + current.length : Math.min(text.to, current.offset);
      // console.log('iteration', start, finish);
      const string = {text: text.data.substring(start, finish)};
      const next = payload.array.findIndex(e => e.offset >= finish);
      let children = [];
      if (next - index > 1) {
        // debugger;
        children = treeGenerate({data: text.data, from: start, to: finish}, {array: payload.array, from: index + 1, to: next});
      }
      result.push(entity ? Object.assign(current, children.length ? {children} : string) : string);
      start = finish;
      index = next;
    }
    // console.log(text.data.length, start);
    if (start < text.to) result.push({text: text.data.substring(start, text.to)});
    return result;
  }

/** */
  const payloads = {
    bold:({text}) => plainText(text, {fontWeight: 'bold'}),
    italic: ({text}) => plainText(text, {fontStyle: 'italic'}),
    underline: ({text}) => plainText(text, {textDecoration: 'underline'}),
    code: ({text}) => plainText(text, {fontFamily: 'monospace', color: '#1E1E1E'}),
    link: ({text, href}) => { const a = plainText(text, {color: '#0E639C', textDecoration: 'underline'}, 'a'); a.href = href; return a; } // cursor: 'pointer'
  }

// todo: validate

/** */
  function insert(root, children = []) {
    // if (!root) return;
    children.map(create).forEach(e => root.appendChild(e));
    return root;
  }

/** */
  function create(item) {
    if (item.text) return item.type
      ? payloads[item.type](item)
      : document.createTextNode(item.text);
    return insert(payloads[item.type](item), item.children);
  }

/** */
  function plainText(text = '', style = {}, element = 'span') {
    const span = document.createElement(element);
    if (text) span.innerText = text;
    Object.assign(span.style, style);
    // console.log(style);
    return span;
  }
// #endregion
