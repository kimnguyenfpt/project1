import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './ProfileInfo.css';

const ProfileInfo: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const navigate = useNavigate();
    const db = getFirestore();
    const auth = getAuth();

    useEffect(() => {
        const fetchProfileData = async (uid: string) => {
            try {
                // Truy xuất dữ liệu người dùng từ Firestore bằng UID
                const userDocRef = doc(db, 'users', uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setProfile(userDoc.data());
                    console.log("Thông tin hồ sơ:", userDoc.data());
                } else {
                    setError('Không tìm thấy thông tin người dùng.');
                    console.log('Không tìm thấy thông tin người dùng.');
                }
            } catch (error) {
                setError('Lỗi khi lấy dữ liệu hồ sơ.');
                console.error('Lỗi khi lấy dữ liệu hồ sơ:', error);
            } finally {
                setLoading(false);
            }
        };

        // Kiểm tra xem người dùng đã đăng nhập chưa
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Nếu người dùng đã đăng nhập, lấy UID và truy xuất thông tin người dùng
                console.log("UID người dùng hiện tại:", user.uid);
                fetchProfileData(user.uid);
            } else {
                // Nếu không có người dùng đăng nhập, chuyển hướng tới trang đăng nhập
                console.log('Không có người dùng đăng nhập.');
                navigate('/login');
            }
        });

        // Cleanup lắng nghe khi component unmount
        return () => unsubscribe();
    }, [auth, db, navigate]);

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!profile) {
        return <div>Không có thông tin hồ sơ.</div>;
    }

    return (
        <section className="profile-info">
            <div className="profile-card">
                <div className="profile-pic">
                    {/* Sử dụng ảnh từ trường 'img' trong Firestore, nếu không có thì dùng ảnh mặc định */}
                    <img 
                        src={profile.img ? profile.img : "https://firebasestorage.googleapis.com/v0/b/quanlyxephang-67525.appspot.com/o/default_avatar.png?alt=media&token=123456789"} 
                        alt="Profile" 
                        className="profile-pic-img" 
                    />
                    <button className="edit-photo-btn">
                        <img src="https://firebasestorage.googleapis.com/v0/b/quanlyxephang-67525.appspot.com/o/camera.png?alt=media&token=32b79eb3-4969-4064-a337-657caac624fa" alt="EditPhoto" />
                    </button>
                    <span className="name">{profile.fullname || 'Không có tên'}</span>
                </div>
                <div className="profile-details">
                    <div className="detail">
                        <label htmlFor="fullname">Tên đầy đủ</label>
                        <input type="text" id="fullname" value={profile.fullname || ''} disabled />
                    </div>
                    <div className="detail">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input type="text" id="username" value={profile.username || ''} disabled />
                    </div>
                    <div className="detail">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input type="text" id="phone" value={profile.phone || ''} disabled />
                    </div>
                    <div className="detail">
                        <label htmlFor="password">Mật khẩu</label>
                        <input type="text" id="password" value={profile.password || ''} disabled />
                    </div>
                    <div className="detail">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={profile.email || ''} disabled />
                    </div>
                    <div className="detail">
                        <label htmlFor="role">Vai trò</label>
                        <input type="text" id="role" value={profile.role || ''} disabled />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileInfo;
