# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## **Архитектура**

В проекте использован шаблон проектирования MVP (Model-View-Presenter).

## **Интерфейсы**

- `IAppStateData` интерфейс состава данных, которые должны храниться в модели:

 ```tsx
  interface IAppStateData {
    	products: IProduct[];
    	basket: string[];
    	order: IOrder;
    }
 ```

- `IProduct` интерфейс продукта

 ```tsx
    interface IProduct {
    	id: string;
    	descridtion: string;
    	image: string;
    	title: string;
    	category: string;
    	price: number;
    }
  ```
  
- `IOrder` интерфейс заказа

 ```tsx
  interface IOrder {
    payment: PaymentType;
    email: string;
    phone: string;
    address: string;
    total: number;
    itemIds: string[];
  }
```

- `IContactsForm` - данные, полученные на втором шаге оформления заказа

```tsx
export interface IContactsForm {
	email: string;
	phone: string;
}
```

- `IOrderResult` - данные, полученные после оформления заказа

```tsx
export interface IOrderResult {
	id: string;
	total: number;
}
```

- `IGalleryData` - карточки продуктов

```tsx
export interface IGalleryData {
	items: HTMLButtonElement[];
}
```

- `IModalData` - модальное окно

```tsx
export interface IModalData {
	content: HTMLElement;
}
```

- `IBasketData` - список продуктов в корзине
```tsx
export interface IBasketData {
	items: HTMLElement[];
	total: number;
}
```


## *Модель данных*

**`Model<T>`**
    
В проекте выполняет роль Model. Абстрактный класс служит средством для хранения данных поступающих с сервера.

Методы:

- `emitChanges(event: string, payload?: object): void` — сообщить об изменении данных в модели.


**`AppState`**
    
Класс для работы с состояниями приложения(карточек, корзины, заказов). Наследуется от класса `Model`.

Поля:

- `protected products: IProduct[]`;
- `protected basket: string[]`;
- `protected order: IOrder`;


Методы:

- `setProducts(items: IProduct[]): void` — записать данные о продуктах;

- `getProducts(): IProduct[]` — получить данные о продуктах;

- `setPreviewCard(item: IProduct): void` — записать данные продукта;

- `addToBasket(item: IProductItem): void` — добавить в корзину;

- `removaFromBasket(item: IProduct): void` — удалить из корзины;

- `getBasketItems(): IProduct[]` — получить данные продуктов в корзине;

- `getTotal(): number ` — получить общую сумму стоимость товаров в корзине;

- `clearBasket(): void` — очистить корзину;

- `setOrderField(field: keyof (IContactsForm & IOrderForm), value: string)` — установить значения полей заказа;

- `getOrder(): IOrder` — получить заполенную форму заказа.


## *Компоненты представления*

**`Component<T>`**
    
В проекте выполняет роль View. Абстрактный класс базового компонента представляет собой инструментарий для работы с DOM-элементом. Наследуется всеми классами представления.

Поля:

- нет полей

Конструктор принимает `container: HTMLElement` и инициализирует его.
  
Методы:

- `toggleClass(element: HTMLElement, className: string, force?: boolean): void` — переключает класс;

- `setText(element: HTMLElement, value: unknown): void` — установить текстовое содержимое;

- `setDisabled(element: HTMLElement, state: boolean): void` — переключить статус блокировки элемента;

- `protected setHidden(element: HTMLElement): void` — скрыть элемент;

- `protected setVisible(element: HTMLElement): void` - показать элемент

- `protected setImage(element: HTMLImageElement, src: string, alt?: string): void` — установить изображение;

- `render(data?: Partial<T>): HTMLElement` — принимает объект с данными и возвращает готовый DOM-элемент с этими данными.

**`Modal`**
    
Класс реализующий вид и функционал модального окна. Наследуется от класса `Component`.

Методы:

- `content(content: HTMLElement): void` — устанавливает контент внутри модального окна;

- `open: void` — открывает модальное окно;

- `close: void` — закрывает модальное окно;

- `render(data: IModalData): HTMLElement` — переопределяет родительский метод, принимает объект с данными. `IModalData` интерфейс данных. Возвращает DOM-элемент с этими данными;

**`Form<T>`**
    
Общий класс для работы с формами. Наследуется от класса `Component`. Отвечает за установку ошибок при заполнении формы, блокировку кнопки сабмита, если форма не валидна, и отрисовку самой формы. Класс является дженериком и принимает в переменной `T` тип и состав данных, которые необходимо получить на вход для метода `render`.  

  Поля:

  - `protected _button: HTMLButtonElement`;
	- `protected form: HTMLFormElement`;
    
  Методы:

- `onInputChange(field: keyof T, value: string): void` — устанавливает слушатель на изменение полей формы;
  
- `valid(state: boolean): void` — отвечает за блокировку кнопки сабмита;
  
- `render(data: Partial<T> & IFormState): HTMLElement` — принимает объект с данными и возвращает готовый DOM-элемент с этими данными.
    
**`Page`**
    
Класс отвечает за отображение продуктов, отображение счетчика корзины. При нажатии на иконку корзины формируется соответствующее событие об открытии корзины и открывается модальное окно. Наследуется от класса `Component`.  `IPageData` интерфейс состава данных, которые передаются в родительский метод `render` для отображения на странице.

Поля:

-  `protected _counter: HTMLSpanElement`;
-  `protected _buttonBasket: HTMLButtonElement`;
-  `protected _gallery: IGalleryData`;
    
Методы:
    
- `set counter(value: number): void` — установить значение счетчика;

- `set gallery(gallery: IGalleryData): void` — отобразить продукты.
    
**`Card`**
    
Наследуется от класса `Component`. Отвечает за отображение карточки товара.

Поля:

- `protected _category: HTMLSpanElement`;
- `protected _title: HTMLElement`;
- `protected _image: HTMLImageElement`;
- `protected _description: HTMLElement`;
- `protected _price?: HTMLElement`;
- `protected _button?: HTMLButtonElement`

    
Методы:
    
`set category(value: string): void` — установить значение категории товара;

`set title(value: string): void` — установить значение заголовка товара;

`set image(value: string): void` — установить значение картинки товара;

`set descriptonvalue: string) : void` — установить значение описания товара;

`set price(value: number | null): void` — установить значение стоимости товара.
    
**`Basket`**
    
Наследуется от класса `Component`. Отвечает за отображение товаров в корзине и общей суммы заказа.

Поля:

- `protected _basketList: HTMLElement`;
- `protected _button: HTMLButtonElement`;
- `protected _total: HTMLSpanElement`.
    
Методы:
    
- `set items(items: HTMLElement[]): void` — установить элементы корзины в свойтсво `_basketList` класса;

- `set total(value: number): void` — установить значение общей суммы покупки;
    
**`Order`**

- `protected _buttonsPayment: HTMLButtonElement[]`;
- `protected _address: HTMLInputElement`.
    
Наследуется от класса **`Form<T>`.** Отвечает за отображение формы заказа. При незаполненной форме кнопка сабмита не активна. `IOrderForm` интерфейс состава данных, которые передаются в родительский метод `render` для отображения на странице.
    
Методы:
    
- `set address(value: string): void` — установить значение поля адрес;
  
- `selected(): void` — отвечает за установку класса для выбранной кнопки способа оплаты.
    
**`Contacts`**
    
Наследуется от класса **`Form<T>`.** Отвечает за отображение формы контактов.

Поля:

- `protected _email: HTMLInputElement`;
  
- `protected _phone: HTMLInputElement`.
    
Методы:

- `set email(value: string): void` — установить значение поля электронной почты;

- `set phone(value: string): void` — установить значение поля номера телефона;

    
**`Success`**
    
Наследуется от класса `Component`. Отвечает за отображение окна об успешной отправке заказа. Отображает общую сумму заказа. `ISuccessData` интерфейс состава данных, которые передаются в родительский метод `render` для отображения на странице.

Поля:

- `protected _description: HTMLElement`;
- `protected _button: HTMLButtonElement`.
    
Методы:
  
- `set description(value: number): void` — устанавливает значение общей суммы заказа.
    
## *Presenter*

**`EventEmitter`**
    
В проекте выполняет роль Presenter.Представляет собой брокер событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события.

Поля:

- `_events: Map<EventName, Set\<Subscriber\>>` — EventName - строка, а Subscriber - функция;

При инициализации создает общий брокер событий для всего приложения

Методы:

- `on<T extends object>(eventName: EventName), callBack: (event: T) => void): void` — Установить обработчик на событие;

- `off(eventName: EventName, callback: Subscriber): void` — Снять обработчик с события;

- `emit<T extends object>(eventName: string, data?: T): void` — Инициировать событие с данными;

- `onAll(callback: (event: EmitterEvent) => void): void` — Слушать все события;

- `offAll(): void`  — Снять обработчики со всех событий;

- `trigger<T extends object>(eventName: string, context?: Partial<T>): (data: T) => void` — Сделать коллбек триггер, генерирующий событие при вызове.

**`Api`**
    
Класс по работе с API. Имеет возможность сделать GET и POST запросы, а также имеет метод для обработки данных в формат json в ответе от сервера.

Поля класса:

- `baseUrl: string`

- `options: RequestInit`

Все поля заполняются при инициализации класса с помощью конструктора.

Методы:

- `protected handleResponse(response: Response)` — для обработки ответа от сервера. Данный метод вызывается из всех остальных методов;

- `get(uri: string)` — отправляет GET запрос;

- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` — отправляет POST запрос.

**`ApiShop`**
    
  Класс упрощает работу c сервером и приводит данные в ответе к удобному виду. Наследуется от класса `Api`. 
    
    Методы:
    
- `getProducts(): IProduct[]` — получить список продуктов и их данные;
    
- `getProduct(id: string): IProduct` — получить подробную информацию об одном товаре через его идентификатор;
    
- `orderProducts(order: IOrder): IOrderResult` — отправить заказ и получить ответ от сервера об успешной отправке в виде идентификатора заказа и общей стоимости;


**Описание событий**

- `gallery:changed` — изменились продукты;
- `modal:open` — модальное окно открыто;
- `modal:close` — модальное окно закрыто;
- `card:open` — выбрана карточка; 
- `basket:changed` — изменились элементы корзины;
- `basket:open` — корзина открыта;
- `basket:submit` — переход к оформлению заказа;
- `order:open` — открыта форма деталей заказа;
- `payment:selected` — выбран способ оплаты;
- `address:change` — изменилось поле ввода адреса доставки;
- `order:submit` — детали заказа подтверждены;
- `contacts:open` — открыта форма контактов;
- `email:change` — изменилось поле ввода email;
- `phone:change` — изменилось поле ввода номера телефона;
- `contacts:submit` — форма контактов подтверждена.
