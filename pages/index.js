import { useState, useContext } from 'react'
import UserContext from 'lib/UserContext'
import { supabase } from 'lib/Store'

const Home = () => {
  const { signIn } = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (type, username, password) => {
    try {
      const { error, user } = 
        type === 'LOGIN'
          ? await supabase.auth.signIn({email: username, password})
          : await supabase.auth.signUp({email: username, password})
      // If the user doesn't exist here and an error hasn't been raised yet,
      // that must mean that a confirmation email has been sent.
      // NOTE: Confirming your email address is required by default.
      if (error) {
        alert('Error with auth: ' + error.message)
      }
      else if (!user) alert('Signup successful, confirmation mail should be sent soon!')
    } catch (error) {
      console.log('error', error)
      alert(error.error_description || error)
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center p-4 bg-gray-300">
      <div className="w-full sm:w-1/2 xl:w-1/3">
        <div className="border-indigo p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg bg-white">
          <div className="mb-4">
            <label className="font-bold text-grey-darker block mb-2">Email</label>
            <input
              type="text"
              className="shadow-none bg-white focus:outline-none focus:ring focus:border-indigo-600 focus:ring-indigo-300 border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="font-bold text-grey-darker block mb-2">Password</label>
            <input
              type="password"
              className="bg-white focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-600 border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              placeholder="Enter something strong"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <a
              onClick={(e) => {
                e.preventDefault()
                handleLogin('SIGNUP', username, password)
              }}
              href={'/channels'}
              className="bg-indigo-700 hover:bg-indigo text-white py-2 px-4 rounded-lg text-center transition duration-150 hover:bg-indigo-600 hover:text-white"
            >
              Sign up
            </a>
            <a
              onClick={(e) => {
                e.preventDefault()
                handleLogin('LOGIN', username, password)
              }}
              href={'/channels'}
              className="border border-indigo-700 text-indigo-700 py-2 px-4 rounded-lg w-full text-center transition duration-150 hover:bg-indigo-700 hover:text-white"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
