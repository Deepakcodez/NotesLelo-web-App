const isAuthenticated = async () => {
    try {
      let token = localStorage.getItem("useDataToken");
      // console.log('>>>>>>>>>>>', token);
      //from fetch send data in headers authorization:token to the /isVarify route  here i put a middleware called authenticate which verify the stored token in the browser to the secretkey
      const response = await axios.get(
        "https://notes-lelo-app-backend.vercel.app/api/v1/user/isVarify",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      setLoading(false);
      // console.log(">>>>>>>>>>>data", data);
      setUserDetail(response.data);
      setCurrentUser(response.data);

      if (response.status == 401 || !response) {
        navigate("/signIn");
      }
    } catch (error) {
      console.error("Error in isAuthenticated:", error);
      setLoading(false);

      // Handle errors, such as redirecting to the login page
    }
  };