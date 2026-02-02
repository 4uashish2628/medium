export const getUserNameFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return "User";
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.name || "User";
  } catch {
    return "User";
  }
};
