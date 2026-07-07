import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { signup } = useAuth()
  const navigate = useNavigate()

  const cleanEmail = email.toLowerCase().trim()
  const cleanName = name.trim()

  const isNameValid =
    cleanName.length >= 3 && /^[A-Za-z ]+$/.test(cleanName)

  const isEmailValid =
  /^[a-zA-Z0-9._%+-]+@skt\.umt\.edu\.pk$/.test(cleanEmail) &&
  !cleanEmail.includes(" ")

  const isPasswordValid =
    password.length >= 8 &&
    !password.includes(" ") &&
    /[A-Za-z]/.test(password) &&
    /[0-9]/.test(password)

  const isConfirmPasswordValid =
    confirmPassword.length > 0 && password === confirmPassword

  const isFormValid =
    isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid

  function handleEmailChange(e) {
    const value = e.target.value.replace(/\s/g, "").toLowerCase()
    setEmail(value)
  }

  function handlePasswordChange(e) {
    const value = e.target.value.replace(/\s/g, "")
    setPassword(value)
  }

  function handleConfirmPasswordChange(e) {
    const value = e.target.value.replace(/\s/g, "")
    setConfirmPassword(value)
  }

  function getFriendlyFirebaseError(message) {
    if (message.includes("email-already-in-use")) {
      return "This email is already registered. Please login instead."
    }

    if (message.includes("invalid-email")) {
      return "Please enter a valid UMT Sialkot email address."
    }

    if (message.includes("weak-password")) {
      return "Password is too weak. Please use at least 8 characters."
    }

    return "Something went wrong while creating your account."
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    if (!isFormValid) {
      setError("Please correct the highlighted fields before signing up.")
      return
    }

    setLoading(true)

    try {
      await signup(cleanName, cleanEmail, password)
      navigate("/dashboard")
    } catch (err) {
      setError(getFriendlyFirebaseError(err.message))
    }

    setLoading(false)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Create Account
          </h2>

          <p className="text-gray-500 mt-2">
            Register to post and manage lost or found items.
          </p>

          {error && (
            <div className="mt-5 bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                  name.length > 0 && !isNameValid
                    ? "border-red-300 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
                placeholder="Enter your full name"
              />

              {name.length > 0 && !isNameValid && (
                <p className="text-xs text-red-600 mt-1">
                  Name must be at least 3 characters and contain only letters.
                </p>
              )}

              {isNameValid && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ Name looks good.
                </p>
              )}
            </div>

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
                placeholder="student@skt.umt.edu.pk"
              />

              {email.length > 0 && !isEmailValid && (
  <p className="text-xs text-red-600 mt-1">
    Please use your official university email ending with
    @skt.umt.edu.pk
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
                  placeholder="Minimum 8 characters"
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
                  Password must be 8 characters, no spaces, and include at
                  least one letter and one number.
                </p>
              )}

              {isPasswordValid && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ Password meets requirements.
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`w-full border rounded-xl px-4 py-3 pr-20 focus:outline-none focus:ring-2 ${
                    confirmPassword.length > 0 && !isConfirmPasswordValid
                      ? "border-red-300 focus:ring-red-400"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Re-enter password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-700 font-semibold"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>

              {confirmPassword.length > 0 && !isConfirmPasswordValid && (
                <p className="text-xs text-red-600 mt-1">
                  Passwords do not match.
                </p>
              )}

              {isConfirmPasswordValid && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ Passwords match.
                </p>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
              <p className="font-semibold">Account Rules</p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Name must contain only letters.</li>
                <li>Email must end with @skt.umt.edu.pk.</li>
                <li>Password must be 8+ characters with a letter and number.</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold leading-tight">
            Join Lost & Found
          </h1>

          <p className="mt-4 text-blue-100 leading-relaxed">
            Create your student account and help build a more organized campus
            lost and found experience.
          </p>

          <div className="mt-8 space-y-4">
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h3 className="font-semibold">Post Lost Items</h3>
              <p className="text-sm text-blue-100 mt-1">
                Report missing belongings with details and images.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h3 className="font-semibold">Find Faster</h3>
              <p className="text-sm text-blue-100 mt-1">
                Search and filter items using a clean interface.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <h3 className="font-semibold">Error Prevention</h3>
              <p className="text-sm text-blue-100 mt-1">
                Smart input validation helps users avoid mistakes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup