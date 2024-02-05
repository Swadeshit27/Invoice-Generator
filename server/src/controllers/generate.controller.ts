
import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import { generateCustomerInformation, generateHeader, generateInvoiceTable } from '../utils/CreatePDF';

export const generateInvoice = async (req: Request, res: Response) => {
    try {
        const { invoice } = req.body;
        const doc = new PDFDocument({ size: 'A4' });
        let filename = `Invoice_${Date.now()}`;
        filename = encodeURIComponent(filename) + '.pdf';
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
        generateHeader(doc);
        generateCustomerInformation(doc, invoice);
        generateInvoiceTable(doc, invoice);
        doc.end();
        doc.pipe(res);
    } catch (error) {
        res.status(500).json("internal server error")
    }

}