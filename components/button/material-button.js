import Material, {$, drawRipple, pointerOffset} from '../../script/Material.js';
const element = 'material-button';

/** {MaterialButton} Кнопка @class @extends {Material}
  */
  export default class MaterialButton extends Material {
  /** Создание элемента
    */
    constructor() {
      super(element, 'closed');
    }

  /**
    *
    */
    init() {
      const content = this.content;
      const button = $('button', content);
      button.addEventListener('click', event => {
        const position = pointerOffset(button, event);
        drawRipple.call(button, position);
      });
    }
  }

window.customElements.define(element, MaterialButton);

// #region [Private]

// #endregion
