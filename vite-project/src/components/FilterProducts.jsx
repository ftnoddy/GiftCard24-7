import React, { useState } from 'react';

export default function FilterComponent() {
  const [filters, setFilters] = useState({
    country: 'us',
    priceRange: [100, 500],
    voucherCategory: 'food',
    productCategory: 'electronics',
    currency: 'usd',
  });

  const handleSelectChange = (e) => {
    const { id, value } = e.target;
    setFilters({
      ...filters,
      [id]: value,
    });
  };

  const handleSliderChange = (e) => {
    const { value, id } = e.target;
    setFilters({
      ...filters,
      [id]: value.split(',').map(Number),
    });
  };

  const applyFilters = () => {
    console.log('Applied Filters:', filters);
  };

  return (
    <section className="bg-background p-6 rounded-lg shadow-lg">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div className="grid gap-2">
          <label htmlFor="country" className="text-sm font-medium">
            Country
          </label>
          <select id="country" value={filters.country} onChange={handleSelectChange} className="w-full p-2 border rounded-md">
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="gb">United Kingdom</option>
            <option value="au">Australia</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
            <option value="jp">Japan</option>
            <option value="cn">China</option>
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor="priceRange" className="text-sm font-medium">
            Price Range
          </label>
          <input
            type="range"
            id="priceRange"
            min="0"
            max="1000"
            step="10"
            value={filters.priceRange.join(',')}
            onChange={handleSliderChange}
            className="w-full"
            multiple
          />
          <div className="flex justify-between text-xs">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
        <div className="grid gap-2">
          <label htmlFor="voucherCategory" className="text-sm font-medium">
            Voucher Category
          </label>
          <select id="voucherCategory" value={filters.voucherCategory} onChange={handleSelectChange} className="w-full p-2 border rounded-md">
            <option value="food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="travel">Travel</option>
            <option value="shopping">Shopping</option>
            <option value="services">Services</option>
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor="productCategory" className="text-sm font-medium">
            Product Category
          </label>
          <select id="productCategory" value={filters.productCategory} onChange={handleSelectChange} className="w-full p-2 border rounded-md">
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home & Garden</option>
            <option value="beauty">Beauty & Personal Care</option>
            <option value="sports">Sports & Outdoors</option>
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor="currency" className="text-sm font-medium">
            Currency
          </label>
          <select id="currency" value={filters.currency} onChange={handleSelectChange} className="w-full p-2 border rounded-md">
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
            <option value="jpy">JPY</option>
            <option value="cad">CAD</option>
            <option value="aud">AUD</option>
            <option value="chf">CHF</option>
            <option value="cny">CNY</option>
          </select>
        </div>
        <div className="col-span-full flex justify-end">
          <button onClick={applyFilters} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
            Apply
          </button>
        </div>
      </div>
    </section>
  );
}
