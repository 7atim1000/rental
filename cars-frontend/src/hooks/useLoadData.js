import { useEffect, useState } from "react";
import { getUserData } from "../https";
import { removeUser, setUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useLoadData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserData();

        // Check if the response is actually successful
        if (data?.success) {
          const { _id, name, email, phone, role } = data.data;
          dispatch(setUser({ _id, name, email, phone, role }));
        } else {
          throw new Error("No user data");
        }
      } catch (error) {
        // Clear any potential lingering cookies
        document.cookie = 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        dispatch(removeUser());
        navigate('/auth');
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [dispatch, navigate]);

  return isLoading;
};


export default useLoadData;