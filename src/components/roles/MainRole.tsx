import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchRoles } from "../../redux/rolesSlice";
import { Link, useNavigate } from "react-router-dom";
import "./MainRole.css";

const MainRole: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { roles, loading, error } = useSelector(
    (state: RootState) => state.roles
  );

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);


  const handleAddRoleClick = () => {
    navigate('/roles/add'); // Navigates to the AddRole form
  };

  return (
    <div className="roles">
                <div className="roles-buttons-section">
            <button className="roles-add" onClick={handleAddRoleClick}>
              <img src="/img/btn-add.png" alt="" className="roles-add-icon" />
              Thêm vai trò
            </button>
          </div>
      <h2>Danh sách vai trò</h2>

      <div className="roles-header">
        <label className="roles-label">Từ khoá</label>
        <div className="roles-search">
          <input type="text" placeholder="Nhập từ khóa" />
          <img src="/img/search.png" alt="Search" />
        </div>
      </div>

      {loading && <p>Đang tải...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="roles-table-container">
          <div className="roles-table">
            <table>
              <thead>
                <tr>
                  <th>Tên vai trò</th>
                  <th>Số người dùng</th>
                  <th>Mô tả</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role, index) => (
                  <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                    <td>{role.namerole}</td>
                    <td>{role.quantityusers}</td>
                    <td>{role.description}</td>
                    <td>
                      <Link to={`/roles/${role.documentId}`}>Cập nhật</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainRole;
