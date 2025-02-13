import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const { createNewUser, setUser, updatedUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // get form data
    const form = new FormData(e.target);
    const name = form.get("name");
    if (name.length < 5) {
      setError({
        ...error,
        name: "Name must be more than 5 character long!!",
      });

      return;
    }
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        updatedUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            navigate("/");
          })
          .catch(() => {});
      })
      .catch(() => {});
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
        <h2 className="text-2xl font-semibold text-center">
          Register your account
        </h2>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label block">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              className="input input-bordered w-full"
              required
            />
          </div>

          {error.name && (
            <label htmlFor="" className="label text-xs text-red-500">
              {error.name}
            </label>
          )}

          <div className="form-control">
            <label className="label block">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="photo url"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label block">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label block">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered w-full"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6 w-full">
            <button className="btn btn-neutral rounded-none w-full">
              Register
            </button>
          </div>
        </form>
        <p className="text-center font-semibold">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-red-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
