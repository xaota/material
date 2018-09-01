import Material, {$, drawRipple, pointerOffset} from '../../script/Material.js';
const element = 'material-switch';

/** */
  class MaterialSwitch extends Material {
  /** */
    constructor() {
      super(element, 'closed');
    }

  /** */
    init() {
      const content = this.content;

      return this;
    }
  }

customElements.define(element, MaterialSwitch);

// #region [Private]

// #endregion

/** */
  function init() {
    const content = this.content;
    const root = $('div.root', content);
    root.addEventListener('click', event => {
      const position = pointerOffset(root, event);
      root.style.setProperty('--position', position.x + 'px');
      drawRipple.call(root, position);
    });
    const input = $('div.root > input', content);
    input.addEventListener('blur', event => {
      root.style.setProperty('--position', '50%');
    });
  }
