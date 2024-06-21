// // CountryFilter.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CountryFilter = ({ onSelectCountry }) => {
//   const [countries, setCountries] = useState([]);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get('http://localhost:5002/api/users/get-filters');
//         const countryFilters = response.data.data.getFilters.data.find(filterGroup => filterGroup.filterGroupCode === 'country');
//         setCountries(countryFilters.filters);
//       } catch (error) {
//         console.error('Error fetching countries:', error);
//       }
//     };

//     fetchCountries();
//   }, []);

//   const handleChange = (event) => {
//     onSelectCountry(event.target.value);
//   };

//   return (
//     <select onChange={handleChange} className="input input-bordered rounded-lg">
//       <option value="">Select Country</option>
//       {countries.map(country => (
//         <option key={country.isoCode} value={country.filterValueCode}>
//           {country.filterValue}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default CountryFilter;
