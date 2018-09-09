# Web Components / Material UI Design

## Как добавить в проект
Просто положите папку репозитория в корне вашего сервера.

> В будущем будет npm пакет.

## Как собрать
Polymer или Vue.js работают с веб-компонентами.\
Вообще, можно ничего не собирать, они нативно работают в Chrome, но для прода все-таки стоит подумать о сборщике.

## Как использовать
Добавьте импорт компонента на страницу (например, кнопка `material-button`)
```html
<link rel="import" href="components/button" id="material-button" />
```
и используйте новый тег
```html
<material-button>Button</material-button>
```

## Устройство проекта
```
/components - папка с веб-компонентами
/script     - Общие скрипты для компонент (базовый JS класс)
/style      - Общие стили для компонент
```

### Устройство компонента (пример: `material-button`)
> `/components/button`
```
/index.html          - разметка (шаблон) компонента
/material-button.css - стили компонента
/material-button.js  - логика и скрипт для регистрации компонента
```
*__Примечание.__* Устройство остальных компонент аналогичное.

> Для оформления компонент используются `css-переменные`, которые необходимо инициализировать в проекте, куда компоненты будут подключены.

## Для разработки
> - [Панель задач для разработчиков](//github.com/xaota/material/projects/1?fullscreen=true)
> - [Вехи развития](//github.com/xaota/material/milestones)

## Как добавить новый компонент
1. В папке `/components` создайте папку для вашего компонента (список возможных компонент ниже).\
По стандарту, название `custom`-элемента должно содержать `-` (тире), поэтому мы используем префикс `material-`.
2. Создайте файлы для разметки, стилей и скрипта.
3. Создайте разметку для нового компонента
```html
<template>
  <link rel="stylesheet" href="./new-component.css" />

  <!-- тут разметка для вашего компонента -->
  <!-- корневой тег для удобства лучше пометить классом `root` -->
</template>
```
4. Добавьте логику и подключение вашего компонента (`new-component.js`)
```javascript
import Material from '../Material.js';
const component = Material.meta(import.meta.url, 'new-component');

/** {NewComponent} Ваш компонент @class @extends {Material}
  */
  class NewComponent extends Material {
  /** Создание компонента
    */
    constructor() {
      super(element);
    }

    // ... тут логика компонента (если нужно)
  }

Material.define(element, NewComponent);
```
5. Добавьте стили к вашему компоненту (`new-component.css`).
6. Примените компонент на странице `/index.html` (это такая свалка для предпросмотра).
7. Напишите `readme.md` для вашего компонента.

## Примечания
1. Используйте `es-imports` и подключайте все скрипты как модули.
2. Используйте `css-custom-properties`, иначе говоря, `css-переменные`.\
Они наследуются из внешних стилей, что позволит использовать темы с сайтов, на которые будут добавлены ваши компоненты.
3. Для удобства помечайте корневой тег вашего элемента классом `root`.
4. Внутренние события элементов лучше скрыть от внешней страницы, если ои не нужны.\
"Наружу" можно "бросить" свое событие с помощью метода `this.event('new-event', data)`.
6. Когда будет больше компонент, надо все отрефакторить.
7. Для самоорганизации можно использовать `issue` и `projects` этого репозитория, а для общей документации - `wiki`.

> Смело используйте новые технологии и не беспокойтесь об IE или браузерах, в которых что-то пока не работает. Скоро все будет топчик!

## Список компонент
> Около названий некоторых компонент есть сылки на задачу (типа тз) для просмотра подробностей

### Готово / В процессе улучшения
- [ ] [#12](//github.com/xaota/material/issues/12) Button | Кнопки
- [ ] [#13](//github.com/xaota/material/issues/13) Input | Поля ввода
- [ ] [#4](//github.com/xaota/material/issues/4) Select | Поле выбора из выпадающего списка
- [ ] Switch | Выключатели
- [ ] Checkbox | Флажки
- [ ] Radio | Переключатели
- [ ] Chips | Теги
- [ ] Expand | Развороты
- [ ] Tabs | Вкладки
- [ ] [#8](//github.com/xaota/material/issues/8) Header (ApplicationBar) | Колонтитул
- [ ] Paper (Panel) | Панель / Блок для размещения информации
- [ ] [#15](//github.com/xaota/material/issues/15) List | Списки
- [ ] Drop | Выпадающие блоки
- [ ] [#16](//github.com/xaota/material/issues/16) Tooltip | Подсказки

> Эти компоненты уже можно использовать в ваших проектах, со временем в них все будет доведено "до ума", не потребуется(?) дополнительных действий с вашей стороны

### ROADMAP (список компонент для реализации)
- [#14](//github.com/xaota/material/issues/14) Textarea | Многострочное поле ввода
- Badge | Счетчик уведомлений
- Cards
- Structure
- StructureGrid
- PickerDate | Выбор времени
- PickerTime | Выбор даты (календарь)
- PickerDateTime | Выбор даты и времени
- Countdown
- Calendar | Календарь
- Rating | Рейтинг (звездочки)
- Reaction | Кнопки Like/Dislike и другие
- Counter?
- [#10](//github.com/xaota/material/issues/10) Progress | Отображение уровня загрузки
- [#9](//github.com/xaota/material/issues/9) Loader | Отображение бесконечной загрузки
- Table | Отображение таблиц
- Bar
- BarNavigation
- BarSide
- BarSideNavigation
- Toolbar
- Charm
- Drawer
- Avatar
- Card
- Widget
- Menu
- MenuVertical
- MenuHorizontal
- Notify
- Toast
- Snack
- Hint
- Stepper
- Master
- Wizard
- [#11](//github.com/xaota/material/issues/11) Search | Строка поиска
- Popup
- Modal
- BreadCrumb
- Snippet
- Code(?)
- Upload
- Typography
- Link
- Caption
- Title?
- Contents
- Dialog
- Pagination
- Slider
- SliderRange
- Tile
- Carousel
- TreeView
- InfoBox
- KeyPad (pin-code)
- Ribbon
- Figure
- Emotion
- Smile
- Sticker
- Message
- Player
- Audio
- Video
- Layer
- Ad
- Banner
- Divider
- Blockquote
- Remark
- Icon

и так далее...)

### Примеры
Можно посмотреть на реализации Material элементов, например, тут\
https://material-ui.com/demos/buttons/ (кнопки)
