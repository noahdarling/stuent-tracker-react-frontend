interface AddStudentItemProps {
  addStudent: () => void;
}

const AddStudentItem: React.FC<AddStudentItemProps> = ({ addStudent }) => {
  return (
    <li onClick={addStudent} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
      + Add Student
    </li>
  );
};

export default AddStudentItem;
