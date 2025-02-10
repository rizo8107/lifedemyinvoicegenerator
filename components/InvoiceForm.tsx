import { useState } from 'react';
import { InvoiceData, CalculatedAmounts } from '../types/invoice';
import Image from 'next/image';

interface InvoiceFormProps {
    onGenerate: (data: InvoiceData) => void;
    onCalculate: (data: InvoiceData) => void;
    calculatedAmounts: CalculatedAmounts | null;
}

export default function InvoiceForm({ onGenerate, onCalculate, calculatedAmounts }: InvoiceFormProps) {
    const today = new Date().toISOString().split('T')[0];
    const generateInvoiceNumber = () => {
        const year = new Date().getFullYear();
        const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `INV/${year}-${month}/${randomNum}`;
    };
    
    const [formData, setFormData] = useState<InvoiceData>({
        customer_name: '',
        customer_email: '',
        customer_gstin: '',
        customer_address: '',
        description: '',
        mrp: 0,
        discount: 0,
        date: today,
        invoice_no: generateInvoiceNumber(),
        order_no: new Date().getTime().toString()
    });

    const [showGstin, setShowGstin] = useState(false);
    const [showAddress, setShowAddress] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'mrp' || name === 'discount' ? parseFloat(value) || 0 : value
        }));
    };

    const handleCalculate = () => {
        onCalculate(formData);
    };

    const handleGenerate = () => {
        onGenerate(formData);
    };

    const handleClear = () => {
        setFormData({
            customer_name: '',
            customer_email: '',
            customer_gstin: '',
            customer_address: '',
            description: '',
            mrp: 0,
            discount: 0,
            date: today,
            invoice_no: generateInvoiceNumber(),
            order_no: new Date().getTime().toString()
        });
        setShowGstin(false);
        setShowAddress(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center mb-4">
                    <img src="/LOGO.png" alt="Company Logo" className="w-24 h-24 object-contain mr-4" />
                    <div>
                        <h1 className="text-2xl font-semibold">TSMC Creations India Pvt.Ltd.</h1>
                        <p className="text-gray-600 text-sm">GSTIN: 33AAJCT3867G1Z4</p>
                        <p className="text-gray-600 text-sm">Chennai, Tamil Nadu - 600096, India</p>
                        <p className="text-gray-600 text-sm">Email: support@lifedemy.in</p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Invoice Details */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Invoice Details</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="invoice_no" className="block text-sm font-medium text-gray-700">Invoice Number</label>
                            <input
                                type="text"
                                id="invoice_no"
                                name="invoice_no"
                                value={formData.invoice_no}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                placeholder="INV/YYYY-MM/0001"
                            />
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Customer Details */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Customer Details</label>
                        <div className="mt-2 flex gap-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={showGstin}
                                    onChange={(e) => setShowGstin(e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Show GSTIN</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={showAddress}
                                    onChange={(e) => setShowAddress(e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Show Address</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="customer_name"
                                name="customer_name"
                                value={formData.customer_name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="customer_email"
                                name="customer_email"
                                value={formData.customer_email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        {showGstin && (
                            <div>
                                <label htmlFor="customer_gstin" className="block text-sm font-medium text-gray-700">GSTIN</label>
                                <input
                                    type="text"
                                    id="customer_gstin"
                                    name="customer_gstin"
                                    value={formData.customer_gstin}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                        )}
                        {showAddress && (
                            <div>
                                <label htmlFor="customer_address" className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    id="customer_address"
                                    name="customer_address"
                                    value={formData.customer_address}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Course Details */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Course Details</label>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="mrp" className="block text-sm font-medium text-gray-700">MRP Amount</label>
                            <input
                                type="number"
                                id="mrp"
                                name="mrp"
                                value={formData.mrp || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount</label>
                            <input
                                type="number"
                                id="discount"
                                name="discount"
                                value={formData.discount || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Calculated Amounts */}
                {calculatedAmounts && (
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Amount Summary</label>
                        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Taxable Amount</span>
                                <span className="font-medium">Rs. {calculatedAmounts.taxableAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">GST Amount (18%)</span>
                                <span className="font-medium">Rs. {calculatedAmounts.gstAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm font-medium border-t border-gray-200 pt-2">
                                <span>Total Amount</span>
                                <span className="text-lg">Rs. {calculatedAmounts.totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                <button
                    onClick={handleClear}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Clear
                </button>
                <button
                    onClick={handleCalculate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Calculate
                </button>
                <button
                    onClick={handleGenerate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Generate Invoice
                </button>
            </div>
        </div>
    );
}
