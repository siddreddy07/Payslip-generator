import React, { useState } from 'react';
import './App.css'; // Ensure this path is correct


const App = () => {
    const [file, setFile] = useState(null);
    const [employeeId, setEmployeeId] = useState('');
    const [employeeData, setEmployeeData] = useState(null);
    const [message, setMessage] = useState('');
    const [excelData, setExcelData] = useState([]);

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };



  const inputStyle = {
    border: '2px solid #007BFF',
    borderRadius: '5px',
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    marginRight: '2em',
  };

//Button CSS

    const handleMouseOver = (e) => {
      e.currentTarget.style.backgroundColor = '#0056b3';
    };
  
    const handleMouseOut = (e) => {
      e.currentTarget.style.backgroundColor = '#007BFF';
    };

    const buttonStyle = {
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    };

    // Handle file upload
    const handleFileUpload = async () => {
        if (!file) {
            alert('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('File upload failed');
            }

            const result = await res.json();
            setMessage(result.message);
            setExcelData(result.data);
            setEmployeeData(null); // Clear employee data when new file is uploaded
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Handle employee ID input change
    const handleEmployeeIdChange = (event) => {
        setEmployeeId(event.target.value);
    };

    // Fetch employee details based on employee ID
    const fetchEmployeeDetails = async () => {
        if (!employeeId) {
            alert('Please enter an employee ID.');
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/employee/${employeeId}`);

            if (!res.ok) {
                throw new Error('Employee not found');
            }

            const data = await res.json();
            setEmployeeData(data);
        } catch (error) {
            console.error('Error:', error);
            alert('Employee ID not found.');
        }
    };

    return (
        <div>
            <div style={{ textAlign: 'center', lineHeight: '200%' }}>
                <p className="h11">SYMBIOSIS TECHNOLOGIES</p>
                <p className="h22">PLOT N0 1&2, RUSHIKONDA,</p>
                <p className="h22">IT PARK, HILL NO-02, VISAKHAPATNAM-45</p>
            </div>

            <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>
                SALARY STATEMENT FOR THE MONTH OF JANUARY 2024
            </h3>

            <div className="container">
                <div className="smallcontainer">
                    <table>
                        <tbody>
                            <tr><td>EMPLOYEE CODE</td><td>{employeeData?.['Employee Code'] || 'N/A'}</td></tr>
                            <tr><td>EMPLOYEE NAME</td><td>{employeeData?.['Employee Name'] || 'N/A'}</td></tr>
                            <tr><td>DESIGNATION</td><td>{employeeData?.['Designation'] || 'N/A'}</td></tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr><td>DATE OF JOINING</td><td>{employeeData?.['Date Of Joining'] || 'N/A'}</td></tr>
                            <tr><td>EMPLOYMENT STATUS</td><td>{employeeData?.['Employment Status'] || 'N/A'}</td></tr>
                            <tr><td>STATEMENT OF THE MONTH</td><td>{employeeData?.['Statement for the month'] || 'N/A'}</td></tr>
                        </tbody>
                    </table>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">Classified Income</th>
                            <th colSpan="2">Deductions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Basic Pay</td>
                            <td>{employeeData?.['Basic Pay'] || 'N/A'}</td>
                            <td>Professional Tax</td>
                            <td>{employeeData?.['Professional Tax '] || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>House Rent Allowance</td>
                            <td>{employeeData?.['Hosue Rent Allowance'] || 'N/A'}</td>
                            <td>Income Tax</td>
                            <td>{employeeData?.['Income Tax'] || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>City Compensatory Allowance</td>
                            <td>{employeeData?.['City Compensatory Allowance'] || 'N/A'}</td>
                            <td>Provident Fund</td>
                            <td>{employeeData?.['Provident Fund'] || 0}</td>
                        </tr>
                        <tr>
                            <td>Travel Allowance</td>
                            <td>{employeeData?.['Travel Allowance'] || 0}</td>
                            <td>Leaves - Loss of Pay</td>
                            <td>{employeeData?.['Leaves-Loss of Pay'] || 0}</td>
                        </tr>
                        <tr>
                            <td>Food Allowance</td>
                            <td>{employeeData?.['Food Allowance'] || 'N/A'}</td>
                            <td>Others</td>
                            <td>{employeeData?.['Others'] || 0}</td>
                        </tr>
                        <tr>
                            <td>Performance Incentives</td>
                            <td>{employeeData?.['Performance Allowance'] || 'N/A'}</td>
                            <td>Others</td>
                            <td>{employeeData?.['Others'] || 0}</td>
                        </tr>
                    </tbody>
                </table>

                <table>
                    <thead>
                        <tr>
                            <th>GROSSPAY</th>
                            <th>Deductions</th>
                            <th>NETPAY</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{employeeData?.['Gross Pay'] || 'N/A'}</td>
                            <td>{employeeData?.['Deductions'] || 'N/A'}</td>
                            <td>{employeeData?.['Net Pay'] || 'N/A'}</td>
                        </tr>
                    </tbody>
                </table>

                <div style={{ paddingTop: '10px' }}>
                    <p>
                        We request you to verify employment details with our office on email:
                        <a href="mailto:hr@symbiosystech.com">hr@symbiosystech.com</a>
                    </p>
                </div>
                <p>This is computer generated. Hence no signature required.</p>

                {/* File upload section */}
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                    <button style={buttonStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut} onClick={handleFileUpload}>Upload Excel Sheet</button>
                </div>

                {/* Employee ID section */}
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <input
                        type="text"
                        value={employeeId}
                        style={inputStyle}
                        onChange={handleEmployeeIdChange}
                        placeholder="Enter Employee ID"
                    />
                    <button style={buttonStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut} onClick={fetchEmployeeDetails}>Fetch Details</button>
                </div>


                {/* Display success message */}
                {message && (
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <p>{message}</p>
                    </div>
                )}
            </div>

            <div>
    {excelData.length === 0 ? (
        <p className="text-center text-gray-500">No Excel sheet has been uploaded.</p>
    ) : (
        <div>
            <h2 className="text-lg font-bold mb-4 text-center">Uploaded Data:</h2>
            <div className="max-w-4xl mx-auto overflow-x-auto">
                <table className="min-w-full border-collapse bg-white shadow-md">
                    <thead>
                        <tr>
                            {Object.keys(excelData[0]).map((key) => (
                                <th key={key} className="w-96 px-6 py-4 border-black border-2 text-left text-black font-bold">
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {excelData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                {Object.values(row).map((value, i) => (
                                    <td key={i} className="w-96 px-6 py-4 border-2 border-black text-gray-600">
                                        {value}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )}
</div>




        </div>
    );
}

export default App;
