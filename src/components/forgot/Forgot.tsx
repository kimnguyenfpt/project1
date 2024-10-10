import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/Forgot.css'; 
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const Forgot: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // Send password reset email with a custom redirect URL
            await sendPasswordResetEmail(auth, email, {
                url: 'http://localhost:3000/reset', // Custom reset link
                handleCodeInApp: true,
            });
            setMessage('Email đặt lại mật khẩu đã được gửi!');
        } catch (error) {
            setError('Không tìm thấy email, vui lòng thử lại.');
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-form">
                <div className="logo">
                    <img src="/img/Alta.png" alt="AltaMedia Logo" />
                </div>
                <form id="resetForm" onSubmit={handleSubmit}>
                    <p>Đặt lại mật khẩu</p>
                    <label htmlFor="email">Vui lòng nhập email để đặt lại mật khẩu của bạn *</label>
                    <input 
                        className='forgot-password-input'
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    {error && <p className="error-message">{error}</p>}
                    {message && <p className="success-message">{message}</p>}
                    
                    <div className="buttons">
                        <button type="button" className="cancel-button" onClick={() => navigate('/')}>Hủy</button>
                        <button type="submit" className="continue-button">Tiếp tục</button>
                    </div>
                </form>
            </div>
            <div className="reset-image">
                <img src="https://firebasestorage.googleapis.com/v0/b/quanlyxephang-67525.appspot.com/o/reset.png?alt=media&token=9bfec82c-7991-4f8b-b552-cf69dbbb79f4" alt="Reset Password" />
            </div>
        </div>
    );
};

export default Forgot;
