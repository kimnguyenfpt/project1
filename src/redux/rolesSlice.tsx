import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, doc, updateDoc, addDoc } from "firebase/firestore"; // Thêm doc và updateDoc
import { db } from "../firebase/FirebaseConfig";

interface PermissionGroup {
  all: boolean;
  x: boolean;
  y: boolean;
  z: boolean;
}

interface Role {
  documentId: string;
  namerole: string;
  quantityusers: number;
  description: string;
  groupA: PermissionGroup;
  groupB: PermissionGroup;
}

interface RolesState {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

const initialState: RolesState = {
  roles: [],
  loading: false,
  error: null,
};

// Thunk để lấy dữ liệu từ Firestore
export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  const querySnapshot = await getDocs(collection(db, "roles"));
  const roles: Role[] = querySnapshot.docs.map((doc) => {
    const { documentId, ...data } = doc.data() as Role;
    return {
      documentId: doc.id,
      ...data,
    };
  });
  return roles;
});

// Thunk để cập nhật vai trò
export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ roleId, updatedData }: { roleId: string; updatedData: Partial<Role> }) => {
    const roleDocRef = doc(db, "roles", roleId);
    await updateDoc(roleDocRef, updatedData);
    return { roleId, updatedData }; // Trả về roleId và dữ liệu đã cập nhật
  }
);
// Thunk để tạo vai trò mới
export const createRole = createAsyncThunk(
  "roles/createRole",
  async (newRole: Omit<Role, 'documentId'>) => {
    const docRef = await addDoc(collection(db, "roles"), newRole);
    return { documentId: docRef.id, ...newRole };
  }
);


const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action: PayloadAction<Role[]>) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Lỗi khi tải vai trò";
      })
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action: PayloadAction<{ roleId: string; updatedData: Partial<Role> }>) => {
        state.loading = false;
        // Cập nhật vai trò trong state
        const { roleId, updatedData } = action.payload;
        const index = state.roles.findIndex(role => role.documentId === roleId);
        if (index !== -1) {
          state.roles[index] = { ...state.roles[index], ...updatedData };
        }
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Lỗi khi cập nhật vai trò";
      });
  },
});

export default rolesSlice.reducer;
