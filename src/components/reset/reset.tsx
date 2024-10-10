import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/Reset.css';
import { getAuth, confirmPasswordReset } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore'; // Import các hàm từ Firestore

const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore(); // Lấy Firestore instance

    // Lấy oobCode từ URL
    const oobCode = new URLSearchParams(window.location.search).get('oobCode');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
    
        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp!');
        } else if (oobCode) {
            try {
                // Xác nhận đặt lại mật khẩu trên Firebase Authentication
                await confirmPasswordReset(auth, oobCode, password);
    
                // Lấy thông tin người dùng hiện tại sau khi đặt lại mật khẩu
                const user = auth.currentUser;
                if (user) {
                    // Sử dụng UID của người dùng hiện tại để lấy document reference trong Firestore
                    const userRef = doc(db, 'users', user.uid);
                    
                    // Cập nhật mật khẩu mới vào Firestore
                    await updateDoc(userRef, {
                        password: password  
                    });

                    setMessage('Mật khẩu đã được đặt lại thành công và cập nhật trên Firestore!');
                    navigate('/login');
                } else {
                    setError('Không tìm thấy người dùng hiện tại.');
                }
            } catch (error) {
                setError('Có lỗi xảy ra trong quá trình đặt lại mật khẩu, vui lòng thử lại.');
                console.error('Error resetting password:', error);
            }
        } else {
            setError('Không tìm thấy mã xác thực.');
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-form">
                <div className="logo">
                    <img src="/img/Alta.png" alt="AltaMedia Logo" />
                </div>
                <h5>Đặt lại mật khẩu mới</h5>
                <form id="resetForm" onSubmit={handleSubmit}>
                    <label htmlFor="password">Mật khẩu </label>
                    <div className="input-content">
                        <input
                            className='reset-password-input'
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
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
                    <label htmlFor="confirmPassword">Nhập lại mật khẩu </label>
                    <div className="input-content">
                        <input
                            className='reset-password-input'
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            id="confirmPassword"
                            placeholder="●●●●●●●●"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <i
                            className={`fa-regular ${confirmPasswordVisible ? 'fa-eye' : 'fa-eye-slash'} eye-icon`}
                            onClick={toggleConfirmPasswordVisibility}
                        ></i>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {message && <p className="success-message">{message}</p>}
                    <button className='reset-password-submit' type="submit">Xác nhận</button>
                </form>
            </div>
            <div className="reset-password-image">
                <img src="https://firebasestorage.googleapis.com/v0/b/quanlyxephang-67525.appspot.com/o/reset.png?alt=media&token=9bfec82c-7991-4f8b-b552-cf69dbbb79f4" alt="Reset Password" />
            </div>
        </div>
    );
};

export default ResetPassword;
