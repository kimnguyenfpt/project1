import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const UploadProfilePicture: React.FC<{ userId: string }> = ({ userId }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const storage = getStorage();
    const db = getFirestore();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Vui lòng chọn một ảnh.");
            return;
        }
        setUploading(true);
        setError(null);

        try {
            // Tạo tham chiếu đến Firebase Storage
            const storageRef = ref(storage, `profilePictures/${userId}`);
            
            // Upload ảnh lên Firebase Storage
            await uploadBytes(storageRef, file);

            // Lấy URL của ảnh đã tải lên
            const photoURL = await getDownloadURL(storageRef);

            // Lưu URL của ảnh vào Firestore
            const userDocRef = doc(db, 'users', userId);
            await updateDoc(userDocRef, {
                photoURL: photoURL,
            });

            alert('Ảnh đã được tải lên thành công!');
        } catch (error) {
            console.error("Lỗi khi tải ảnh:", error);
            setError('Có lỗi xảy ra trong quá trình tải ảnh.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Đang tải lên...' : 'Tải ảnh lên'}
            </button>
        </div>
    );
};

export default UploadProfilePicture;
