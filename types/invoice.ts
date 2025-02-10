export interface InvoiceData {
    customer_name: string;
    customer_email: string;
    customer_gstin?: string;
    customer_address?: string;
    description: string;
    mrp: number;
    discount: number;
    date: string;
    invoice_no: string;
    order_no: string;
}

export interface CalculatedAmounts {
    taxableAmount: number;
    gstAmount: number;
    totalAmount: number;
    cgst: number;
    sgst: number;
}
