import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable/DataTable'
import { Button } from '@mui/material';
import FormDialog from '../components/FormDialog/FormDialog';

const Class = () => {
  const [open, setOpen] = useState(false);
  const [classes, setClasses] = useState([])

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL_CLASS + "/class/getAll")
    .then(res => res.json())
    .then((result) => {
      console.log(result)
      if (Array.isArray(result)) {
        setClasses(result)
      } else {
        alert(result.message);
      }
    })
    .catch((err) => {
      alert(err)
    })
  }, []);

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '100px' }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ color: 'white'}}>Class Dashboard</h2>
        <Button variant='contained' style={{ width: '200px',backgroundColor: '#3CB371' }} onClick={handleOpen}>Add new Class</Button>
        <FormDialog title='Add new Class' type="class" action={'add'} open={open} onClose={handleClose}/>
      </section>
      <section >
        <DataTable type={'class'} data={classes.map( classData => ({...classData, id: classData.classCode}))} />
      </section>
    </div>
  )
}

export default Class
