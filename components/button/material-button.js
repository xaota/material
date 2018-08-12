import Material, {$, drawRipple, pointerOffset} from '../Material.js';
const element = 'material-button';

/** {MaterialButton} Кнопка @class @extends {Material}
  */
  class MaterialButton extends Material {
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
        event.stopPropagation();
        event.cancelBubble = true;
        event.preventDefault();
        this.event('my-event', {test: 1});
        return false;
      });
    }
  }

customElements.define(element, MaterialButton);

// #region [Private]

// #endregion
