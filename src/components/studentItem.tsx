import type { Student } from '@interfaces/student';

interface StudentItemProps {
  student: Student;
  viewStudent: (id: string) => void;
}

const StudentItem: React.FC<StudentItemProps> = ({ student, viewStudent }) => {
  console.log('Rendering StudentItem for:', student);

  return (
    <li
      key={student.id}
      onClick={() => viewStudent(student.id)}
      style={{ cursor: 'pointer' }}
    >
      {student.name}
    </li>
  );
};

export default StudentItem;
