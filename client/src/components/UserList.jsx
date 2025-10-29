import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser, updateUser } from '../slices/authSlice'; // Use the updated authSlice
import { FaEdit, FaTrash, FaTimes, FaCheck } from 'react-icons/fa'; // Assuming you have font awesome or similar icons installed

const UserList = () => {
  const dispatch = useDispatch();
  const { usersList, usersLoading, usersError, usersSuccess } = useSelector((state) => state.auth);
  
  // State to track which user is being edited
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingIsAdmin, setEditingIsAdmin] = useState(false);

  // Fetch users on component load or after a successful operation
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, usersSuccess]); // Re-fetch list if an operation succeeds

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  const startEditHandler = (user) => {
    setEditingUserId(user._id);
    setEditingIsAdmin(user.isAdmin);
  };

  const saveEditHandler = (id) => {
    // Dispatch the update operation
    dispatch(updateUser({ userId: id, userData: { isAdmin: editingIsAdmin } }));
    setEditingUserId(null); // Exit editing mode
  };

  const cancelEditHandler = () => {
    setEditingUserId(null);
  };

  if (usersLoading) return <p>Loading users...</p>;
  if (usersError) return <p style={{ color: 'red' }}>Error fetching users: {usersError}</p>;

  // Basic styling for the table
  const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '15px' };
  const thStyle = { border: '1px solid #ccc', padding: '10px', backgroundColor: '#f4f4f4', textAlign: 'left' };
  const tdStyle = { border: '1px solid #ccc', padding: '10px', verticalAlign: 'middle' };
  const buttonStyle = (color) => ({ padding: '5px', margin: '2px', background: color, color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px' });

  return (
    <div>
      <h3>Registered Users</h3>
      {usersSuccess && <p style={{ color: 'green' }}>Operation successful!</p>}
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Username</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Admin</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user) => (
            <tr key={user._id}>
              <td style={tdStyle}>{user._id.substring(18)}...</td>
              <td style={tdStyle}>{user.username}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>
                {editingUserId === user._id ? (
                  <input
                    type='checkbox'
                    checked={editingIsAdmin}
                    onChange={(e) => setEditingIsAdmin(e.target.checked)}
                  />
                ) : (
                  user.isAdmin ? <FaCheck style={{ color: 'green' }} /> : <FaTimes style={{ color: 'red' }} />
                )}
              </td>
              <td style={tdStyle}>
                {editingUserId === user._id ? (
                  <>
                    <button 
                      onClick={() => saveEditHandler(user._id)} 
                      style={buttonStyle('darkgreen')}
                    >
                      Save
                    </button>
                    <button 
                      onClick={cancelEditHandler} 
                      style={buttonStyle('gray')}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => startEditHandler(user)} 
                      style={buttonStyle('blue')}
                    >
                      <FaEdit />
                    </button>
                    {/* Prevent deletion of your own account */}
                    <button 
                      onClick={() => deleteHandler(user._id)} 
                      style={buttonStyle('red')}
                      disabled={user.isAdmin} 
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;