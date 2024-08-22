import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { DataGrid, gridClasses, GridRowEditStopReasons, GridRowModes, useGridApiContext, GridEventListener, GridRowModel,GridColDef } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, Dialog, DialogContent, DialogTitle, IconButton, LinearProgress, Stack, TextField, Tooltip } from '@mui/material';
import UserForm from './form';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify-icon/react';
import { deleteDataList, getDataList, updateDataList } from '../redux/reducers/data';
import { deleteData, getData, updateData } from '../@core/api/common_api';
import { deleteSweetAlert, handleToast } from '../utils/utils';

// Define types for your data
interface DataItem {
  data_id: number;
  firstname: string;
  lastname: string;
  mobile: string;
  email: string;
  password: string;
}

interface RowModesModel {
  [key: string]: { mode: GridRowModes; ignoreModifications?: boolean };
}
  

const defaultTheme = createTheme();

export default function View() {
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState<boolean>(false);
  const [FilterData, setFilterData] = useState<string | undefined>(undefined);
  const [rowModesModel, setRowModesModel] = useState<RowModesModel>({});
  const { Datalist } = useSelector((store: any) => store.Data);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: number) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: number) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: number) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleUpdateDataList = async (data: GridRowModel) => {
    try {
      const res = await updateData(data);
      if (res.status === 1) {
        dispatch(updateDataList(res.data));
        handleToast(res.status, res.message);
      }
      return { ...data, isNew: false };
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteData = async (id: number) => {
    try {
      const result = await deleteSweetAlert({});
      if (result.isConfirmed) {
        const res = await deleteData({ data_id: id });
        if (res.status === 1) {
          dispatch(deleteDataList(id));
          handleToast(res.status, res.message);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGetData = async () => {
    try {
      const res = await getData();
      if (res.status) {
        dispatch(getDataList(res.data));
      }
    } catch (err) {
      alert(err);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'No', width: 100 },
    {
      field: 'firstname',
      headerName: 'First Name',
      flex: 1,
      sortingOrder: ['desc', 'asc'],
      editable: true,
      renderCell: ({row}:any) => <span style={{ border: 'none', outline: 'none' }}>{row.firstname}</span>,
      renderEditCell: (props:any) => <CustomEditComponent data-testid="edit-input" {...props} />,
    },
    {
      field: 'lastname',
      headerName: 'Last Name',
      flex: 1,
      sortingOrder: ['desc', 'asc'],
      editable: true,
      renderCell: ({ row }:any) => <span style={{ border: 'none', outline: 'none' }}>{row.lastname}</span>,
      renderEditCell: (props:any) => <CustomEditComponent data-testid="edit-input" {...props} />,
    },
    {
      field: 'mobile',
      headerName: 'Mobile No.',
      flex: 1,
      sortingOrder: ['desc', 'asc'],
      editable: true,
      renderCell: ({ row }:any) => <span style={{ border: 'none', outline: 'none' }}>{row.mobile}</span>,
      renderEditCell: (props:any) => <CustomEditComponent data-testid="edit-input" {...props} />,
    },
    {
      field: 'email',
      headerName: 'Email Address',
      flex: 1,
      sortingOrder: ['desc', 'asc'],
      editable: true,
      renderCell: ({ row }:any) => <span style={{ border: 'none', outline: 'none' }}>{row.email}</span>,
      renderEditCell: (props:any) => <CustomEditComponent data-testid="edit-input" {...props} />,
    },
    {
      field: 'password',
      headerName: 'Password',
      flex: 1,
      sortingOrder: ['desc', 'asc'],
      editable: true,
      renderCell: ({ row }:any) => <span style={{ border: 'none', outline: 'none' }}>{row.password}</span>,
      renderEditCell: (props:any) => <CustomEditComponent data-testid="edit-input" {...props} />,
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      headerName: 'Actions',
      cellClassName: 'actions',
      sortable: false,
      getActions: ({ id, row }:any) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <Tooltip title="Save" arrow key="save">
              <IconButton color="success" onClick={handleSaveClick(id)}>
                <Icon icon="weui:done-filled" />
              </IconButton>
            </Tooltip>,
            <Tooltip title="Cancel" arrow key="cancel">
              <IconButton color="error" onClick={handleCancelClick(id)}>
                <Icon icon="weui:close-filled" />
              </IconButton>
            </Tooltip>,
          ];
        }
        return [
          <Tooltip title="Edit" arrow key="edit">
            <IconButton color="success" onClick={handleEditClick(id)}>
              <Icon icon="akar-icons:edit" />
            </IconButton>
          </Tooltip>,
          <Tooltip title="Delete" arrow key="delete">
            <IconButton onClick={() => handleDeleteData(row?.data_id)} color="error">
              <Icon icon="maki:waste-basket" />
            </IconButton>
          </Tooltip>,
        ];
      },
    },
  ];

  useEffect(() => {
    if (Datalist?.length === 0) {
      handleGetData();
    }
  }, [Datalist]);

  const handleDataFilter = () => {
    if (!FilterData) {
      return Datalist;
    }
    const searchTerm = FilterData.toLowerCase();
    return Datalist.filter((row:any) => {
      const matchDataFirstName = row?.firstname?.toLowerCase().includes(searchTerm);
      const matchDataLastName = row?.lastname?.toLowerCase().includes(searchTerm);
      const matchDataEmail = row?.email?.toLowerCase().includes(searchTerm);
      const matchDataMobile = row?.mobile?.toLowerCase().includes(searchTerm);
      return matchDataFirstName || matchDataLastName || matchDataEmail || matchDataMobile;
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
            onChange={(e) => setFilterData(e.target.value)}
          />
          <Button
            onClick={() => setDialog(true)}
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
          rows={(FilterData?.length ? handleDataFilter() : Datalist)?.map((item:any, index:any) => ({
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

      <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle>Add Data</DialogTitle>
        <DialogContent>
          <UserForm setDialog={setDialog} />
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

interface CustomEditComponentProps {
  id: string;
  value: any;
  field: string;
}

const CustomEditComponent: React.FC<CustomEditComponentProps> = (props) => {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
