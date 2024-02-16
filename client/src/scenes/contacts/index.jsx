import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://admin-dashboard-backend-1sc0.onrender.com/api/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Map over the data and handle empty values
        const formattedData = data.map((item) => ({
          ...item,
          id: item._id,
          country: item.country || "N/A", // If impact is empty, set it to "N/A"
          likelihood: item.likelihood || "N/A", // If likelihood is empty, set it to "N/A"
          start_year: item.start_year || "N/A",
          end_year: item.end_year || "N/A",
          relevance: item.relevance || "N/A",
          pestle: item.pestle || "N/A",
          source: item.source || "N/A",
          topic: item.topic || "N/A",
        }));
        setUsers(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { field: "topic", headerName: "Topic", flex: 0.5 },
    {
      field: "source",
      headerName: "Source ",
      flex: 1,
    },
    {
      field: "likelihood",
      headerName: "Likelihood",
      flex: 1,
    },
    {
      field: "relevance",
      headerName: "Relevance",
      flex: 1,
    },
    {
      field: "intensity",
      headerName: "Intensity",
      flex: 1,
    },

    {
      field: "country",
      headerName: "Country",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    
    {
      field: "pestle",
      headerName: "Pestle",
      flex: 1,
    },
    {
      field: "start_year",
      headerAlign: "left",
      align: "left",
      headerName: "Start_year",
    },
    {
      field: "end_year",
      headerName: "End_year",
      headerAlign: "left",
      align: "left",
    },
   
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
