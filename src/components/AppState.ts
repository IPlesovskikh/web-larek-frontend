import {
	IAppStateData,
	IProduct,
	IProductItem,
	IOrder,
	FormErrors,
	IOrderForm,
	IContactsForm,
} from '../types';
import { Model } from './base/Model';

export class AppState extends Model<IAppStateData> {
	protected products: IProductItem[];
	protected basket: IProductItem[];
	protected order: IOrder = {
		payment: '',
		address: '',
		email: '',
		phone: '',
		items: [],
		total: 0
	};
	protected formErrors: FormErrors = {};

	setProducts(items: IProduct[]) {
		this.products = items.map((item) => ({
			...item,
			basketState: false,
		}));
		this.emitChanges('gallery:changed', { products: this.products });
	}

	getProducts(): IProductItem[] {
		return this.products;
	}

	addToBasket(item: IProductItem) {
		this.products.find(product => item.id === product.id).basketState = true;
	}

	removeFromBasket(item: IProductItem) {
		this.products.find(product => item.id === product.id).basketState = false;
	}

	getBasketItems(): IProductItem[] {
		this.basket = this.products.filter((item) => {
			return item.basketState === true;
		});

		return this.basket;
	}

	getTotal(): number {
		return this.basket.reduce((accum, currentValue) => {
			return accum + currentValue.price;
		}, 0);
	}

	clearBasket() {
		this.basket.forEach((item) => {
			item.basketState = false;
		});
	}

	setOrderField(field: keyof (IContactsForm & IOrderForm), value: string) {
		this.order[field] = value;
		this.validateOrder();
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.payment) {
			errors.payment = 'Выберите способ оплаты';
		}
		if (!this.order.address) {
			errors.address = 'Указажите адрес доставки';
		}
		if (!this.order.email) {
			errors.email = 'Укажите email';
		}
		if (!this.order.phone) {
			errors.phone = 'Укажите телефон';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
	}

	getOrder(): IOrder {
		this.order.total = this.getTotal();
		this.order.items = this.getBasketItems().map(item => item.id);
		return this.order;
	}
}