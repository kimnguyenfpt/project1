import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';  // Firebase Auth
import { auth, db } from '../../firebase/FirebaseConfig';  // Import Firebase config
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";  // Firestore query
import '../../assets/css/Login.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);  // Trạng thái loading

    // Hiển thị hoặc ẩn mật khẩu
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Xử lý đăng nhập
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);  // Bắt đầu trạng thái loading
        try {
            // Truy vấn Firestore để tìm email tương ứng với username
            const q = query(collection(db, "users"), where("username", "==", username));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Lấy tài liệu đầu tiên tìm được
                const userDoc: DocumentData = querySnapshot.docs[0].data();  // Lấy dữ liệu người dùng
                const userEmail = userDoc.email as string;  // Lấy email từ Firestore

                // Đăng nhập với email và password
                await signInWithEmailAndPassword(auth, userEmail, password);
                setErrorMessage('Đăng nhập thành công!');
                setIsError(false);
                navigate('/');  
            } else {
                setErrorMessage('Tên đăng nhập không tồn tại');
                setIsError(true);
            }
        } catch (error: any) {
            setErrorMessage('Sai mật khẩu hoặc tên đăng nhập');
            setIsError(true);
        } finally {
            setLoading(false);  // Tắt trạng thái loading sau khi xử lý
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="logo">
                    <img src="/img/Alta.png" alt="AltaMedia Logo" />
                </div>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <label htmlFor="username">Tên đăng nhập *</label>
                    <div className={`input-container`}>
                        <input
                            type="text"
                            id="username"
                            className={isError ? 'error' : ''}  // Thêm class "error" nếu có lỗi
                            placeholder="Nhập tên đăng nhập"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <label htmlFor="password">Mật khẩu *</label>
                    <div className={`input-container`}>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            className={isError ? 'error' : ''}  // Thêm class "error" nếu có lỗi
                            placeholder="●●●●●●●●"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <i
                            className={`fa-regular ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'} eye-icon`}
                            onClick={togglePasswordVisibility}
                        ></i>
                    </div>
                    {errorMessage && (
                        <p className="error-message">
                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                            {errorMessage}
                        </p>
                    )}
                    <button type="submit" disabled={loading}>Đăng nhập</button>  {/* Disable khi đang loading */}
                    {!errorMessage && (
                        <Link to="/forgot" className="forgot-password">Quên mật khẩu?</Link>
                    )}
                </form>
                {errorMessage && (
                    <Link to="/forgot" className="forgot-password error-forgot-password">Quên mật khẩu?</Link>
                )}
            </div>
            <div className="login-image">
                <img src="https://firebasestorage.googleapis.com/v0/b/quanlyxephang-67525.appspot.com/o/heh.png?alt=media&token=1fd0735f-f40f-4339-9464-2f0448d06b3a" alt="Queue Management System" />
                <div className="image-text">
                    <h2 className="system-text">Hệ thống</h2>
                    <h2 className="management-text">QUẢN LÝ XẾP HÀNG</h2>
                </div>
            </div>
        </div>
    );
};

export default Login;
