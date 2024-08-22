import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { DataGrid, gridClasses, GridRowEditStopReasons, GridRowModes, useGridApiContext } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, Dialog, DialogContent, DialogTitle, IconButton, LinearProgress, Stack, TextField, Tooltip } from '@mui/material';
import UserForm from './form';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify-icon/react';
import { deleteDataList, getDataList, updateDataList } from '../redux/reducers/data';
import { deleteData, getData, updateData } from '../@core/api/common_api';
import { deleteSweetAlert, handleToast } from '../utils/utils';

const defaultTheme = createTheme();

export default function View() {
  const dispatch = useDispatch()
    const [dialog,setDialog]=useState(false)
    const [FilterData, setFilterData]=useState()
    const [rowModesModel, setRowModesModel] = useState({});
    const { Datalist } = useSelector((store) => store.Data)

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleUpdateDataList = async(data)=>{
    await updateData(data)
    .then((res)=>{
      if (res.status===1) {
        dispatch(updateDataList(res.data))
        handleToast(res.status, res.message);
      }
    })
    .catch((err)=>console.log(err)
    )
    const updatedRow = { ...data, isNew: false };
    return updatedRow;
  }

  const handleDeleteData = async(id)=>{
    deleteSweetAlert({}).then(async function (result) {
      if (result.isConfirmed === true) {
        await deleteData({data_id:id})
        .then((res)=>{
          if(res.status===1){
            dispatch(deleteDataList(id))
            handleToast(res.status, res.message);
          }
        })
      }})
  

  }

  const handleGetData = async ()=>{
   await getData()
   .then((res)=>{
    if(res.status){
      dispatch(getDataList(res.data))
    }
   })
   .catch((err)=>alert(err))
  }

  const columns = [
    {
      field: 'id',
      headerName: 'No',
      width: 100,
    },
    {
      field: 'firstname',
      headerName: 'First Name',
      flex: 1,
      sortingOrder: ['desc', 'asc'],
      editable: true, // Enable cell editing
      renderCell: ({ row }) => (
        <span style={{ border: 'none', outline: 'none' }}>{row.firstname}</span>
      ),
      renderEditCell: (row) => <CustomEditComponent data-testid="edit-input" {...row} />,
    },
    {
        field: 'lastname',
        headerName: 'Last Name',
        flex: 1,
        sortingOrder: ['desc', 'asc'],
        editable: true, // Enable cell editing
        renderCell: ({ row }) => (
          <span style={{ border: 'none', outline: 'none' }}>{row.lastname}</span>
        ),
        renderEditCell: (row) => <CustomEditComponent data-testid="edit-input" {...row} />,
      },
      {
        field: 'mobile',
        headerName: 'Mobile No.',
        flex: 1,
        sortingOrder: ['desc', 'asc'],
        editable: true, // Enable cell editing
        renderCell: ({ row }) => (
          <span style={{ border: 'none', outline: 'none' }}>{row.mobile}</span>
        ),
        renderEditCell: (row) => <CustomEditComponent data-testid="edit-input" {...row} />,
      },
      {
        field: 'email',
        headerName: 'Email Address',
        flex: 1,
        sortingOrder: ['desc', 'asc'],
        editable: true, // Enable cell editing
        renderCell: ({ row }) => (
          <span style={{ border: 'none', outline: 'none' }}>{row.email}</span>
        ),
        renderEditCell: (row) => <CustomEditComponent data-testid="edit-input" {...row} />,
      },
      {
        field: 'password',
        headerName: 'Password',
        flex: 1,
        sortingOrder: ['desc', 'asc'],
        editable: true, // Enable cell editing
        renderCell: ({ row }) => (
          <span style={{ border: 'none', outline: 'none' }}>{row.password}</span>
        ),
        renderEditCell: (row) => <CustomEditComponent data-testid="edit-input" {...row} />,
      },
    
    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      headerName: 'Actions',
      cellClassName: 'actions',
      sortable: false,
      getActions: ({ id, row }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <Tooltip title="Save" arrow>
              <IconButton color="success" 
              onClick={handleSaveClick(id)}
              >
              <Icon icon="weui:done-filled" />
              </IconButton>
            </Tooltip>,
            <Tooltip title="Cancel" arrow>
              <IconButton color="error" 
              onClick={handleCancelClick(id)}
              >
                <Icon icon="weui:close-filled" />
              </IconButton>
            </Tooltip>,
          ];
        }
        return [
          <Tooltip title="Edit" arrow>
            <IconButton color="success" 
            onClick={handleEditClick(id)}
            >
              <Icon icon="akar-icons:edit" />
            </IconButton>
          </Tooltip>,
          <Tooltip title="Delete" arrow>
            <IconButton
              onClick={() => {
                handleDeleteData(row?.data_id);
              }}
              color="error"
            >
             <Icon icon="maki:waste-basket" />
            </IconButton>
          </Tooltip>,
        ];
      },
    },
  ];
useEffect(()=>{
  if(Datalist?.length===0){
    handleGetData()
  }

},[])

const handleDataFilter = () => {
  if (!FilterData) {
    return Datalist;
  }
  const searchTerm =
    FilterData && typeof FilterData === 'string' ? FilterData.toLowerCase() : '';
  return Datalist.filter((row) => {
    const matchDataFirstName = row?.firstname?.toLowerCase().includes(searchTerm);
    const matchDataLAstName = row?.lastname?.toLowerCase().includes(searchTerm);
    const matchDataEmail = row?.email?.toLowerCase().includes(searchTerm);
    const matchDatamobile = row?.mobile?.toLowerCase().includes(searchTerm);
    return matchDataFirstName || matchDataLAstName || matchDataEmail || matchDatamobile;
  });
};


  return (
    <ThemeProvider theme={defaultTheme}>
    <Card sx={{ mb: 2 }}>
        <Stack spacing={1} flexGrow={1} direction="row" justifyContent="flex-end" sx={{ p: 2 }}>
          <TextField
            sx={{
              width: 'auto',
              mr: 2,
              my: { xs: 1, sm: 0 },
            }}
            size="small"
            name="search"
            label="Search"
            value={FilterData}
            onChange={(e) => {
              setFilterData(e.target.value);
            }}
          />
          <Button
            onClick={() => {
            setDialog(true)
            }}
             variant="contained"
            color="primary"
            sx={{ mr: 2 }}
          >
            Add
          </Button>
        </Stack>
      </Card>
      <Card className="dataGrid-card">
        <DataGrid
          columns={columns}
          rows={(FilterData?.length ? handleDataFilter():Datalist)?.map((item, index) => ({
            id: index + 1,
            ...item,
          }))}
          getRowId={(row) => row?.data_id}
          disableRowSelectionOnClick
          disableColumnSelector
          disableColumnMenu
          disableColumnFilter
          onRowEditStop={handleRowEditStop}
          onRowModesModelChange={(data) => setRowModesModel(data)}
          rowModesModel={rowModesModel}
          columnHeaderHeight={40}
          pagination
          pageSizeOptions={[10, 25, 50, 75, 100]}
          processRowUpdate={handleUpdateDataList}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          style={
            handleDataFilter().length === 0 || Datalist.length === 0
              ? { height: 500 }
              : {}
          }
          localeText={{ noRowsLabel: 'There are No Records to Display' }}
          slots={{
            loadingOverlay: LinearProgress,
          }}
          sx={{
            [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
              outline: 'none !important',
            },
            [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
              outline: 'none !important',
            },
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
              outline: 'none !important',
            },
          }}
        />
      </Card>


      <Dialog open={dialog} onClose={!dialog} fullWidth maxWidth="xs">
        <DialogTitle>Add Data</DialogTitle>
        
          <DialogContent>
         <UserForm setDialog={setDialog}/>
          </DialogContent>
      </Dialog>


    </ThemeProvider>
  );
}


const CustomEditComponent = (props) => {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();
    const handleValueChange = (event) => {
      const newValue = event.target.value;
      apiRef.current.setEditCellValue({
        id,
        field,
        value: newValue,
      });
    };
  
    return (
      <TextField
        data-testid="edit-title"
        value={value}
        size="small"
        onChange={handleValueChange}
        autoFocus
      />
    );
  };
  
  CustomEditComponent.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    field: PropTypes.string.isRequired,
  };