import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice"; // Import the addUser action
import { AppDispatch } from "../../redux/store"; // Import AppDispatch
import "./AddAccount.css"; 
import eyeIcon from "../../assets/img/eye.png";

const MainAddAccount: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    fullname: "", // Use 'fullname' instead of 'fullName'
    username: "",
    phoneNumber: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    status: "Hoạt động",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState<boolean>(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false); 

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
    if (!formData.password) newErrors.password = "Mật khẩu là bắt buộc.";
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
      // Dispatch the addUser action to add a new user
      dispatch(addUser({
        fullname: formData.fullname,
        username: formData.username,
        phone: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role,
        status: formData.status,
      }))
      .unwrap()
      .then(() => {
        alert("Thêm tài khoản thành công");
        navigate("/accounts"); // Navigate to accounts list after adding
      })
      .catch((error: unknown) => {
        console.error("Failed to add user: ", error);
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
        <form id="addAccountForm" className="add-account-form" onSubmit={handleSubmit}>
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
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="●●●●●●●●"
                value={formData.password}
                onChange={handleChange}
              />
              <img
                src={eyeIcon}
                alt="Toggle Password Visibility"
                className="toggle-password"
                onClick={togglePasswordVisibility}
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
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="●●●●●●●●"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <img
                src={eyeIcon}
                alt="Toggle Confirm Password Visibility"
                className="toggle-password"
                onClick={toggleConfirmPasswordVisibility}
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
          form="addAccountForm"  
        >
          Thêm 
        </button>
      </div>
    </>
  );
};

export default MainAddAccount
