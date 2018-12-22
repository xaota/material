import Material, {drawRipple, pointerOffset} from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-button');
/** {MaterialButton} Кнопка @class @extends {Material}
  */
  export default class MaterialButton extends Material {
  /** Создание элемента
    */
    constructor() {
      super(component, 'closed');
    }

  /**
    *
    */
    ready(content) {
      this;
      const button = content.querySelector('button');
      this.addEventListener('click', event => {
        if (this.disabled) return event.stopImmediatePropagation();
        const position = pointerOffset(button, event);
        drawRipple.call(button, position);
      });
    }
  }

Material.define(component, MaterialButton);

// #region [Private]

// #endregion
