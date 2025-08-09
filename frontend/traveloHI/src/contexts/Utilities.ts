export const getJWTFromCookie = () => {
    const cookieValue = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt="));

    if (cookieValue) {
      // console.log(cookieValue.split("=")[1]);
      return cookieValue.split("=")[1];
    } else {
      return null;
    }
  };