import Image from "next/image";
import Header from "./Components/header";
import Banner from "./Components/Banner";
import MapFilter from "./Components/MapFilter";

export default async function Home() {
  let exploreData = [];

  try {
    // Fetching data inside the component with error handling
    const res = await fetch('https://links.papareact.com/pyp');

    // Check if the response is OK (status 200–299)
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    exploreData = await res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <div>
      <Header />
      <Banner />
      {/* {/* <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          {/* Render the data or a fallback message if fetch failed */}
          {/* {exploreData.length > 0 ? (
            exploreData.map((item) => (
              <h1 key={item.location}>{item.location}</h1>
            ))
          ) : (
            <p>Failed to load explore data.</p>
          )}
        </section> */}
      {/* // </main> */} 
      <div classname=" container mx-auto px-5 lg:px-1">
      <MapFilter/>
      </div>
    </div>
  );
}
