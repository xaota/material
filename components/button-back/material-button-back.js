import Material       from '../../script/Material.js';
import MaterialButton from '../button/material-button.js';
import MaterialIcon   from '../icon/material-icon.js';

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
