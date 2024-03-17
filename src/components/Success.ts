import { ISuccessData, ISuccessAction } from "../types";
import { ensureElement, formatNumberWithSeparator } from "../utils/utils";
import { Component } from "./base/Component";

export class Success extends Component<ISuccessData> {
  protected _description: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, actions: ISuccessAction) {
    super(container);

    this._description = ensureElement<HTMLElement>('.order-success__description', container);
    this._button = ensureElement<HTMLButtonElement>('.order-success__close', container);

    this._button.addEventListener('click', actions.onClick);
  }

  set description(value: number) {
    this.setText(this._description, `Списано ${formatNumberWithSeparator(value)} синапсов`);
  }
}