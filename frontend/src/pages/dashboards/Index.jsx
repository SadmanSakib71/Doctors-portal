import { useUser, useAuth } from "@clerk/react";
import { useEffect, useState } from "react";
import get from "../../apiCall/get";

const Index = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [userRole, setUserRole] = useState([]);
  console.log(userRole);

  useEffect(() => {
    if (!isLoaded || !user?.id) return;

    const fetchUser = async () => {
      try {
        const token = await getToken();
        const res = await get(`user/${user.id}`, token);
        setUserRole(res?.data?.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [user?.id]);

  return <></>;
};

export default Index;
