import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-divider');
/**
  *
  */
  export default class MaterialDivider extends Material {
  /** Создание компонента {MaterialDivider} @constructor
    * @param {object} options настройки
    */
    constructor(options = {}) {
      super(component);
      if (options.inset)  this.inset  = true;
      if (options.middle) this.middle = true;
    }

  /** Является ли узел элементом {MaterialDivider} @static - весьма удобный метод (не обязательно)
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof {MaterialDivider}
    */
    static is(node) {
      return Material.is(node, MaterialDivider);
    }
  }

Material.properties(MaterialDivider, 'inset', 'middle');
Material.define(component, MaterialDivider);
