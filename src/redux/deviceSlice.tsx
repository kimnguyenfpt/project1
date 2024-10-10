import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

interface Device {
  id: string;
  name: string;
  ip: string;
  status: string;
  connection: string;
  service: string;
}

interface DeviceState {
  devices: Device[];
  loading: boolean;
  error: string | null;
}

const initialState: DeviceState = {
  devices: [],
  loading: false,
  error: null,
};

// Thunk to fetch device data from Firestore
export const fetchDevices = createAsyncThunk("devices/fetchDevices", async () => {
  const querySnapshot = await getDocs(collection(db, "devices"));
  const devices: Device[] = [];
  querySnapshot.forEach((doc) => {
    devices.push({ id: doc.id, ...doc.data() } as Device);
  });
  return devices;
});

// Thunk to update device data in Firestore
export const updateDevice = createAsyncThunk(
  "devices/updateDevice",
  async (device: Device) => {
    const deviceRef = doc(db, "devices", device.id);
    await updateDoc(deviceRef, {
      name: device.name,
      ip: device.ip,
      status: device.status,
      connection: device.connection,
      service: device.service,
    });
    return device; // Return the updated device to the reducer
  }
);

const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = action.payload;
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching devices";
      })
      // Handle device update
      .addCase(updateDevice.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.devices.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.devices[index] = action.payload; // Update the device in the array
        }
      })
      .addCase(updateDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error updating device";
      });
  },
});

export default deviceSlice.reducer;
