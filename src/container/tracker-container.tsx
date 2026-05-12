import StudentList from '@components/studentList';
import { fetchStudents } from '@redux/studentSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/appHooks';

const TrackerContainer = () => {
  const dispatch = useAppDispatch();
  const students = useAppSelector((state) => state.students.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <>
      <StudentList
        students={students}
        viewStudent={(id) => console.log(`View student with id: ${id}`)}
        addStudent={() => console.log('Add student')}
      />
    </>
  );
};

export default TrackerContainer;
