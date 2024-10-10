import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
// Define the Log type to match your log data structure
interface Log {
  id: string;
  username: string;
  time: string;
  ip: string;
  action: string;
}

// Define the initial state of the log slice
interface LogState {
  list: Log[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: LogState = {
  list: [],
  loading: false,
  error: null,
};

// Thunk action to fetch logs from the API
export const fetchLogs = createAsyncThunk("logs/fetchLogs", async (_, thunkAPI) => {
  try {
    // You will need to update this URL to your actual API endpoint
    const querySnapshot = await getDocs(collection(db, "logs"));
    const logs: Log[] = [];
    querySnapshot.forEach((doc) => {
      logs.push({ id: doc.id, ...doc.data() } as Log);
    });
    return logs;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch logs");
  }
});

// Create the slice
const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the reducer to add to the store
export default logSlice.reducer;
