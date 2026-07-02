import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const cleanEmail = email.toLowerCase().trim()

  const isEmailValid =
    /^[a-zA-Z0-9._%+-]+@umt\.skt\.edu\.pk$/.test(cleanEmail) &&
    !cleanEmail.includes(" ")

  const isPasswordValid =
    password.length >= 8 && !password.includes(" ")

  const isFormValid = isEmailValid && isPasswordValid

  function handleEmailChange(e) {
    const value = e.target.value.replace(/\s/g, "").toLowerCase()
    setEmail(value)
  }

  function handlePasswordChange(e) {
    const value = e.target.value.replace(/\s/g, "")
    setPassword(value)
  }

  function getFriendlyLoginError(message) {
    if (
      message.includes("invalid-credential") ||
      message.includes("wrong-password") ||
      message.includes("user-not-found")
    ) {
      return "Invalid email or password. Please check your details."
    }

    if (message.includes("too-many-requests")) {
      return "Too many failed attempts. Please try again later."
    }

    if (message.includes("invalid-email")) {
      return "Please enter a valid UMT Sialkot email address."
    }

    return "Login failed. Please try again."
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    if (!isFormValid) {
      setError("Please enter a valid UMT Sialkot email address and password.")
      return
    }

    setLoading(true)

    try {
      await login(cleanEmail, password)
      navigate("/dashboard")
    } catch (err) {
      setError(getFriendlyLoginError(err.message))
    }

    setLoading(false)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold leading-tight">
            Welcome Back
          </h1>

          <p className="mt-4 text-blue-100 leading-relaxed">
            Login to manage your lost and found posts, report new items, and
            help students recover their belongings.
          </p>

          <div className="mt-8 space-y-4">
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h3 className="font-semibold">Quick Access</h3>
              <p className="text-sm text-blue-100 mt-1">
                Access your dashboard and manage posts easily.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h3 className="font-semibold">Secure Login</h3>
              <p className="text-sm text-blue-100 mt-1">
                Your account is protected using Firebase Authentication.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h3 className="font-semibold">Input Guidance</h3>
              <p className="text-sm text-blue-100 mt-1">
                Clear validation helps prevent login mistakes.
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Login
          </h2>

          <p className="text-gray-500 mt-2">
            Enter your account details to continue.
          </p>

          {error && (
            <div className="mt-5 bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                University Email Address
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                  email.length > 0 && !isEmailValid
                    ? "border-red-300 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
                placeholder="example@umt.skt.edu.pk"
              />

              {email.length > 0 && !isEmailValid && (
  <p className="text-xs text-red-600 mt-1">
    Please use your official university email ending with
    @umt.skt.edu.pk.
  </p>
)}

              {isEmailValid && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ University email address is valid.
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className={`w-full border rounded-xl px-4 py-3 pr-20 focus:outline-none focus:ring-2 ${
                    password.length > 0 && !isPasswordValid
                      ? "border-red-300 focus:ring-red-400"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Enter password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-700 font-semibold"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {password.length > 0 && !isPasswordValid && (
                <p className="text-xs text-red-600 mt-1">
                  Password must be at least 8 characters and contain no spaces.
                </p>
              )}

              {isPasswordValid && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ Password format is valid.
                </p>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
              <p className="font-semibold">Login Rules</p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Email must be a valid UMT Sialkot email address.</li>
                <li>Password must be at least 8 characters.</li>
                <li>No spaces are allowed in email or password.</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Do not have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-700 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login