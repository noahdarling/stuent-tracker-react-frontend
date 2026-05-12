import API_BASE_URL from '@config/apiConfig';
import type { Student } from '@interfaces/student';
import axios from 'axios';

const STUDENT_API_URL = `${API_BASE_URL}/students`;

export const fetchStudents = async (): Promise<Student[]> => {
  try {
    const response = await axios.get(STUDENT_API_URL);
    const newStudents = response.data.map((student) => ({
      ...student,
      id: student._id, // Map _id to id
    }));
    return newStudents;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const fetchStudentById = async (id: string): Promise<Student> => {
  try {
    const response = await axios.get(`${STUDENT_API_URL}/${id}`);
    return response.data as Student;
  } catch (error) {
    console.error(`Error fetching student by ID ${id}:`, error);
    throw error;
  }
};

export const addStudent = async (
  student: Omit<Student, 'id'>,
): Promise<Student> => {
  try {
    const response = await axios.put(STUDENT_API_URL, student);
    const newStudent = { ...(response.data as Student), id: response.data._id };
    return newStudent;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

export const updateStudent = async (student: Student): Promise<Student> => {
  try {
    const response = await axios.patch(
      `${STUDENT_API_URL}/${student.id}`,
      student,
    );
    return response.data as Student;
  } catch (error) {
    console.error(`Error updating student with ID ${student.id}:`, error);
    throw error;
  }
};
