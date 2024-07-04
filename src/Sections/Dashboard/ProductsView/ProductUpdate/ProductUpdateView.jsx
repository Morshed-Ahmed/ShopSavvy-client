// import React, { useEffect, useState } from "react";

// const ProductUpdateView = () => {
//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/profile/", {
//           method: "GET",
//           headers: {
//             Authorization: `Token ${token}`, // Replace with your actual token
//             "Content-Type": "application/json",
//           },
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch profile data");
//         }
//         const data = await response.json();
//         setProfile(data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   const handleLogout = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/logout/", {
//         method: "POST",
//         headers: {
//           Authorization: `Token ${token}`, // Replace with your actual token
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({}), // Empty body since POST request may need a body
//       });

//       if (!response.ok) {
//         throw new Error("Logout failed");
//       }

//       // Clear token from localStorage (or sessionStorage) after successful logout
//       localStorage.removeItem("user_id"); // Change to sessionStorage if that's where your token is stored
//       localStorage.removeItem("username"); // Change to sessionStorage if that's where your token is stored
//       localStorage.removeItem("role"); // Change to sessionStorage if that's where your token is stored
//       localStorage.removeItem("token"); // Change to sessionStorage if that's where your token is stored

//       // Optionally redirect to login page or do any other cleanup
//       // window.location.replace("/login"); // Redirect to login page after logout
//     } catch (error) {
//       console.error("Logout error:", error);
//       // Handle logout error, if any
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleLogout}>Logout</button>
//       <h2>User Profile</h2>
//       <p>
//         <strong>Username:</strong> {profile.username}
//       </p>
//       <p>
//         <strong>Email:</strong> {profile.email}
//       </p>
//       <p>
//         <strong>Role:</strong> {profile.role}
//       </p>{" "}
//       {/* Assuming 'role' is returned by the API */}
//     </div>
//   );
// };

// export default ProductUpdateView;

const ProductUpdateView = () => {
  return <div>ProductUpdateView ProductUpdateView</div>;
};

export default ProductUpdateView;
