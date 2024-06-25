import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FilterComponent({ onApplyFilters }) {
  const [country, setCountry] = useState('');
  const [currencyCode, setCurrencyCode] = useState('');
  const [price, setPrice] = useState('');
  const [countryOptions, setCountryOptions] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/users/get-filters');
        const filtersData = response.data?.getFilters?.data;

        if (filtersData) {
          const countryFilters = filtersData.find(filter => filter.filterGroupCode === 'country')?.filters || [];
          const currencyFilters = filtersData.find(filter => filter.filterGroupCode === 'currency')?.filters || [];
          const priceFilters = filtersData.find(filter => filter.filterGroupCode === 'price')?.filters || [];

          setCountryOptions(countryFilters);
          setCurrencyOptions(currencyFilters);
          setPriceOptions(priceFilters);
        } else {
          console.error('No filters data found');
        }
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    fetchFilters();
  }, []);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setCurrencyCode(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const applyFilters = () => {
    onApplyFilters({ country, currencyCode, price });
  };

  return (
    <section className="bg-background p-6 rounded-lg shadow-lg">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div className="grid gap-2">
          <label htmlFor="country" className="text-sm font-medium">
            Country
          </label>
          <select
            id="country"
            value={country}
            onChange={handleCountryChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select a country</option>
            {countryOptions.map((option) => (
              <option key={option.filterValueCode} value={option.filterValueCode}>
                {option.filterValue}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor="currencyCode" className="text-sm font-medium">
            Currency
          </label>
          <select
            id="currencyCode"
            value={currencyCode}
            onChange={handleCurrencyChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select a currency</option>
            {currencyOptions.map((option) => (
              <option key={option.filterValueCode} value={option.filterValueCode}>
                {option.filterValue}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor="price" className="text-sm font-medium">
            Price
          </label>
          <select
            id="price"
            value={price}
            onChange={handlePriceChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select a price range</option>
            {priceOptions.map((option) => (
              <option key={option.filterValueCode} value={option.filterValueCode}>
                {option.filterValue}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-full flex justify-end">
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
          >
            Apply
          </button>
        </div>
      </div>
    </section>
  );
}
