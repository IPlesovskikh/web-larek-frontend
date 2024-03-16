export interface IAppStateData {
	products: IProduct[];
	basket: string[];
	order: IOrder;
}

export interface IProduct {
	id: string;
	descridtion: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface IOrder {
	payment: PaymentType;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export type PaymentType = 'card' | 'cash';


export interface IOrderResult {
	id: string;
	total: number;
}

export interface IPageData {
	counter: number;
	gallery: IGalleryData;
}

export interface IGalleryData {
	items: HTMLButtonElement[];
}

export interface IModalData {
	content: HTMLElement;
}

export interface IBasketData {
	items: HTMLElement[];
	total: number;
}

export interface IOrderForm {
	payment: string;
	address: string;
}

export interface IContactsForm {
	email: string;
	phone: string;
}
