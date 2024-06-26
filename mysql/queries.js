function addUser(email, password) {
  return `INSERT INTO users
              (email, password)
              VALUES
              ("${email}", "${password}");`;
}

function addToken(userId, token) {
  return `INSERT INTO sessions
            (user_id, token)
            VALUES
            (${userId}, "${token}");`;
}

function deleteToken(token) {
  return `DELETE FROM sessions
            WHERE token LIKE "${token}";`;
}

function deleteUser(token) {
  return `DELETE users, sessions FROM users 
            JOIN sessions ON users.id = sessions.user_id
            WHERE token LIKE "${token}";`;
}

function updateUser(key, value, token) {
  return `UPDATE users
            JOIN sessions ON users.id = sessions.user_id
            SET ${key} = "${value}"
            WHERE sessions.token LIKE "${token}";`;
}

function checkToken(token) {
  return `SELECT users.id
              FROM users
              JOIN sessions ON users.id = sessions.user_id
              WHERE token LIKE "${token}";`;
}

function getUser(token) {
  return `SELECT *
                FROM users
                JOIN sessions ON users.id = sessions.user_id
                WHERE token LIKE "${token}";`;
}

function addFav(userId, payload, singleRestaurantId) {
  return `INSERT INTO favourites
              (user_id, payload, single_restaurant_id)
              VALUES
              (${userId}, "${payload}", "${singleRestaurantId}");`;
}

function deleteFav(singleRestaurantId, userId) {
  return `DELETE FROM favourites
              WHERE single_restaurant_id = "${singleRestaurantId}" 
              AND user_id = ${userId};`;
}

function getFavs(userId) {
  return `SELECT *
                FROM favourites
                WHERE user_id = ${userId};`;
}

module.exports = {
  addUser,
  addToken,
  deleteToken,
  deleteUser,
  updateUser,
  checkToken,
  getUser,
  addFav,
  deleteFav,
  getFavs,
};
