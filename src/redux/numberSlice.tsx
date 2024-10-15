// redux/numberSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig"; // Import Firebase instance

export interface NumberType {
  id: string;
  customerName: string;
  service: string;
  issueTime: string;
  expiryTime: string;
  status: string;
  source: string;
}

// Thunk để lấy dữ liệu từ Firestore
export const fetchNumbers = createAsyncThunk(
  "numbers/fetchNumbers",
  async () => {
    const snapshot = await getDocs(collection(db, "numbers"));
    const numbers: NumberType[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as NumberType;

      // Xóa id nếu nó tồn tại trong dữ liệu Firestore
      const { id, ...rest } = data;

      numbers.push({ id: doc.id, ...rest });
    });
    return numbers;
  }
);

export const addNumber = createAsyncThunk(
  "numbers/addNumber",
  async (newNumber: NumberType) => {
    // Logic để thêm số mới vào Firestore
    const docRef = await addDoc(collection(db, "numbers"), newNumber);

    // Thêm ID document và trạng thái đang chờ
    return {
      ...newNumber,
      id: docRef.id,
      status: "Đang chờ",
      source: "Hệ thống",
      issueTime: new Date().toLocaleString(), // Thời gian cấp hiện tại
      expiryTime: new Date(
        new Date().getTime() + 2 * 60 * 60 * 1000
      ).toLocaleString(), // Hạn sử dụng 2 giờ sau
    };
  }
);

interface NumberState {
  data: NumberType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NumberState = {
  data: [],
  status: "idle",
  error: null,
};

const numberSlice = createSlice({
  name: "numbers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNumbers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNumbers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchNumbers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch numbers";
      });
  },
});

export default numberSlice.reducer;
