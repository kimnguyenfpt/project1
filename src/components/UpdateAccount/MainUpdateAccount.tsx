import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUser } from "../../redux/userSlice"; // Import fetch and update actions
import { RootState, AppDispatch } from "../../redux/store";
import "../addAccount/AddAccount.css";
import eyeOffIcon from "../../assets/img/open.png";

const MainUpdateAccount: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>(); // Get the account ID from the URL
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users.list);
  const user = users.find((u) => u.id === accountId);

  // State for form fields, initially empty
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    phoneNumber: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    status: "", 
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  useEffect(() => {
    // Fetch users if they are not already in the store
    if (!user) {
      dispatch(fetchUsers());
    } else {
      // Populate the form with the user's current data from Firestore
      setFormData({
        fullname: user.fullname,
        username: user.username,
        phoneNumber: user.phone,
        email: user.email,
        role: user.role,
        password: user.password, 
        confirmPassword: user.confirmPassword,
        status: user.status, 
      });
    }
  }, [dispatch, user]);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Form validation before submission
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullname) newErrors.fullname = "Họ tên là bắt buộc.";
    if (!formData.username) newErrors.username = "Tên đăng nhập là bắt buộc.";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Số điện thoại là bắt buộc.";
    if (!formData.email) newErrors.email = "Email là bắt buộc.";
    if (!formData.role) newErrors.role = "Vai trò là bắt buộc.";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp.";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Dispatch the updateUser action to update the user data
      dispatch(updateUser({
        id: accountId!,  // Use the account ID from params
        fullname: formData.fullname,
        username: formData.username,
        phone: formData.phoneNumber,
        email: formData.email,
        role: formData.role,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        status: formData.status, // Ensure we are using the user's status from Firebase
      }))
      .unwrap()
      .then(() => {
        alert("Cập nhật tài khoản thành công");
        navigate("/accounts"); // Navigate back to the accounts list after updating
      })
      .catch((error: unknown) => {
        console.error("Failed to update user: ", error);
      });
    }
  };

  const handleCancel = () => {
    navigate("/accounts");
  };

  return (
    <>
      <div className="add-account-container">
        <h2>Thông tin tài khoản</h2>
        <form id="updateAccountForm" className="add-account-form" onSubmit={handleSubmit}>
          <div className="add-account-form-row">
            <div className="add-account-form-group">
              <label htmlFor="fullname">Họ tên <span className="required">*</span></label>
              <input
                type="text"
                name="fullname"
                placeholder="Nhập họ tên"
                value={formData.fullname}
                onChange={handleChange}
              />
              {errors.fullname && <p className="error">{errors.fullname}</p>}
            </div>

            <div className="add-account-form-group">
              <label htmlFor="username">Tên đăng nhập <span className="required">*</span></label>
              <input
                type="text"
                name="username"
                placeholder="Nhập tên đăng nhập"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
          </div>

          <div className="add-account-form-row">
            <div className="add-account-form-group">
              <label htmlFor="phoneNumber">Số điện thoại <span className="required">*</span></label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Nhập số điện thoại"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
            </div>

            <div className="add-account-form-group password-group">
              <label htmlFor="password">Mật khẩu <span className="required">*</span></label>
              <input
                type="text" // Hiện mật khẩu
                name="password"
                placeholder=""
                value={formData.password}
                onChange={handleChange}
              />
              <img
                src={eyeOffIcon} // Chỉ hiển thị eyeIcon
                alt="Toggle Password Visibility"
                className="toggle-password"
                onClick={togglePasswordVisibility} // Vẫn giữ chức năng toggle
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
          </div>

          <div className="add-account-form-row">
            <div className="add-account-form-group">
              <label htmlFor="email">Email <span className="required">*</span></label>
              <input
                type="email"
                name="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="add-account-form-group password-group">
              <label htmlFor="confirmPassword">Nhập lại mật khẩu <span className="required">*</span></label>
              <input
                type="text" // Hiện mật khẩu xác nhận
                name="confirmPassword"
                placeholder=""
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <img
                src={eyeOffIcon} // Chỉ hiển thị eyeIcon
                alt="Toggle Confirm Password Visibility"
                className="toggle-password"
                onClick={toggleConfirmPasswordVisibility} // Vẫn giữ chức năng toggle
              />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="add-account-form-row">
            <div className="add-account-form-group">
              <label htmlFor="role">Vai trò <span className="required">*</span></label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="">Chọn vai trò</option>
                <option value="Kế toán">Kế toán</option>
                <option value="Quản lý">Quản lý</option>
              </select>
              {errors.role && <p className="error">{errors.role}</p>}
            </div>

            <div className="add-account-form-group">
              <label htmlFor="status">Tình trạng <span className="required">*</span></label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Hoạt động">Hoạt động</option>
                <option value="Ngưng hoạt động">Ngưng hoạt động</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      {/* Buttons outside the form, linked with the form */}
      <div className="role-form-buttons">
        <button
          type="button"
          className="role-cancel-button"
          onClick={handleCancel}
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          className="role-submit-button"
          form="updateAccountForm"
        >
          Cập nhật
        </button>
      </div>
    </>
  );
};

export default MainUpdateAccount;
