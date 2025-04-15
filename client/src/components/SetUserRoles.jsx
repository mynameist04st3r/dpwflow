import { useEffect, useState } from "react";

function SetUserRoles({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleChanges, setRoleChanges] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleRoleChange = (userId, role) => {
    setRoleChanges((prev) => ({ ...prev, [userId]: role }));
  };

  const handleUpdateRole = async (userId) => {
    const newRole = roleChanges[userId];
    if (!newRole) return;
  
    const res = await fetch(`http://localhost:8000/users/${userId}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: parseInt(newRole) }),
    });
  
    const data = await res.json();
    alert(data.message || "Role updated.");
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: parseInt(newRole) } : user
      )
    );
    setRoleChanges((prev) => ({ ...prev, [userId]: "" }));
  };
  

  const filteredByRole =
    currentUser.role === 4
      ? users
      : users.filter((u) => u.role === 2); 

  const filterableUsers = filteredByRole.filter((u) => {
    const fullName = `${u.first_name} ${u.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="set-user-roles-form">
      <h3>Set User Role</h3>

      <input
        type="text"
        placeholder="Search user by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "100%" }}
      />

{searchQuery && filterableUsers.length > 0 ? (
  filterableUsers.map((user) => (
    <div key={user.id} style={{ marginBottom: "16px", borderBottom: "1px solid #555", paddingBottom: "10px" }}>
      <strong>
        {user.first_name} {user.last_name}
      </strong>{" "}
      (Current role: {user.role})

      <div style={{ marginTop: "8px" }}>
        <select
          value={roleChanges[user.id] || ""}
          onChange={(e) => handleRoleChange(user.id, e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="">Select Role</option>
          {currentUser.role === 4 && (
            <>
              <option value="2">User</option>
              <option value="3">Manager</option>
              <option value="4">Admin</option>
            </>
          )}
          {currentUser.role === 3 && (
            <option value="3">Manager</option>
          )}
        </select>

        <button onClick={() => handleUpdateRole(user.id)}>
          Update Role
        </button>
      </div>
    </div>
  ))
) : searchQuery && filterableUsers.length === 0 ? (
  <p>No matching users found.</p>
) : null}
    </div>
  );
}

export default SetUserRoles;
