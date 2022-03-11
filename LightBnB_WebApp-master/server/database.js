const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`SELECT * FROM users WHERE id = $1;`, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const userName = user.name;
  const userEmail = user.email;
  const userPassword = user.password;
  const params = [userName, userEmail, userPassword];
  
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, params)
    .then((result) =>{
      return (result.rows[0]);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString =
  `SELECT reservations.*, properties.*,  avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;`;

  const params = [guest_id, limit];
  
  return pool.query(queryString, params)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });


};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  console.log("OPTIONS:", options);
  const params = [];
  
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    `;

  if (options.city) {
    params.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${params.length}`;
  }

  if (options.owner_id) {
    params.push(options.owner_id);
    if (params.length === 1) {
      queryString += `WHERE owner_id = $${params.length}`;
    } else {
      queryString += `AND owner_id = $${params.length}`;
    }
  }

  if (options.minimum_price_per_night) {
    const minPrice = parseInt(options.minimum_price_per_night) * 100;
    params.push(minPrice);
    if (params.length === 1) {
      queryString += `WHERE cost_per_night >= $${params.length}`;
    } else {
      queryString += `AND cost_per_night >= $${params.length}`;
    }
  }

  if (options.maximum_price_per_night) {
    const maxPrice = parseInt(options.maximum_price_per_night) * 100;
    params.push(maxPrice);
    if (params.length === 1) {
      queryString += `WHERE cost_per_night <= $${params.length}`;
    } else {
      queryString += `AND cost_per_night <= $${params.length}`;
    }
  }

  if (options.minimum_rating) {
    params.push(options.minimum_rating);
    if (params.length === 1) {
      queryString += `WHERE rating >= $${params.length}`;
    } else {
      queryString += `AND rating >= $${params.length}`;
    }
  }

  params.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${params.length};
  `;

  console.log("Query String:", queryString, "Params:",  params);

  return pool.query(queryString, params)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });

};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  
  /* eslint-disable */
  const { 
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms
  } = property;

  const params = [
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms
  ];

  /* eslint-enable */
  // function to list all property columns required for insert query
  // const propertyColumns = () => {
  //   let result = "";
  //   for (const key in property) {
  //     result += `${key}, `;
  //   }
  //   // console.log("Result:", result);
  //   // slices off the final comma and space from the result string.
  //   return result.slice(0, -2);
  // };

  const queryString =
  `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms) 
  VALUES (${params}) 
  RETURNING *;`;
  console.log("queryString:", queryString, "params:", params);

  return pool.query(queryString, params)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });

};
exports.addProperty = addProperty;