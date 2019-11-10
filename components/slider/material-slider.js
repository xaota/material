import Material from '../../script/Material.js';

import MaterialSliderItem from '/material/components/slider-item/material-slider-item.js';
import MaterialButtonIcon from '/material/components/button-icon/material-button-icon.js';
import MaterialRadioGroup from '/material/components/radio-group/material-radio-group.js';
import MaterialRadio      from '/material/components/radio/material-radio.js';

const component = Material.meta(import.meta.url, 'material-slider');
const updateAttribute = {
  /** */
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/** Галерея @class
  * @description Слайдер для переключения каких-либо элементов, например, изображений
  */
  export default class MaterialSlider extends Material {
  /** Создание компонента {MaterialSlider} @constructor
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
    * @return {MaterialSlider} @this
    */
    mount(node) {
      super.mount(node, updateAttribute);

      const carousel = node.querySelector('slot');

      // точки
      let items, count = 0;
      const footer = node.querySelector('material-radio-group');
      footer.addEventListener('change', e => swipeToItem(carousel, e.detail.value, count));

      carousel.addEventListener('slotchange', () => {
        items = [...carousel.assignedElements()]
          .filter(e => MaterialSliderItem.is(e));
        count = items.length;

        footer.innerHTML = '';
        for (let index = 0; index < count; ++index) {
          const radio = new MaterialRadio();
          radio.value = index;
          footer.appendChild(radio);
        }
      });

      // стрелочки
      const controls = {
        left: node.querySelector('#left'),
        right: node.querySelector('#right')
      };
      controls.left.addEventListener('click', () => swipe(carousel, -1, footer));
      controls.right.addEventListener('click', () => swipe(carousel, 1, footer));

      setTimeout(() => footer.value = 0, 100); // items.findIndex(e => e.selected) (-1 -> 0)
      return this;
    }

  /** Обновление отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name     Название атрибута
    * @param {string} previous Предыдущее значение ?null
    * @param {string} current  Устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[name](root, current);
    }

  /** Является ли узел элементом {MaterialSlider} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialSlider
    */
    static is(node) {
      return Material.is(node, MaterialSlider);
    }
  }

Material.attributes(MaterialSlider);
// Material.properties(MaterialSlider);
Material.define(component, MaterialSlider);

// #region [Private]
/** */
  function swipe(carousel, delta, footer) {
    const children = [...footer.children];
    const count = children.length;
    let current = children.findIndex(e => e.checked);
    if (current < 0) current = 0;
    const index = current + delta;
    const item  = index < 0 ? count - 1 : index >= count ? 0 : index;
    const value = children[item].value;
    swipeToItem(carousel, item, value, count);
    setTimeout(() => footer.value = value, 100);
  }

/** */
  function swipeToItem(carousel, item, count) {
    const left = Math.floor(carousel.scrollWidth * (item / count));
    const options = {left, top: 0, behavior: 'smooth'};
    carousel.scrollTo(options);
  }
// #endregion
