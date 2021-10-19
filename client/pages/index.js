import { getSession } from 'next-auth/client';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import { fetchUser } from '../store/post/post.reducer';

export default function Home({ session }) {
  const dispatch = useDispatch();
  if(!session) return <Login />
  
  const { id } = session.user
  const state = useSelector((state) => state);
  const { data, loading } = state.user
  
  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch])

  return (
    <div>
      <Head>
        <title>Facebuuk</title>
      </Head>

      {loading === 'loaded' && <Header user={data} />}
      <main className="flex">
        <Sidebar />
        <Feed />
        <Widgets />
      </main>

    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  }

  return { props: { users: users } }
}