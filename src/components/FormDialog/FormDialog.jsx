import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import React, { useState } from 'react'

const FormDialog = ({ title, type, action, selectedId, open, onClose }) => {
    const [formData, setFormData] = useState({});
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        if (action === 'add') {
            if (type === 'student') {
                handleAddStudent();
            } else if (type === 'lecturer') {
                handleAddLecturer();
            } else if (type === 'class') {
                handleAddClass();
            }
        } else if (action === 'edit') {
            if (type === 'student') {
                handleEditStudent(selectedId);
            } else if (type === 'lecturer') {
                handleEditLecturer(selectedId);
            } else if (type === 'class') {
                handleEditClass(selectedId);
            }
        }
        onClose();
    };

    const handleAddStudent = (e) => {
        if (e) e.preventDefault();
        const student = {
            fullName: formData.fullName,
            yearOfBirth: formData.yearOfBirth,
            course: formData.course,
            classCode: formData.classCode,
            phoneNumber: formData.phoneNumber,
            email: formData.email
         }
        fetch(process.env.REACT_APP_BASE_URL_STUDENT + "/student/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        })
        .then(() => {
            alert("Student added successfully")
            return fetch(`${process.env.REACT_APP_BASE_URL_CLASS}/class/update/${formData.classCode}`, {
                method: "PUT"
            });
        })
        .then(() => {
            alert("Class updated successfully");
        })
        .catch((err) => {
            alert(err)
        })
    }

    const handleAddLecturer = (e) => {
        if (e) e.preventDefault();
        const lecturer = {
            fullName: formData.fullName,
            degree: formData.degree,
            classCode: formData.classCode,
            phoneNumber: formData.phoneNumber,
            email: formData.email
         }
        fetch(process.env.REACT_APP_BASE_URL_LECTURER + "/lecturer/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lecturer)
        })
        .then(() => {
            alert("Lecturer added successfully")
            return fetch(`${process.env.REACT_APP_BASE_URL_CLASS}/class/update/${formData.classCode}`, {
                method: "PUT"
            });
        })
        .then(() => {
            alert("Class updated successfully");
        })
        .catch((err) => {
            alert(err)
        })
    }

    const handleAddClass = (e) => {
        if (e) e.preventDefault();
        const classData = {
            classCode: formData.classCode,
            className: formData.className
        }
        fetch(process.env.REACT_APP_BASE_URL_CLASS + "/class/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(classData)
        })
        .then(() => {
            alert("Class added successfully")
        })
        .catch((err) => {
            alert(err)
        })
    }
    
    const handleEditStudent = (id) => {
        const student = { 
            id: id,
            fullName: formData.fullName,
            yearOfBirth: formData.yearOfBirth,
            course: formData.course,
            classCode: formData.classCode,
            phoneNumber: formData.phoneNumber,
            email: formData.email
         }
        fetch("http://localhost:8080/student/"+id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        })
        .then(() => {
            alert("Student updated successfully")
        })
        .catch((err) => {
            alert(err)
        })
    }

    const handleEditLecturer = (id) => {
        const lecturer = {
            id: id,
            fullName: formData.fullName,
            degree: formData.degree,
            classCode: formData.classCode,
            phoneNumber: formData.phoneNumber,
            email: formData.email
        }
        fetch("http://localhost:5000/lecturer/"+id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lecturer)
        })
        .then(() => {
            alert("Lecturer updated successfully")
        })
        .catch((err) => {
            alert(err)
        })
    }

    const handleEditClass = (classCode) => {
        const classData = {
            className: formData.className,
        };
        fetch(`http://localhost:80/class/update/${classCode}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(classData)
        })
        .then(() => {
            alert("Class updated successfully")
        })
        .catch((err) => {
            alert(err)
        });
    };

    const getFields = () => {
        switch (type) {
            case 'student':
                return (
                    <>
                        <TextField
                            margin="dense"
                            name="fullName"
                            label="Full Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="yearOfBirth"
                            label="Year of Birth"
                            type="number"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="course"
                            label="Course"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="classCode"
                            label="Class Code"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="phoneNumber"
                            label="Phone Number"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </>
                );
            case 'lecturer':
                return (
                    <>
                        <TextField
                            margin="dense"
                            name="fullName"
                            label="Full Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="degree"
                            label="Degree"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="classCode"
                            label="Class Code"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="phoneNumber"
                            label="Phone Number"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </>
                );
            case 'class':
                return (
                    <>
                        <TextField
                            margin="dense"
                            name="classCode"
                            label="Class Code"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="className"
                            label="Class Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle style={{ fontWeight: 'bold' }}>{title}</DialogTitle>
            <DialogContent>{getFields()}</DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button variant='contained' onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FormDialog
