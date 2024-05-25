import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable/DataTable'
import FormDialog from '../components/FormDialog/FormDialog';

const Lecture = () => {
  const [open, setOpen] = useState(false);
  const [lecturers, setLecturers] = useState([])

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL_LECTURER + "/lecturer/getAll")
    .then(res => res.json())
    .then((result) => {
      console.log(result)
      setLecturers(result)
    })
    .catch((err) => {
      alert(err)
    })
  }, []);

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '100px' }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ color: 'white'}}>Lecturer Dashboard</h2>
        <Button variant='contained' style={{ width: '200px',backgroundColor: '#3CB371' }} onClick={handleOpen}>Add new Lecturer</Button>
        <FormDialog title='Add new Lecturer' type="lecturer" action={'add'} open={open} onClose={handleClose}/>
      </section>
      <section >
        <DataTable type={'lecturer'} data={lecturers.map( lecturer => ({...lecturer, id: lecturer._id}))} />
      </section>
    </div>
  )
}

export default Lecture
