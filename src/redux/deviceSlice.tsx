import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, doc, updateDoc, addDoc } from "firebase/firestore";
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

export const fetchDevices = createAsyncThunk("devices/fetchDevices", async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "devices"));
    const devices: Device[] = [];
    querySnapshot.forEach((doc) => {
      devices.push({ id: doc.id, ...doc.data() } as Device);
    });
    return devices;
  } catch (error) {
    console.error("Error fetching devices: ", error);
    throw error; // Throw error để Redux biết và xử lý trạng thái rejected
  }
});

export const updateDevice = createAsyncThunk(
  "devices/updateDevice",
  async (device: Device) => {
    try {
      const deviceRef = doc(db, "devices", device.id);
      await updateDoc(deviceRef, {
        name: device.name,
        ip: device.ip,
        status: device.status,
        connection: device.connection,
        service: device.service,
      });
      console.log("Device updated successfully", device);
      return device; // Return the updated device to the reducer
    } catch (error) {
      console.error("Error updating device: ", error);
      throw error; // Throw error để Redux xử lý trạng thái rejected
    }
  }
);

// Thunk to add a new device to Firestore
export const addDevice = createAsyncThunk(
  "devices/addDevice",
  async (device: Device) => {
    try {
      // Thêm một tài liệu thiết bị mới vào Firestore
      const deviceRef = await addDoc(collection(db, "devices"), {
        name: device.name,
        ip: device.ip,
        status: device.status,
        connection: device.connection,
        service: device.service,
      });
      console.log("Device added with ID: ", deviceRef.id);
      return { ...device, id: deviceRef.id }; 
    } catch (error) {
      console.error("Error adding device: ", error);
      throw error;
    }
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
      })
      // Handle adding new device
      .addCase(addDevice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDevice.fulfilled, (state, action) => {
        state.loading = false;
        state.devices.push(action.payload); // Thêm thiết bị mới vào mảng
      })
      .addCase(addDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error adding device";
      });
  },
});

export default deviceSlice.reducer;
