import Material from '../../script/Material.js';
import {path} from '../../script/Template.js';

const component = Material.meta(import.meta.url, 'material-map-svg');
const updateAttribute = {
  /** */
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/** SVG карта @class
  * @description Элемент для показа зонированных SVG карт
  */
  export default class MaterialMapSvg extends Material {
  /** Создание компонента {MaterialMapSvg} @constructor
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
    * @return {MaterialMapSvg} @this
    */
    mount(node) {
      super.mount(node, updateAttribute);
      const image = node.querySelector('object');
      // image.addEventListener('click', listener)
      image.addEventListener('load', () => loaded.call(this, image));
      console.log('mount');
      return this.init();
    }

  /** init */
    init() {
      const node = this.shadowRoot;
      if (!node) return this;
      const image = node.querySelector('object');
      // const image = node.querySelector('#root');
      const store = this.store();
      image.data = store.src;
      console.log('!', store.src)
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

  /** Является ли узел элементом {MaterialMapSvg} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialMapSvg
    */
    static is(node) {
      return Material.is(node, MaterialMapSvg);
    }
  }

Material.attributes(MaterialMapSvg);
// Material.properties(MaterialMapSvg);
Material.define(component, MaterialMapSvg);

// #region [Private]
/** */
  async function loaded(image) {
    // console.log('loaded');
    image.removeAttribute('height');
    const svg = image.contentDocument.documentElement;
    const stylesheetPath = path('svg.css', import.meta.url);
    const stylesheet = image.contentDocument.createElementNS('http://www.w3.org/2000/svg', 'style');
    stylesheet.type = 'text/css';
    const r = await fetch(stylesheetPath).then(r => r.text());
    stylesheet.appendChild(document.createTextNode(r));
    svg.prepend(stylesheet);
    svg.addEventListener('click', e => {
      if (e.target.tagName === 'path') {
        this.event('select', {path: e.target});
      }
    });

    const width   = svg.getAttribute('width');
    const height  = svg.getAttribute('height');
    const viewBox = svg.getAttribute('viewBox');
    // console.log(viewBox);
    if (!viewBox) svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.removeAttribute('width');
    svg.removeAttribute('height');

    // if ()
    const h = Math.ceil(this.getBoundingClientRect().height);
    // console.log(h, image.getBoundingClientRect().height);
    if (h < image.getBoundingClientRect().height) image.setAttribute('height', h.toString());
  }
// #endregion
