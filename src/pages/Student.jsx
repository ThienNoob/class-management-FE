import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import DataTable from '../components/DataTable/DataTable'
import FormDialog from '../components/FormDialog/FormDialog'

const Student = () => {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([])

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  
  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL_STUDENT + "/student/getAll")
    .then(res => res.json())
    .then((result) => {
      setStudents(result)
    })
    .catch((err) => {
      alert(err)
    })
  }, []);

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '100px' }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ color: 'white'}}>Student Dashboard</h2>
        <Button variant='contained' style={{ width: '200px',backgroundColor: '#3CB371' }} onClick={handleOpen}>Add new Student</Button>
        <FormDialog title='Add new Student' type="student" action={'add'} open={open} onClose={handleClose}/>
      </section>
      <section >
        <DataTable type={'student'} data={students} />
      </section>
    </div>
  )
}

export default Student
