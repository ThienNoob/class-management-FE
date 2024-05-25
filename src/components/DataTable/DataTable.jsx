import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { student_columns } from '../../constants/student_columns';
import { lecturer_columns } from '../../constants/lecturer_columns';
import { class_columns } from '../../constants/class_columns';
import { Button } from '@mui/material';
import FormDialog from '../FormDialog/FormDialog';

const DataTable = ({ type, data }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [seletedRowId, setSelectedRowId] = useState(null);

    let columns;
    switch (type) {
        case 'student':
            columns = student_columns;
            break;
        case 'lecturer':
            columns = lecturer_columns;
            break;
        case 'class':
            columns = class_columns;
            break;
        default:
            columns = [];
            break;
    }
    
    const editDeleteColumns = [
        {
            field: 'edit',
            headerName: 'Edit',
            width: 100,
            renderCell: (params) => (
                <Button
                    variant='contained'
                    style={{ backgroundColor: '#FFD700', color: 'black' }}
                    onClick={() => handleOpenDialog(params.id)}
                >
                    Edit
                </Button>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 100,
            renderCell: (params) => (
                <Button
                    variant='contained'
                    style={{ backgroundColor: '#DC143C' }}
                    onClick={() => handleDelete(params.id)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    columns = [...columns, ...editDeleteColumns];

    const handleDelete = (id) => {
        if (type === 'student') {
            fetch(process.env.REACT_APP_BASE_URL_STUDENT + "/student/"+id, {
            method: "DELETE"
            })
            .then(() => {
                alert("Student deleted successfully")
            })
            .catch((err) => {
                alert(err)
            })
        } else if (type === 'lecturer') {
            fetch(process.env.REACT_APP_BASE_URL_LECTURER + "/lecturer/"+id, {
            method: "DELETE"
            })
            .then(() => {
                alert("Lecturer deleted successfully")
            })
            .catch((err) => {
                alert(err)
            })
        } else if (type === 'class') {
            fetch(process.env.REACT_APP_BASE_URL_CLASS + "/class/"+id, {
            method: "DELETE"
            })
            .then(() => {
                alert("Class deleted successfully")
            })
            .catch((err) => {
                alert(err)
            })
        }
    }
    
    const handleOpenDialog = (id) => {
        setSelectedRowId(id);
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedRowId(null);
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                style={{ backgroundColor: '#0E78F9' }}
            />
            <FormDialog title={type === 'student' ? 'Edit Student' : 'Edit Lecturer'} type={type} action={'edit'} selectedId={seletedRowId} open={openDialog} onClose={handleCloseDialog}/>
        </div>
    );
};

export default DataTable;
