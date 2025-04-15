import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/UserProfile.css";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [editCredentials, setEditCredentials] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    current_password: "",
    password: "",
  });
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    rank: "",
    email: "",
    phone_number: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (!storedUser) {
      navigate("/");
      return;
    }

    async function fetchUser() {
      try {
        const res = await axios.get(
          `http://localhost:8000/users?user_id=${storedUser.id}`
        );
        setUser(res.data[0]);
        setFormData({ username: res.data[0].username, password: "" });
        setProfileData({
          first_name: res.data[0].first_name,
          last_name: res.data[0].last_name,
          rank: res.data[0].rank,
          email: res.data[0].email,
          phone_number: res.data[0].phone_number,
        });
      } catch (err) {
        console.error("Failed to fetch user", err);
        setError("Unable to fetch user data.");
      }
    }

    fetchUser();
  }, [navigate]);

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username: formData.username,
        current_password: formData.current_password,
        password: formData.password,
      };

      const res = await axios.patch(
        `http://localhost:8000/users/${user.id}/credentials`,
        payload
      );

      alert("Credentials updated");
      sessionStorage.setItem(
        "user",
        JSON.stringify({ ...user, username: formData.username })
      );
      setUser({ ...user, username: formData.username });
      setEditCredentials(false);
    } catch (err) {
      console.error("Failed to update credentials", err);
      setError(err.response?.data?.error || "Failed to update credentials");
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `http://localhost:8000/users/${user.id}/profile`,
        profileData
      );
      alert("Profile updated");
      const updatedRes = await axios.get(
        `http://localhost:8000/users?user_id=${user.id}`
      );
      const updatedUser = updatedRes.data[0];
      setUser(updatedUser);
      setProfileData({
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        rank: updatedUser.rank,
        email: updatedUser.email,
        phone_number: updatedUser.phone_number,
      });
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
      setEditProfile(false);
    } catch (err) {
      console.error("Failed to update profile", err);
      setError("Failed to update profile");
    }
  };

  if (!user) return <div>Loading...</div>;

  const roleName = (role) => {
    if (role === 2) {
      return "User";
    } else if (role === 3) {
      return "Manager";
    } else if (role === 4) {
      return "Admin";
    }
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>

      <div className="section">
        <h3>Profile Info</h3>
        {!editProfile ? (
          <div>
            <p>
              <strong>Name:</strong> {user.first_name} {user.last_name}
            </p>
            <p>
              <strong>Rank:</strong> {user.rank}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone_number}
            </p>
            <p>
              <strong>Role:</strong> {roleName(user.role)}
            </p>
            <button onClick={() => setEditProfile(true)}>Edit Profile</button>
          </div>
        ) : (
          <form onSubmit={handleProfileSubmit}>
            <input
              type="text"
              placeholder="First Name"
              value={profileData.first_name}
              onChange={(e) =>
                setProfileData({ ...profileData, first_name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={profileData.last_name}
              onChange={(e) =>
                setProfileData({ ...profileData, last_name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Rank"
              value={profileData.rank}
              onChange={(e) =>
                setProfileData({ ...profileData, rank: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={profileData.phone_number}
              onChange={(e) =>
                setProfileData({ ...profileData, phone_number: e.target.value })
              }
              required
            />
            <button type="submit">Save Profile</button>
            <button type="button" onClick={() => setEditProfile(false)}>
              Cancel
            </button>
          </form>
        )}
      </div>

      <div className="section">
        <h3>Credentials</h3>
        {!editCredentials ? (
          <div>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <button onClick={() => setEditCredentials(true)}>
              Change Credentials
            </button>
          </div>
        ) : (
          <form onSubmit={handleCredentialsSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Current Password"
              value={formData.current_password}
              onChange={(e) =>
                setFormData({ ...formData, current_password: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button type="submit">Save Credentials</button>
            <button type="button" onClick={() => setEditCredentials(false)}>
              Cancel
            </button>
          </form>
        )}
      </div>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default UserProfile;
