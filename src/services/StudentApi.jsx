const BASE_URL = "http://localhost:8080";

export const getAllStudent = async () => {
    const response = await fetch(`${BASE_URL}/student/getAll`);
    if (!response.ok)
        throw new Error('Failed to fetch students');
    return response.json();
};

export const addStudent = async (student) => {
    const response = await fetch(`${BASE_URL}/student/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
    });
    if (!response.ok)
        throw new Error('Failed to add student');
    return response.json();
};