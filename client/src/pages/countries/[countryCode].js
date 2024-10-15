import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const CountryInfo = () => {
  const router = useRouter();
  const { countryCode } = router.query;
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countriesMap, setCountriesMap] = useState({});

  useEffect(() => {
    const fetchAvailableCountries = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/countries/available`);
        const data = await response.json();
        const countries = data.reduce((acc, country) => {
          acc[country.name] = country.countryCode;
          return acc;
        }, {});
        setCountriesMap(countries);
      } catch (error) {
        console.error('Error fetching available countries:', error);
      }
    };

    fetchAvailableCountries();
  }, []);

  useEffect(() => {
    if (countryCode) {
      const fetchCountryData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/countries/info/${countryCode}`);
          if (!response.ok) {
            throw new Error('Error fetching country data');
          }
          const data = await response.json();
          setCountryData(data.country);
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCountryData();
    }
  }, [countryCode]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (!countryData) return <p className="text-center text-lg">Country information not found.</p>;

  const { name, flag, borders, population } = countryData;

  if (!population || population.length === 0) {
    return <p className="text-center text-lg">No population data available.</p>;
  }

  const chartData = {
    labels: population.map((data) => data.year),
    datasets: [
      {
        label: 'Population',
        data: population.map((data) => data.population),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  return (
    <div className="container mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <Link href="/countries">
        <button className="mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200">
          Go Back
        </button>
      </Link>

      <h1 className="text-4xl font-bold mb-4 flex items-center">
        {name}
        <img src={flag} alt={`Flag of ${name}`} className="ml-4 w-16 h-auto" />
      </h1>

      <h2 className="text-2xl font-bold mt-5">Bordering Countries</h2>
      <ul className="space-y-2">
        {borders.map((borderCountry) => {
          const isoCode = countriesMap[borderCountry];
          return (
            <li key={borderCountry}>
              {isoCode ? (
                <Link href={`/countries/${isoCode}`}>
                  <p className="text-blue-600 hover:underline">{borderCountry}</p>
                </Link>
              ) : (
                <p className="text-gray-400">{borderCountry} (Code not found)</p>
              )}
            </li>
          );
        })}
      </ul>

      <h2 className="text-2xl font-bold mt-5">Population Chart</h2>
      <div className="mt-4">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default CountryInfo;
