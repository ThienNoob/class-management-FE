import React, { useEffect, useState } from 'react'
import { getAllStudent, addStudent } from '../services/StudentApi';

const useStudent = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const students = await getAllStudent();
                setStudents(students);
            } catch (error) {
                alert('Failed to fetch students: ' + error);
            }
        }
        fetchData();
    }, []);

    const handleAddStudent = async (student) => {
        try {
            const newStudent = await addStudent(student);
            setStudents([...students, newStudent]);
        } catch (error) {
            alert('Failed to add student: ' + error);
        }
    };

    return {
        students,
        handleAddStudent,
    };
}

export default useStudent;
