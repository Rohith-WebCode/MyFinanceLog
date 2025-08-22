import { useEffect, useState } from "react";
import { FaChartLine } from "react-icons/fa";
import { PiChartLineDownBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransactions, getIncome } from "../store/TransactionSlice";
import { MdDelete } from "react-icons/md";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const IncomeTable = () => {

   const dispatch = useDispatch();
   const [open, setOpen] = useState(false);
   const [selectedId, setSelectedId] = useState(null);
  const {pagination,allIncome } = useSelector(
    (state) => state.Transaction
  );

 
  useEffect(() => {
    dispatch(getIncome(1));
  }, [dispatch]);


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      dispatch(getIncome(newPage));
    }
  };


  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

   const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

 const handleConfirmDelete  = async()=>{
  if (!selectedId) return
  try {
    await dispatch(deleteTransactions(selectedId)) 
    dispatch(getIncome(1));
  } catch (error) {
    console.error("Delete failed:", error);
  }
  finally{
    handleClose()
  }
};


  return (
  <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg">Income</p>
      </div>

      <div className="pt-2 overflow-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2 text-sm md:text-base font-semibold text-gray-700 hidden sm:block">
                Category
              </th>
              <th className="px-4 py-2 text-sm md:text-base font-semibold text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-sm md:text-base font-semibold text-gray-700 hidden lg:block">
                Date
              </th>
              <th className="px-4 py-2 text-sm md:text-base font-semibold text-gray-700">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {allIncome.length > 0 ? (
              allIncome.map((tx) => (
                <tr key={tx._id} className="group border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm hidden sm:block">{tx.category}</td>

                  <td className="px-4 py-2">
                    <p className="font-medium text-sm">{tx.title}</p>
                    <span className="text-xs text-gray-500 block lg:hidden">
                      {new Date(tx.date).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm hidden lg:block">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm ">
                        ₹{tx.amount.toLocaleString()}
                      </span>
                      {tx.type === "income" ? (
                        <FaChartLine className="text-green-500" />
                      ) : (
                        <PiChartLineDownBold className="text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="text-right ">
                    <MdDelete onClick={()=>handleClickOpen(tx._id)} className="hidden text-red-500 cursor-pointer group-hover:inline"/>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center text-gray-500 py-6 text-sm"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
     
         <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page === pagination.totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>



      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Delete Transaction"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this transaction? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default IncomeTable