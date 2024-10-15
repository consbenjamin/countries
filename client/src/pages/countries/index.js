// pages/countries.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/countries/available');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  return (
    <div className="container mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-5 border-b pb-2 border-gray-300 text-center">List of Countries</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-2">
          {countries.map((country) => (
            <li key={country.countryCode}>
              <Link href={`/countries/${country.countryCode}`}>
                <p className="bg-gray-100 hover:bg-gray-200 transition duration-200 p-2 rounded-md text-blue-600 hover:underline">
                  {country.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Countries;
