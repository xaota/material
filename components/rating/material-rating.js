import Material from '../../script/Material.js';
import MaterialIcon from '../icon/material-icon.js';

const component = Material.meta(import.meta.url, 'material-rating');

const updateAttribute = {
  /** */
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
  /** */
  value(root, value) { setValue(root, parseFloat(value)); }
};

/** Рейтинг {MaterialRating} @class
  * Элемент для отображения или изменения оценки чего-либо
  */
  export default class MaterialRating extends Material {
  /** Создание элемента {MaterialRating} @constructor
    */
    constructor(value) {
      super(component);
      if (value) this.value = value;
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialRating} @this
    */
    mount(node) {
      this.paint();
      super.mount(node, updateAttribute);
      return this;
    }

  /** */
    paint() {
      const node = this.shadowRoot;
      const length = 5;
      const root = node.querySelector('div.root');
      root.innerHTML = '';

      // const urls = {
      //   border: MaterialIcon.src('star_border'),
      //   star:   MaterialIcon.src('star'),
      //   half:   MaterialIcon.src('star_half'),
      //   active: MaterialIcon.src('star-active')
      // };

      // Array.from({length}, _ => document.createElement('div'))
      //   .reduce((root, div) => {
      //     div.classList.add('item');
      //     div.style.backgroundImage = 'url(' + urls.border + ')';
      //     root.appendChild(div);
      //     return div;
      //   }, root);
      // stars.forEach(star => root.appendChild(star));

      Array.from({length}, _ => document.createElement('div'))
        .reduce((root, div, index) => {
          div.classList.add('item');
          // div.style.backgroundImage = 'url(' + urls.border + ')';
          const border = new MaterialIcon('star_border');
          const star =   new MaterialIcon('star');
          const half =   new MaterialIcon('star_half');
          const active = new MaterialIcon('star-active');
          border.classList.add('border');
          star.classList.add('star');
          half.classList.add('half');
          active.classList.add('active');
          div.appendChild(border);
          div.appendChild(star);
          div.appendChild(half);
          div.appendChild(active);
          root.appendChild(div);
          if (!this.disabled) div.addEventListener('click', e => {
            // setValue(node, index + 1);
            this.value = index + 1;
            // e.cancelBubble = true;
            // e.preventDefault();
            e.stopPropagation();
            return false;
          });
          return div;
        }, root);

      return this;
    }

  /** Изменение отследживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name название изменяемого атрибута
    * @param {string} previous предыдущее значение ?null
    * @param {string} current устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[name](root, current);
    }

  /** Является ли узел элементом {MaterialRating} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialRating
    */
    static is(node) {
      return Material.is(node, MaterialRating);
    }
  }

Material.attributes(MaterialRating);
Material.properties(MaterialRating, 'disabled');
Material.define(component, MaterialRating);

// #region [Private]
/** */
  function setValue(node, value, item) {
    if (isNaN(value)) return;
    // alert(value);
    const items = [...node.querySelectorAll('div.item')];
    // console.log(items);
    items.forEach(div => div.classList.remove('star', 'half'));
    // if (item) item.classList.add('star');
    // const
    depth(node, value);
  }

/** */
  function depth(root, count) {
    console.log(count);
    const item = root.querySelector('div.item');
    if (!item) return;
    // if (count) count -= 1;
    // if (typeof count === 'number' && count === 0) return;
    item.classList.add(count >= 1 ? 'star' : 'half');
    count -= 1;
    if (count <= 0) return;
    if (count >= 1) return depth(item, count);
    if (count > 0) return depth(item);
  }
// #endregion
