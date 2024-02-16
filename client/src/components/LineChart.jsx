import React, { useEffect, useState } from "react";
import { LineChart, ResponsiveContainer,Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const LineChartComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchDataFromAPI();
    }, []);

    const fetchDataFromAPI = async () => {
        try {
            const response = await fetch("https://admin-dashboard-backend-1sc0.onrender.com/api/users");
            const jsonData = await response.json();
            processData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const processData = (jsonData) => {
        if (!Array.isArray(jsonData)) {
            console.error('Invalid data format: Expected an array.');
            return;
        }
        const processedData = jsonData.reduce((accumulator, currentValue) => {
            const year = currentValue.start_year;
            if (year) {
                accumulator[year] = (accumulator[year] || 0) + 1;
            }
            return accumulator;
        }, {});

        const formattedData = Object.entries(processedData).map(([year, value]) => ({
            year: parseInt(year), // Ensure year is parsed as integer
            value: value,
        }));

        setData(formattedData);
    };

    return data.length > 0 ? (
      <ResponsiveContainer width="100%" height="100%">
      <LineChart
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
  </ResponsiveContainer>
    ) : (
        <div><br /> Loading...</div>
    );
};

export default LineChartComponent;
