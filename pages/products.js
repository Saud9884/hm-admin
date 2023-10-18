import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import axios from "axios"; // Import axios for making API requests
import Layout from "@/components/Layout";
import Link from "next/link";

export const dataGridStyle = {
  color: "black",
  boxShadow: 2,
  

  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#005B41",
    fontSize: "18px",
    color : "white",
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: "#008170",
  },
  "& .MuiButtonBase-root": {
    color: "white",
    backgroundColor: "#232D3F",
    marginBottom: "6px",
    "&:hover": {
      backgroundColor: "#3DA58A",
    },
  },
  "& .columnHeaderRow": {
    backgroundColor: "red !important",
  },
  "& .MuiDataGrid-toolbar": {
    padding: "6px",
  },
  "& .MuiDataGrid-root": {
    padding: "4px",
  },
};

function ServerFileListView() {
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "col1", headerName: "Title", width: 300 },
    { field: "col2", headerName: "Price", width: 200 },
    { field: "col3", headerName: "Serial", width: 200 },
    { field: "col4", headerName: "Quantity", width: 200 },
    { field: "col5", headerName: "Options", width: 200 },
  ];

  useEffect(() => {
    // Make an API request to fetch data
    axios.get('/api/products').then((response) => {
      const serverFileList = response.data;
      if (serverFileList && serverFileList.length > 0) {
        const dataRows = serverFileList.map((x, index) => ({
          id: index + 1,
          col1: x.title || "Not Provided",
          col2: x.price || "Not Provided",
          col3: x.serial || "Not Provided",
          col4: x.quantity || "Not Provided",
          col5: "Not Provided",
        }));
        setRows(dataRows);
      }
    });
  }, []);

  return (
    <>
    <Layout>
    <Link className="btn-black" href={'/products/new'}>Add new product</Link>
      <Box sx={{ width: "95%", overflow: "auto", margin: "auto", marginTop: "3%" }}>
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            sx={dataGridStyle}
          />
        </div>
      </Box>
      </Layout>
    </>
  );
}

export default ServerFileListView;
