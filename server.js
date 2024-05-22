const express = require('express');
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002'); // Replace with your React app's origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/api/data', (req, res) => {
  const csvFilePath = path.join(__dirname, 'public', 'salaries.csv');
  console.log(`Reading CSV file from: ${csvFilePath}`);
  const file = fs.createReadStream(csvFilePath);

  let dataBuffer = '';

  file.on('data', (chunk) => {
    dataBuffer += chunk;
  });

  file.on('end', () => {
    Papa.parse(dataBuffer, {
      header: true,
      skipEmptyLines: 'greedy',
      error: (error) => {
        console.error('Parsing error:', error);
      },
      complete: (result) => {
        if (result.errors.length) {
          console.error('Parsing errors:', result.errors);
          const rows = result.data.filter(row => !row.errors);
          console.log('Filtered data:', rows);
          processData(rows, res);
        } else {
          console.log('Parsed CSV data:', result.data);
          processData(result.data, res);
        }
      },
    });
  });

  file.on('error', (error) => {
    console.error('Error reading the CSV file:', error);
    res.status(500).json({ error: 'Error reading the CSV file' });
  });
});

function processData(data, res) {
  const yearData = {};

  data.forEach((row) => {
    const year = row.year;
    const salaryInUsd = parseFloat(row.salary_in_usd);
    if (!year || isNaN(salaryInUsd)) {
      console.warn('Invalid row data:', row);
      return;
    }
    
    if (!yearData[year]) {
      yearData[year] = { totalJobs: 0, totalSalary: 0 };
    }
    yearData[year].totalJobs += 1;
    yearData[year].totalSalary += salaryInUsd;
  });

  const processedData = Object.keys(yearData).map((year) => ({
    year,
    totalJobs: yearData[year].totalJobs,
    averageSalary: yearData[year].totalSalary / yearData[year].totalJobs,
  }));

  console.log('Processed data:', processedData);
  res.json(processedData);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
