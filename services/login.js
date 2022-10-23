const login = (data) => {
  if (data.username == "loan" && data.password == "dithaimapdit123") {
    return true;
  } else {
    return false;
  }
};
module.exports = login;
