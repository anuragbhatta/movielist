import MovieGrid from './MovieGrid';
import Header from './Header';
import { URL } from './constants';
import { Suspense } from 'react';
import Loading from './loading';

async function getData() {
  const API_URL = `${URL}page1.json`;
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json();
}

export default async function Home() {
  const data = await getData();
  // console.log('first data : ', data?.page['content-items']?.content);

  return (
    <main className="container mx-auto text-center">
    <Header />
    <Suspense fallback={<Loading />}>
      <MovieGrid
        movies={data?.page['content-items']?.content}
        total={data?.page['total-content-items']}
        pageSize={data?.page['page-size-returned']}
      />
    </Suspense>
    </main>
  ) 
}
