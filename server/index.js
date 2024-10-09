const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Store the uploaded JSON data in memory
let employeeData = [];

// const employeeData = [
//     { 'Employee Code': 'A001', 'Employee Name': 'Arun', 'Designation': 'Employee' },
//     { 'Employee Code': 'A002', 'Employee Name': 'Bina', 'Designation': 'Manager' }
// ];
// Handle file upload and conversion
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        // Read the Excel file from buffer
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheet = workbook.Sheets[sheetName]; // Get the sheet
        excelData = xlsx.utils.sheet_to_json(sheet); // Convert to JSON
        excelData = excelData.map(row => {
            if (row['Date Of Joining'] !== undefined) {
                const baseDate = new Date(1970, 0, 1); // January 1, 1970
                const joiningDate = new Date(baseDate.getTime() + row['Date Of Joining'] * 24 * 60 * 60 * 1000);
                const formattedDate = joiningDate.toLocaleDateString('en-GB'); // Format as DD-MM-YYYY
                return { ...row, 'Date Of Joining': formattedDate }; // Return new object with formatted date
            }
            return row; // Return original row if date doesn't exist
        });        

        res.json({ message: 'File uploaded and data processed successfully',data:excelData }); // Send success message
    } catch (error) {
        res.status(500).send('Error processing file');
    }
});

// Endpoint to get employee data by ID
app.get('/employee/:id', async(req, res) => {
    const { id } = req.params;
    console.log(id);
    // console.log(employeeData)
    const employee = await excelData.find(emp => String(emp['Employee Code']) === String(id));
    console.log(employee);
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).send('Employee not found');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
