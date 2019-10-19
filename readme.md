# Web Components / Material UI Design

## Как добавить в проект
Просто положите папку репозитория в корне вашего сервера.

### npm
```shell
$ npm install web-material
```
> настройте сборку и среду разработки так, чтобы `/material/*` резолвился в `${workspaceFolder}/node_modules/web-material/*`

## Как собрать
Polymer или Vue.js работают с веб-компонентами.\
Вообще, можно ничего не собирать, они нативно работают в Chrome и в Firefox (за флагом), но для прода все-таки стоит подумать о сборщике.

## Как использовать
Добавьте импорт компонента на страницу (например, кнопка `material-button`)
```js
import MaterialButton from '/material/components/button/material-button.js';
```
и используйте новый тег в разметке
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
> - [Инструкции для разработчиков](//github.com/xaota/material/blob/master/contributing.md)

## Список компонент
> Около названий некоторых компонент есть сылки на задачу (типа тз) для просмотра подробностей

### Готово / В процессе улучшения
- [x] [#12](//github.com/xaota/material/issues/12) Button | Кнопки
- [x] [#13](//github.com/xaota/material/issues/13) Input | Поля ввода
- [x] [#4](//github.com/xaota/material/issues/4) Select | Поле выбора из выпадающего списка
- [x] [#19](//github.com/xaota/material/issues/19) Tabs | Вкладки
- [x] [#8](//github.com/xaota/material/issues/8) Title (ApplicationBar) | Колонтитул
- [x] [#15](//github.com/xaota/material/issues/15) List | Списки
- [x] [#16](//github.com/xaota/material/issues/16) Tooltip | Подсказки
- [x] [#20](//github.com/xaota/material/issues/20) BreadCrumbs | Следы
- [x] [#21](//github.com/xaota/material/issues/21) Message | Сообщения в чате
- [x] [#22](//github.com/xaota/material/issues/22) Card | Карточка
- [x] [#11](//github.com/xaota/material/issues/11) Search | Строка поиска
- [x] [#14](//github.com/xaota/material/issues/14) Textarea | Многострочное поле ввода
- [x] [#36](//github.com/xaota/material/issues/36) Expand | Развороты
- [x] [#30](//github.com/xaota/material/issues/30) Switch | Выключатели
- [x] [#26](//github.com/xaota/material/issues/26) Figure | Рамки
- [x] [#28](//github.com/xaota/material/issues/28) Avatar | Аватарки
- [x] [#32](//github.com/xaota/material/issues/32) Radio | Переключатели
- [x] [#33](//github.com/xaota/material/issues/33) Chips | Теги
- [x] [#29](//github.com/xaota/material/issues/29) Icon | Иконки
- [x] [#34](//github.com/xaota/material/issues/34) Drop | Выпадающие блоки
- [x] [#31](//github.com/xaota/material/issues/31) Checkbox | Флажки
- [x] [#35](//github.com/xaota/material/issues/35) Paper (Panel) | Панель / Блок для размещения информации
- [x] [#27](//github.com/xaota/material/issues/27) Caption | Заголовок
- [ ] [#10](//github.com/xaota/material/issues/10) Progress | Отображение уровня загрузки
- [ ] [#9](//github.com/xaota/material/issues/9) Loader | Отображение бесконечной загрузки
- [x] [#39](//github.com/xaota/material/issues/39) Rating | Рейтинг (звездочки)
- [ ] [#23](//github.com/xaota/material/issues/23) Drawer |
- [ ] [#25](//github.com/xaota/material/issues/25) Badge | Счетчик уведомлений
- [ ] [#37](//github.com/xaota/material/issues/37) Stack | Экраны и история переходов
- [x] Copyright | Авторские права
- [x] Navigation (Navigation Bar) | Панель навигации
- [x] Blockquote | Цитаты
- [x] Dialog | Диалоговое окно
- [x] Header | Шапка страницы
- [x] Banner | Баннеры
- [ ] Calendar | Календарь
- [ ] Timeline | Хроника
- [ ] Slider | Ползунок
- [ ] Table | Отображение таблиц
- [ ] Footer | Подвал (сводная информация)
- [ ] [#24](//github.com/xaota/material/issues/24) Charm | Выдвигаемая панель быстрых действий

> Эти компоненты уже можно использовать в ваших проектах, со временем в них все будет доведено "до ума", не потребуется(?) дополнительных действий с вашей стороны

### ROADMAP (список компонент для реализации)
- [ ] Parallax
- [ ] Grid | Сетка - Structure-Grid
- [ ] Sheet | Список элементов
- [ ] Panorama | Панорамы и 360-градусные изображения
- [ ] Payment | Платежи банковской картой
- [ ] Structure
- [ ] PickerDate | Выбор времени
- [ ] PickerTime | Выбор даты (календарь)
- [ ] PickerDateTime | Выбор даты и времени
- [ ] Countdown
- [ ] Reaction | Кнопки Like/Dislike и другие
- [ ] Counter?
- [ ] Bar
- [ ] BarSide
- [ ] BarSideNavigation
- [ ] Toolbar
- [ ] Widget
- [ ] Menu
- [ ] MenuVertical
- [ ] MenuHorizontal
- [ ] Notify
- [ ] Toast
- [ ] Snack
- [ ] Hint
- [ ] Stepper
- [ ] Master
- [ ] Wizard
- [ ] Popup
- [ ] Modal
- [ ] Snippet
- [ ] Code(?) (Source)
- [ ] Upload
- [ ] Typography
- [ ] Link
- [ ] Contents
- [ ] Pagination
- [ ] SliderRange
- [ ] Tile
- [ ] Carousel
- [ ] TreeView
- [ ] InfoBox
- [ ] KeyPad (pin-code)
- [ ] Ribbon
- [ ] Emotion
- [ ] Smile
- [ ] Sticker
- [ ] Player
- [ ] Audio
- [ ] Video
- [ ] Layer
- [ ] Ad
- [ ] Divider
- [ ] Remark
- [ ] Route
- [ ] Map
- [ ] Address

и так далее...)

### TODO:
e2e / Тестировние компонент
