import { getSession } from 'next-auth/client';
import Head from 'next/head';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';

export default function Home({ session }) {
  if(!session) return <Login />
  return (
    <div>
      <Head>
        <title>Facebuuk</title>
      </Head>

      <Header session={session} />
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