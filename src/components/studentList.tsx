import type { Student } from '@interfaces/student';
import AddStudentItem from './addStudentItem';
import StudentItem from './studentItem';

interface StudentListProps {
  students: Student[];
  viewStudent: (id: string) => void;
  addStudent: () => void;
}

const StudentList: React.FC<StudentListProps> = ({
  students,
  viewStudent,
  addStudent,
}) => {
  return (
    <ul>
      <AddStudentItem key="add" addStudent={addStudent} />
      {students.map((student) => (
        <StudentItem
          key={student.id}
          student={student}
          viewStudent={viewStudent}
        />
      ))}
    </ul>
  );
};

export default StudentList;
