import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../firebase/FirebaseConfig';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';

// Define the Service interface
interface Service {
  id: string;
  name: string;
  description: string;
  status: string; 
}

interface ServicesState {
  services: Service[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ServicesState = {
  services: [],
  loading: false,
  error: null,
};

// Async action to fetch services from Firebase
export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
  const querySnapshot = await getDocs(collection(db, 'services'));
  const services: Service[] = [];
  querySnapshot.forEach((doc) => {
    services.push({
      id: doc.id,
      ...doc.data(),
    } as Service);
  });
  return services;
});

// Async action to add a new service to Firebase
export const addService = createAsyncThunk(
  'services/addService',
  async (newService: Omit<Service, 'id'>) => {
    const serviceRef = await addDoc(collection(db, 'services'), newService);
    return { id: serviceRef.id, ...newService };
  }
);

// Async action to update service status in Firebase
export const updateServiceStatus = createAsyncThunk(
  'services/updateServiceStatus',
  async ({ id, status }: { id: string; status: string }) => {
    const serviceRef = doc(db, 'services', id);
    await updateDoc(serviceRef, { status });
    return { id, status };
  }
);

// Create the slice
const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch services';
      })

      // Add service
      .addCase(addService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addService.fulfilled, (state, action: PayloadAction<Service>) => {
        state.loading = false;
        state.services.push(action.payload);
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add service';
      })

      // Update service status
      .addCase(updateServiceStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateServiceStatus.fulfilled, (state, action: PayloadAction<{ id: string; status: string }>) => {
        state.loading = false;
        const index = state.services.findIndex(service => service.id === action.payload.id);
        if (index !== -1) {
          state.services[index].status = action.payload.status;
        }
      })
      .addCase(updateServiceStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update service';
      });
  },
});

export default servicesSlice.reducer;
