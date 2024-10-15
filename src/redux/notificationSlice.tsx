import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";  // Ensure FirebaseConfig is set up

// Define the Notification type with only name and time
interface Notification {
  id: string;
  name: string;
  time: string;
}

// Define the initial state of the notification slice
interface NotificationState {
  list: Notification[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: NotificationState = {
  list: [],
  loading: false,
  error: null,
};

// Thunk action to fetch notifications from Firebase (only name and time)
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, "logs"));  // Adjust collection name if needed
      const notifications: Notification[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        notifications.push({ id: doc.id, name: data.username, time: data.time });
      });
      return notifications;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch notifications");
    }
  }
);

// Create the slice
const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the reducer to add to the store
export default notificationSlice.reducer;
