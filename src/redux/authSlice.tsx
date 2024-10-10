// src/redux/authSlice.tsx
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, User } from 'firebase/auth';  // Import kiểu User từ Firebase
import { auth, db } from '../firebase/FirebaseConfig';  // Import Firestore và auth từ FirebaseConfig
import { collection, query, where, getDocs } from 'firebase/firestore';  // Import từ Firestore

// Định nghĩa kiểu cho state
interface AuthState {
  user: User | null;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
};

// Thunk for login action using Firestore to get email by username
export const loginUser = createAsyncThunk<
  User,  // Kiểu trả về nếu fulfilled
  { username: string; password: string },  // Kiểu của payload khi gọi hàm
  { rejectValue: string }  // Kiểu trả về nếu bị rejected
>(
  'auth/loginUser',
  async ({ username, password }, thunkAPI) => {
    try {
      // Truy vấn Firestore để lấy email dựa trên username
      const q = query(collection(db, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Lấy tài liệu đầu tiên trong kết quả
        const userDoc = querySnapshot.docs[0];
        const userEmail = userDoc.data().email;

        // Đăng nhập với email và password
        const userCredential = await signInWithEmailAndPassword(auth, userEmail, password);
        return userCredential.user;  // Trả về đối tượng user từ Firebase
      } else {
        return thunkAPI.rejectWithValue('Username không tồn tại');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return thunkAPI.rejectWithValue(errorMessage);  // Trả về lỗi với rejectWithValue
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload ?? null;  // Đặt error là chuỗi hoặc null
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
