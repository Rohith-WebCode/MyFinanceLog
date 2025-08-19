import { Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const FullTransactionstable = () => {

//   const [rows, setRows] = useState([]);
//   const [rowCount, setRowCount] = useState(0);
//   const [page, setPage] = useState(0); 
//   const [pageSize, setPageSize] = useState(10);
//   const [loading, setLoading] = useState(false);

    const {pagination,allTransactions} = useSelector((state)=>state.Transaction)
    console.log(pagination.totalPages);


     const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "amount", headerName: "Amount", width: 120 },
    { field: "type", headerName: "Type", width: 100 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
  ];

    const rows = allTransactions.map((tx) => ({
    id: tx._id,  // DataGrid needs "id"
    ...tx,
  }));

    return(
    <div>
    <Paper sx={{ height: 400, width: '100%', p: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns }
        pagination
        paginationMode="server"   
        rowCount={pagination.total}  
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          border: 'none',
          boxShadow: 2,
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            fontWeight: 'bold',
          },
        }}
      />
    </Paper>
    </div>
    )
  
}

export default FullTransactionstable