import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/FirebaseConfig';

interface User {
  id: string;
  username: string;
  fullname: string;
  phone: string;
  email: string;
  role: string;
  status: string;
  password: string;
  confirmPassword: string;
}

// Async action to fetch users from Firestore
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  const users: User[] = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() } as User);
  });
  return users;
});

// Async action to add a new user to Firestore
export const addUser = createAsyncThunk('users/addUser', async (userData: Omit<User, 'id'>) => {
  const docRef = await addDoc(collection(db, 'users'), userData);
  return { id: docRef.id, ...userData }; // Return the new user with its Firestore ID
});

// Async action to update an existing user in Firestore
export const updateUser = createAsyncThunk('users/updateUser', async (userData: User) => {
  const userDocRef = doc(db, 'users', userData.id); // Reference to the user's document in Firestore
  await updateDoc(userDocRef, {
    fullname: userData.fullname,
    username: userData.username,
    phone: userData.phone,
    email: userData.email,
    password: userData.password,
    confirmPassword: userData.confirmPassword,
    role: userData.role,
    status: userData.status,
  });
  return userData; // Return the updated user data
});

interface UserState {
  list: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  list: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      // Add new user
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // Add the new user to the list
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add user';
      })
      // Update existing user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload; // Update the user in the list
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user';
      });
  },
});

export default userSlice.reducer;
