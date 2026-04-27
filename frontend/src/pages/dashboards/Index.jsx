import { useUser, useAuth, useClerk } from "@clerk/react";
import { useEffect, useState } from "react";
import get from "../../apiCall/get";
import PatientDashboard from "./PatientDashboard";
import AdminDashboard from "./AdminDashboard";
import DoctorsDashboard from "./DoctorsDashboard";

const Index = () => {
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut();
  };
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!isLoaded || !user?.id) return;

    const fetchUser = async () => {
      try {
        const token = await getToken();
        const res = await get(`user/${user.id}`, token);
        setUserData(res?.data?.data?.[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [user?.id]);

  return (
    <>
      {userData?.role === "patient" && <PatientDashboard />}
      {userData?.role === "admin" && <AdminDashboard />}
      {userData?.role === "doctor" && <DoctorsDashboard />}
      <button onClick={handleLogout}>Sign Out</button>
    </>
  );
};

export default Index;
