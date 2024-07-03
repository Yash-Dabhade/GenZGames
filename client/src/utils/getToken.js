function getJWTToken() {
  return sessionStorage.getItem("jwtToken");
}

exports = { getJWTToken };
