export interface IDiscountSettings {
    filter: (code: string) => ICheckedItem[];
    value: number;
}

export interface ICheckedItem {
    id: string;
    code: string;
    initialPrice: number;
    currentPrice: number;
}

export interface IPriceRule {
    value: number;
    filterName: string;
    settings?: Object;
    code: string;
}

export interface IFilterSettings {
    items: ICheckedItem[];
    settings?: any;
    code: string;
}