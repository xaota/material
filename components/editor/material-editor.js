import Material from '../../script/Material.js';

import MaterialParagraph from '../paragraph/material-paragraph.js';

const component = Material.meta(import.meta.url, 'material-editor');
const updateAttribute = {
  /** */
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

const mutationObserverConfig = {
    childList: true,     // наблюдать за добавлением или удалением дочерних элементов (Включая текстовые узлы (text nodes))
    characterData: true, // необходимо наблюдать за изменениями значения текстового содержимого целевого узла (текстовых узлов дочернего элемента),
    subtree: true        // необходимо наблюдать за потомками целевого элемента
    // attributeOldValue: true // необходимо возвращать предыдущее значение атрибута.
  }

/** Редактор текста @class
  * @description Элемент, который позволяет создать параграф текста с форматированием
  */
  export default class MaterialEditor extends Material {
  /** Создание компонента {MaterialEditor} @constructor
    *
    */
    constructor() {
      super(component);
    }

  /** Отслеживаемые атрибуты / observedAttributes @readonly @static
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialEditor} @this
    */
    mount(node) {
      super.mount(node, updateAttribute);
      const paragraph = node.querySelector('material-paragraph');
      paragraph.innerText = '\n';

      const tags = {
        b: collapseTags('b'),
        i: collapseTags('i'),
        u: collapseTags('u'),
        s: collapseTags('s')
      }
      // this.store({lines: 1});
      const mutations = new MutationObserver((list, observer) => {
        let html = paragraph.innerHTML; // collapse TextNodes

        html = html
          .replace(tags.b.find, tags.b.func)
          .replace(tags.i.find, tags.i.func)
          .replace(tags.u.find, tags.u.func)
          .replace(tags.s.find, tags.s.func);

        // console.log('value', html);
        mutations.disconnect();
        const caret = getCaret(node);
        if (caret) console.log('caret', caret);
        console.log(getTestCaretPosition(paragraph, node));
        // debugger;
        if (html.length === 0) paragraph.innerText = '\n';
        // paragraph.innerHTML = html;
        mutations.observe(paragraph, mutationObserverConfig);
        // const lines = countLines(paragraph);
        // console.log('lines', lines);
        // if (this.store().lines < lines) this.
      });

      mutations.observe(paragraph, mutationObserverConfig);

      paragraph.addEventListener('paste', event => paste(node, event, paragraph));
      // paragraph.addEventListener('input',      e => console.log('INPUT', e, e.dataTransfer && e.dataTransfer.getData('text/plain')));


      // paragraph.addEventListener('input',      () => getCaretPosition('input'));
      paragraph.addEventListener('keyup',      () => getCaretPosition('keyup', node));
      paragraph.addEventListener('mouseup',    () => getCaretPosition('mouseup', node));
      paragraph.addEventListener('focus',      () => getCaretPosition('focus', node));
      // paragraph.addEventListener('paste',      () => getCaretPosition('paste'));
      paragraph.addEventListener('touchleave', () => getCaretPosition('touchleave', node));

      const resizeObserver = new ResizeObserver(() => {
        const outer = this.getBoundingClientRect().height;
        const inner = paragraph.getBoundingClientRect().height;
        // console.log('resize', outer, inner);
        if (outer > inner) paragraph.style.minHeight = outer + 'px';
        // if (inner > outer) this.style.height = inner + 'px';
        // resizeObserver.unobserve(paragraph);
      });
      resizeObserver.observe(paragraph);

      return this;
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

  /** Является ли узел элементом {MaterialEditor} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialEditor
    */
    static is(node) {
      return Material.is(node, MaterialEditor);
    }
  }

Material.attributes(MaterialEditor);
// Material.properties(MaterialEditor);
Material.define(component, MaterialEditor);

// #region [Private]
/** */
  function paste(node, event, paragraph) {
    const text = event.clipboardData && event.clipboardData.getData('Text');
    // console.log('PASTE', text);
    // replace(paragraph, text);
    // console.log('selection', getSelection());
    // event.stopPropagation();
    // event.preventDefault();
    const caret = getCaret(node);
    if (!caret) return false; //
    caret.selection.deleteFromDocument();
    caret.selection.removeAllRanges();
    const item = document.createTextNode(text);
    caret.range.insertNode(item); // ?
    // paragraph.innerHTML = paragraph.innerHTML;

    // setRange
    const range = document.createRange();
    if (caret.length > 0) {
      range.selectNode(item);
    } else {
      console.log('text', paragraph.innerHTML);
      range.setStart(item, text.length); // Назначают начальную позицию Range.
      // range.setEnd(node, caret.offset + text.length);   // - Назначает конечную позицию Range.
      range.collapse(true);
    }
    // range = window.getSelection();
    caret.selection.addRange(range);

    // console.log(selection, selection.getRangeAt(0))

    event.stopPropagation();
    event.preventDefault();
    return false;
  }

/** */
function getAbsoluteCaret(root, node = document) {
  // const caret = getCaret(node);
  // const start = caret.range.startContainer;
  // const finish = caret.range.endContainer;
  // console.log('')
}

/** */
  function getCaret(node = document) {
    const selection = node.getSelection();
    if (!selection.rangeCount) return undefined;
    const range = selection.getRangeAt(0); // ?
    return {
      offset: range.startOffset,
      length: range.endOffset - range.startOffset,
      selection,
      range
    };
  }

/** */
  function getCaretPosition(event, node = document) {
    const selection = getCaret(node);
    const position = selection
      ? selection.offset + selection.length
      : selection; // undefined
      // if (event) console.log(event, 'caret', position);
    return position;
  }

/** */
  function countLines(node) {
    const divHeight = node.offsetHeight;
    const lineHeight = parseFloat(window.getComputedStyle(node).lineHeight || 1);
    const lines = divHeight / lineHeight;
    return lines;
  }

/** */
  function setDeepCaretPosition(paragraph, positions, node = document) {

  }

/** collapseTags */
  function collapseTags(tag) {
    return {
      find: new RegExp(`(<\/${tag}>)(?=\\s*<${tag}>)`, "gi"),
      func: (match, p1, offset, string) => {
        // console.log('replace', args);
        const close = `</${tag}>`;
        const open = `<${tag}>`;
        const left = close.length;
        const right = open.length;
        const middle = string.indexOf(open, offset + left);
        const A = string.substr(0, offset);
        const B = string.substr(offset + left, middle - offset - left);
        const C = string.substr(middle + right);
        return A + B + C;
      }
    }
  }

// blur
// compositionend
// compositionstart
// focus
// keydown
// keyup
// mouseleave
// mouseup
// paste
// touchend
// touchleave

/** node_walk: walk the element tree, stop when func(node) returns false
  *
  */
function node_walk(node, func) {
  let result = func(node);
  for (node = node.firstChild; result !== false && node; node = node.nextSibling) result = node_walk(node, func);
  return result;
}

/** getCaretPosition: return [start, end] as offsets to elem.textContent that correspond to the selected portion of text (if start == end, caret is at given position and no text is selected)
  */
function getTestCaretPosition(elem, node = document) {
  var sel = node.getSelection();
  var cum_length = [0, 0];

  if (sel.anchorNode == elem) cum_length = [sel.anchorOffset, sel.extentOffset];
  else {
    var nodes_to_find = [sel.anchorNode, sel.extentNode];
    if (!elem.contains(sel.anchorNode) || !elem.contains(sel.extentNode)) return undefined;
    var found = [0,0];
    var i;
    node_walk(elem, function(node) {
      for (i = 0; i < 2; i++) {
        if (node == nodes_to_find[i]) {
          found[i] = true;
          if (found[i == 0 ? 1 : 0]) return false; // all done
        }
      }

      if (node.textContent && !node.firstChild) {
        for (i = 0; i < 2; i++) {
          if (!found[i]) cum_length[i] += node.textContent.length;
        }
      }
    });
    cum_length[0] += sel.anchorOffset;
    cum_length[1] += sel.extentOffset;
  }
  if (cum_length[0] <= cum_length[1]) return cum_length;
  return [cum_length[1], cum_length[0]];
}

// #endregion
