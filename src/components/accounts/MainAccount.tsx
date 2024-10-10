import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchUsers } from "../../redux/userSlice";
import "./MainAccount.css";

// Define User type to match the data structure
interface User {
  id: string;
  username: string;
  fullname: string;
  phone: string;
  email: string;
  role: string;
  status: string;
}

const UserManagement: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { list: users, loading, error } = useSelector((state: RootState) => state.users);
  
  const [roleFilter, setRoleFilter] = useState<string>("Tất cả");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter === "Tất cả" || user.role === roleFilter;

    const matchesSearch =
      (user.fullname && user.fullname.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.phone && user.phone.includes(searchTerm)) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()));
  
    return matchesRole && matchesSearch;
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const handleAddAccountClick = () => {
    navigate('/add-account'); 
  };

  return (
    <>
      <h2>Danh sách tài khoản</h2>
      <div className="roles-buttons-section">
            <button className="accounts-add" onClick={handleAddAccountClick}>
              <img src="/img/btn-add.png" alt="" className="accounts-add-icon" />
              Thêm tài khoản
            </button>
          </div>
      <div className="accounts-container">
        <div className="accounts-filters">
          <div className="accounts-filter-group">
            <label htmlFor="roleFilter">Tên vai trò</label>
            <select id="roleFilter" value={roleFilter} onChange={handleRoleChange}>
              <option value="Tất cả">Tất cả</option>
              <option value="Kế toán">Kế toán</option>
            </select>
          </div>
          <div className="accounts-filter-group">
            <label htmlFor="searchTerm">Từ khóa</label>
            <input
              id="searchTerm"
              className="accounts-search-input"
              type="text"
              placeholder="Nhập từ khóa"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>Tên đăng nhập</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái hoạt động</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user: User) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.fullname}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                <span
                  className={
                    typeof user.status === "string" &&
                    user.status.trim().localeCompare("Hoạt động") === 0
                      ? "status actives"
                      : "status inactive"
                  }
                >
                  {user.status}
                </span>
              </td>
                <td>
                  <Link to={`/accounts/${user.id}`}>Cập nhật</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="accounts-pagination">
        <span className="accounts-pagination-arrow">
          <img src="/img/arrow.png" alt="Previous" className="accounts-arrow-icon" />
        </span>
        <span className="accounts-pagination-page active">1</span>
        <span className="accounts-pagination-page">2</span>
        <span className="accounts-pagination-page">3</span>
        <span className="accounts-pagination-dots">4</span>
        <span className="accounts-pagination-dots">5</span>
        <span className="accounts-pagination-dots">..</span>
        <span className="accounts-pagination-page">10</span>
        <span className="accounts-pagination-arrow">
          <img src="/img/right.png" alt="Next" className="accounts-arrow-icon" />
        </span>
      </div>
    </>
  );
};

export default UserManagement;
