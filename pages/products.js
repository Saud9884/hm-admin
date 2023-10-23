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
function CustomCellRenderer({ value }) {
  return <div>{value}</div>;
}

function ServerFileListView() {
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "col1", headerName: "Title", width: 300 },
    { field: "col2", headerName: "Price", width: 200 },
    { field: "col3", headerName: "Serial", width: 200 },
    { field: "col4", headerName: "Quantity", width: 200 },
    {
      field: "col5",
      headerName: "Options",
      width: 200,
      renderCell: (params) => (
        <CustomCellRenderer value={params.row.col5} />
      ),
    },
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
          col5: (
            <div className="flex gap-2">
              <Link href={`/products/edit/${x._id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                
              </Link>
              <span> | </span>
              <Link href={`/products/delete/${x._id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                
              </Link>
            </div>
          ),
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

