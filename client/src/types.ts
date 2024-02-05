export interface tableDataType {
    slNo?: number | string,
    product: string,
    qty: number | string,
    price: number | string,
    total: number | string,
    action?: string | React.ReactNode
}

export interface Product {
    id: string;
    name: string;
    qty: number ;
    price: number;
}
export interface userDetails {
    name: string;
    email: string;
}

export interface CounterState {
    products: Product[];
    totalPrice: number;
    token: string,
    user: userDetails | null, 
    invoice: InvoiceType,
}

export interface InvoiceItem {
    name: string;
    qty: number;
    price: number;
    total?: number;
}

export interface InvoiceType {
    invoiceNumber: string;
    customerName: string;
    customerEmail: string;
    finalPrice: number;
    products: InvoiceItem[];
}

export interface userLoginType{
    email: string;
    password: string;
}
export interface SignUpTypes extends userLoginType{
    name: string;
}