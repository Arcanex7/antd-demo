import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

interface DataType {
  key: React.Key;
  year: string;
  totalJobs: number;
  averageSalary: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Year',
    dataIndex: 'year',
    sorter: (a, b) => a.year.localeCompare(b.year),
  },
  {
    title: 'Number of Total Jobs',
    dataIndex: 'totalJobs',
    sorter: (a, b) => a.totalJobs - b.totalJobs,
  },
  {
    title: 'Average Salary (USD)',
    dataIndex: 'averageSalary',
    sorter: (a, b) => a.averageSalary - b.averageSalary,
  },
];

const CsvTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/data');
        const result = await response.json();
        const processedData = result.map((item: any, index: number) => ({
          key: index,
          year: item.year,
          totalJobs: item.totalJobs,
          averageSalary: item.averageSalary,
        }));
        setData(processedData);
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };

    fetchData();
  }, []);

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={{ pageSize: 10 }}
      showSorterTooltip={{ title: 'Click to sort' }}
    />
  );
};

export default CsvTable
