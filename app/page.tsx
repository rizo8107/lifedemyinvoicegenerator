'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import InvoiceForm from '../components/InvoiceForm';
import { InvoiceData, CalculatedAmounts } from '../types/invoice';

// Dynamically import the PDF component to avoid SSR issues
const InvoicePDF = dynamic(() => import('../components/InvoicePDF'), {
    ssr: false
});

export default function Home() {
    const [calculatedAmounts, setCalculatedAmounts] = useState<CalculatedAmounts | null>(null);
    const [showPDF, setShowPDF] = useState(false);
    const [currentData, setCurrentData] = useState<InvoiceData | null>(null);
    const [signatureUrl, setSignatureUrl] = useState<string>('/sign.png');

    // Load default signature on mount
    useEffect(() => {
        const loadDefaultSignature = async () => {
            try {
                const response = await fetch('/sign.png');
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSignatureUrl(reader.result as string);
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error('Error loading default signature:', error);
            }
        };
        loadDefaultSignature();
    }, []);

    const calculateAmounts = (data: InvoiceData): CalculatedAmounts => {
        const discountedMrp = data.mrp - data.discount;
        const taxableAmount = Number((discountedMrp / 1.18).toFixed(2));
        const gstAmount = Number((discountedMrp - taxableAmount).toFixed(2));
        const totalAmount = discountedMrp;
        const cgst = Number((gstAmount / 2).toFixed(2));
        const sgst = cgst;

        return {
            taxableAmount,
            gstAmount,
            totalAmount,
            cgst,
            sgst
        };
    };

    const handleCalculate = (data: InvoiceData) => {
        const amounts = calculateAmounts(data);
        setCalculatedAmounts(amounts);
    };

    const handleGenerate = (data: InvoiceData) => {
        const amounts = calculateAmounts(data);
        setCalculatedAmounts(amounts);
        setCurrentData(data);
        setShowPDF(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {!showPDF ? (
                    <InvoiceForm
                        onCalculate={handleCalculate}
                        onGenerate={handleGenerate}
                        calculatedAmounts={calculatedAmounts}
                    />
                ) : currentData && calculatedAmounts ? (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <button
                                onClick={() => setShowPDF(false)}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Back to Form
                            </button>
                        </div>
                        <div className="p-6">
                            <InvoicePDF
                                data={currentData}
                                amounts={calculatedAmounts}
                                signatureUrl={signatureUrl}
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
