import asyncHandler from 'express-async-handler';
import Result from '../models/resultModel.js';
import PDFDocument from 'pdfkit'; // Assuming you use pdfkit
// ... other imports

// Function to safely fetch result and handle permissions
const getResultForCertificate = async (resultId, userId) => {
    // 1. Get the result and populate the user data (needed for name)
    const result = await Result.findById(resultId).populate('user');

    if (!result) {
        throw new Error('Result not found');
    }

    // 2. Check ownership
    if (result.user._id.toString() !== userId.toString()) {
        throw new Error('Not authorized to access this result');
    }

    // 3. Check purchase status (The check that was previously failing)
    if (!result.certificatePurchased) {
        // Use 402 Payment Required if authentication is passed but purchase isn't complete
        const error = new Error('Payment required to download certificate.');
        error.status = 402;
        throw error;
    }

    return result;
};


export const generateCertificate = asyncHandler(async (req, res) => {
    // req.user is set by the 'protect' middleware
    const resultId = req.params.id; 
    
    let result;
    try {
        console.log("Generating certificate for result");
        result = await getResultForCertificate(resultId, req.user._id);
        console.log("1.Generating certificate for result:", resultId, "User:", req.user._id);
    } catch (error) {
        // Handle specific errors
        if (error.status === 402) {
             res.status(402).json({ message: error.message });
        } else {
             // For Not Found, Not Authorized, etc.
             res.status(404).json({ message: error.message });
        }
        return;
    }
    
    // ----------------------------------------------------
    // START PDF GENERATION
    // ----------------------------------------------------

    const doc = new PDFDocument({ layout: 'landscape', margin: 50 });
    
    // Buffer to store the PDF data
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    
    // Finalize the PDF and send the response
    doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);

        // *** CRITICAL RESPONSE HEADERS ***
        // 1. Tell the browser what type of file is being sent
        res.setHeader('Content-Type', 'application/pdf'); 
        
        // 2. Tell the browser to DOWNLOAD the file and suggest a filename
        // This is optional if using the frontend method, but good practice.
        res.setHeader('Content-Disposition', `attachment; filename="IQ_Certificate_${result.user.username.replace(/\s/g, '_')}.pdf"`); 
        
        // 3. Send the entire binary buffer to the frontend
        res.send(pdfBuffer); 
    });

    // Example content generation (customize this)
    doc.fontSize(40).text('CERTIFICATE OF ACHIEVEMENT', { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text('This certifies that', { align: 'center' });
    doc.moveDown();
    doc.fontSize(30).text(result.user.name, { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text(`has successfully completed the IQ Test with a score of ${result.score}.`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Test Date: ${result.createdAt.toLocaleDateString()}`, { align: 'right' });


    // End the document stream
    doc.end(); 
});