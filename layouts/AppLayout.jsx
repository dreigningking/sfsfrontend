import Head from "next/head"
import Header from "../components/Header"
import Register from "../components/Modals/Auth/Register"
import Login from "../components/Modals/Auth/Login"

const AppLayout = ({ children }) => {
  return (
    <div className="vh-100 bg-body-tertiary d-flex flex-column overflow-hidden">
      <Head>
        <title>NoteApp</title>
        <meta name="description" content="Keeping you in your sphere" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow-1 p-3">
        {children}
      </main>

      <Register />
      <Login />
    </div>
  )
}

export default AppLayout