import Material, {drawRipple, pointerOffset} from '../../script/Material.js';



const component = Material.meta(import.meta.url, 'material-button-back');
/** {MaterialButtonBack} Кнопка Возврата @class @extends {Material}
  */
  export default class MaterialButtonBack extends Material {
  /** Создание элемента
    */
    constructor() {
      super(component, 'closed');
    }
  }

Material.define(component, MaterialButtonBack);

// #region [Private]

// #endregion
