import React, { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const RadarChartComponent = () => {
    const [radarData, setRadarData] = useState([]);

    useEffect(() => {
        fetchDataFromAPI();
    }, []);

    const fetchDataFromAPI = async () => {
        try {
            const response = await fetch("http://localhost:5001/api/users"); 
            const jsonData = await response.json();
            processData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const processData = (jsonData) => {
        const aggregatedData = {};

        jsonData.forEach(item => {
            const { country, intensity, relevance, likelihood } = item;
            if (!aggregatedData[country]) {
                aggregatedData[country] = {
                    country,
                    intensity: 0,
                    relevance: 0,
                    likelihood: 0
                };
            }
            aggregatedData[country].intensity += intensity || 0;
            aggregatedData[country].relevance += relevance || 0;
            aggregatedData[country].likelihood += likelihood || 0;
        });

        const sortedData = Object.values(aggregatedData).sort((a, b) => b.intensity - a.intensity).slice(0, 5);

        setRadarData(sortedData);
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius={100} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="country" />
            <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
            <Radar name="Intensity" dataKey="intensity" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="Relevance" dataKey="relevance" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Radar name="Likelihood" dataKey="likelihood" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
        </RadarChart>
    </ResponsiveContainer>
    );
};

export default RadarChartComponent;
