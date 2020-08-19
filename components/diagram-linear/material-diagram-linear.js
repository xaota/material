import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-diagram-linear');
const updateAttribute = {
  /** */
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/** Линейная диаграмма @class
  * @description отображает информацию в виде ряда точек данных, соединённые прямыми отрезками
  */
  export default class MaterialDiagramLinear extends Material {
  /** Создание компонента {MaterialDiagramLinear} @constructor
    *
    */
    constructor() {
      super(component);
    }

  /** */
    init() {
      const node = this.shadowRoot;
      const data = this.store();
      draw(node, data);
    }

  /** Отслеживаемые атрибуты / observedAttributes @readonly @static
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialDiagramLinear} @this
    */
    mount(node) {
      super.mount(node, updateAttribute);

      const resizeObserver = new ResizeObserver(entries => {
        const data = this.store();
        draw(node, data);
      });

      resizeObserver.observe(this);
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

  /** Является ли узел элементом {MaterialDiagramLinear} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialDiagramLinear
    */
    static is(node) {
      return Material.is(node, MaterialDiagramLinear);
    }
  }

Material.attributes(MaterialDiagramLinear);
// Material.properties(MaterialDiagramLinear);
Material.define(component, MaterialDiagramLinear);

// #region [Private]
/** */
  function draw(node, data = null) {
    const canvas = node.querySelector('canvas');
    const context = canvas.getContext('2d');
    const {width, height} = resize(canvas);
    // context.clearRect(0, 0, width, height);
    if (!data || !width || !height) return;
    const {min, max} = size(data.series);
    context.translate(0, height);
    context.scale(1, -1);
    Object
      .keys(data.series)
      .forEach(name => series(context, {width, height}, data.series[name], data.color[name], {min, max, padding: 0.025}));
  }

/** */
  function series(context, rect, series, color, size) {
    if (series.length === 0) return;
    const padding = 1 - 2 * size.padding;
    const step = (rect.width * padding) / (series.length - 1);

    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.globalAlpha = 1;

    const l = size.max - size.min;
    const height = rect.height * padding;
    const bottom = size.padding * rect.height;
    series = series.map(y => bottom + ((y - size.min) / l) * height);

    const x = rect.width * size.padding;
    const y = series[0];
    context.moveTo(x, y);
    series.slice(1).reduce((x, y) => strip(x, y, context, step), x);

    context.stroke();
    context.closePath();

    // context.beginPath();
    // context.lineWidth = 0.5;
    // context.globalAlpha = 0.75;
    // series.slice(1, series.length - 1).reduce((x, y) => point(x, y, context, step), x + step);
    // context.stroke();
    // context.closePath();
  }

/** */
  function strip(x, y, context, step) {
    x += step;
    context.lineTo(x, y);
    return x;
  }

/** */
  function point(x, y, context, step, offset = 5) {
    context.moveTo(x, y - offset);
    context.lineTo(x, y + offset);
    return x + step;
  }

/** */
  function size(series) {
    const array = Object.values(series).flat();
    const min = Math.min(...array);
    const max = Math.max(...array);
    return {min, max};
  }

/** */
  function resize(canvas) {
    const rect = canvas.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);
    canvas.width = width;
    canvas.height = height;
    return {width, height};
  }
// #endregion
