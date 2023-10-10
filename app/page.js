import Image from 'next/image';
import MovieGrid from './movieGrid';
import Header from './header';
import { URL } from './constants';

async function getData() {
  const API_URL = `${URL}page1.json`;
  const res = await fetch(API_URL);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
}


export default async function Home() {
  const data = await getData();
  console.log('first data : ', data?.page['content-items']?.content);

  return (
    <main className="container mx-auto text-center">
      <Header />
      <MovieGrid
        movies={data?.page['content-items']?.content}
        total={data?.page['total-content-items']}
        pageSize={data?.page['page-size-returned']}
      />
    </main>
  )
}
