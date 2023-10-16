export const useGetUserInfo = () => {
    const { name, userId, isAuth } =
      JSON.parse(localStorage.getItem("auth")) || {};
    return { name, userId, isAuth };
  };