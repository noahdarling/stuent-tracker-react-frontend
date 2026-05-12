import {
  addStudent as addStudentApi,
  fetchStudentById as fetchStudentByIdApi,
  fetchStudents as fetchStudentsApi,
  updateStudent as updateStudentApi,
} from '@api/studentApi';
import type { Student } from '@interfaces/student';
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from './store';

interface StudentState {
  students: Student[];
  loading: ApiRequestState;
  error: ApiError;
}

// thunks
export const fetchStudents = createAsyncThunk<
  Student[],
  void,
  { rejectValue: string }
>(
  'students/fetchStudents',
  async () => {
    const response = await fetchStudentsApi();
    return response;
  },
  {
    condition(_arg, thunkApi) {
      const postsStatus = selectStudentsLoading(
        thunkApi.getState() as RootState,
      );
      if (postsStatus !== 'idle') {
        return false;
      }
    },
  },
);

export const fetchStudentById = createAsyncThunk<
  Student,
  string,
  { rejectValue: string }
>('students/fetchStudentById', async (id) => {
  return await fetchStudentByIdApi(id);
});

export const addStudent = createAsyncThunk<
  Student,
  Omit<Student, 'id'>,
  { rejectValue: string }
>('students/addStudent', async (student) => {
  return await addStudentApi(student);
});

export const updateStudent = createAsyncThunk<
  Student,
  Student,
  { rejectValue: string }
>('students/updateStudent', async (student) => {
  return await updateStudentApi(student);
});

const initialState: StudentState = {
  students: [],
  loading: 'idle',
  error: null,
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents(state, action: PayloadAction<Student[]>) {
      state.students = action.payload;
    },
    newStudent(state, action: PayloadAction<Student>) {
      state.students.push(action.payload);
    },
    editStudent(state, action: PayloadAction<Student>) {
      const index = state.students.findIndex(
        (student) => student.id === action.payload.id,
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = `Failed to fetch students: ${action.payload}`;
      })
      .addCase(
        fetchStudents.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.loading = 'succeeded';
          state.students = action.payload;
        },
      );
    // todo add case to clear list when user logs out or something like that
  },
});

export const { setStudents, newStudent, editStudent } = studentsSlice.actions;

export default studentsSlice.reducer;

// selectors
export const selectStudents = (state: RootState) => state.students;
export const selectStudentById = (state: RootState, id: string) =>
  state.students.students.find((student) => student.id === id);
export const selectStudentsLoading = (state: RootState) =>
  state.students.loading;
export const selectStudentsError = (state: RootState) => state.students.error;
