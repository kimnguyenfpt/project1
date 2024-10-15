import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import "../updateRole/MainUpdateRole.css";

interface PermissionGroup {
  all: boolean;
  x: boolean;
  y: boolean;
  z: boolean;
}

const MainAddRole: React.FC = () => {
  const [roleName, setRoleName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [groupA, setGroupA] = useState<PermissionGroup>({
    all: false,
    x: false,
    y: false,
    z: false,
  });
  const [groupB, setGroupB] = useState<PermissionGroup>({
    all: false,
    x: false,
    y: false,
    z: false,
  });
  const [quantityusers, setQuantityUsers] = useState<number>(1);
  const navigate = useNavigate();

  const handleGroupAChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setGroupA((prevGroup) => ({
      ...prevGroup,
      [name]: checked,
    }));
  };

  const handleGroupBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setGroupB((prevGroup) => ({
      ...prevGroup,
      [name]: checked,
    }));
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "roles"), {
        namerole: roleName,
        description: description,
        permissions: {
          groupA: groupA,
          groupB: groupB,
        },
        quantityusers: 1, 
      });
      alert("Vai trò mới đã được thêm thành công!");
      navigate("/roles");
    } catch (error) {
      console.error("Lỗi khi thêm vai trò:", error);
      alert("Không thể thêm vai trò, vui lòng thử lại.");
    }
  };

  const handleCancel = () => {
    navigate("/roles");
  };

  return (
    <>
      <h2 className="role-title">Thêm vai trò mới</h2>
      <form className="role-form">
        <h2>Thông tin vai trò</h2>
        <div className="role-form-row">
          <div className="role-info">
            <label>
              Tên vai trò <span className="required">*</span>
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                required
                placeholder="Nhập tên vai trò"
              />
            </label>
            <label>
              Mô tả:
              <textarea
                className="description-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập mô tả"
              />
            </label>
            <p className="required-info">
              <span className="required">*</span> Là trường thông tin bắt buộc
            </p>
          </div>

          <div className="permissions-container">
            <label>
              Phân quyền chức năng <span className="required">*</span>
            </label>
            <div className="permissions">
              <div className="feature-group">
                <h4>Nhóm chức năng A</h4>
                <label>
                  <input
                    type="checkbox"
                    name="all"
                    checked={groupA.all}
                    onChange={handleGroupAChange}
                  />
                  Tát cả
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="x"
                    checked={groupA.x}
                    onChange={handleGroupAChange}
                  />
                  Chức năng X
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="y"
                    checked={groupA.y}
                    onChange={handleGroupAChange}
                  />
                  Chức năng Y
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="z"
                    checked={groupA.z}
                    onChange={handleGroupAChange}
                  />
                  Chức năng Z
                </label>
              </div>

              <div className="feature-group">
                <h4>Nhóm chức năng B</h4>
                <label>
                  <input
                    type="checkbox"
                    name="all"
                    checked={groupB.all}
                    onChange={handleGroupBChange}
                  />
                  Tát cả
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="x"
                    checked={groupB.x}
                    onChange={handleGroupBChange}
                  />
                  Chức năng X
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="y"
                    checked={groupB.y}
                    onChange={handleGroupBChange}
                  />
                  Chức năng Y
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="z"
                    checked={groupB.z}
                    onChange={handleGroupBChange}
                  />
                  Chức năng Z
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Buttons outside the form */}
      <div className="role-form-buttons">
        <button
          type="button"
          className="role-cancel-button"
          onClick={handleCancel}
        >
          Hủy bỏ
        </button>
        <button type="button" className="role-submit-button" onClick={handleSubmit}>
          Thêm 
        </button>
      </div>
    </>
  );
};

export default MainAddRole;
