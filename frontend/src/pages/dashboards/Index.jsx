import { useUser, useAuth } from "@clerk/react";
import { useEffect, useState } from "react";
import get from "../../apiCall/get";
import PatientDashboard from "./PatientDashboard";
import AdminDashboard from "./AdminDashboard";
import DoctorsDashboard from "./DoctorsDashboard";

const Index = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (!isLoaded || !user?.id) return;

    const fetchUser = async () => {
      try {
        const token = await getToken();
        const res = await get(`user/${user.id}`, token);
        setUserData(res?.data?.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [user?.id]);

  return (
    <>
      {userData.map((user) => (
        <div key={user.clerkId}>
          {user.role === "patient" ? (
            <PatientDashboard />
          ) : user?.role === "admin" ? (
            <AdminDashboard />
          ) : user?.role === "doctor" ? (
            <DoctorsDashboard />
          ) : null}
        </div>
      ))}
    </>
  );
};

export default Index;
