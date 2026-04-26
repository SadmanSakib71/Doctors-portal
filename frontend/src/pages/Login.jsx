import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  return (
    <div className="min-h-screen  bg-linear-to-br from-black via-slate-900 to-zinc-900 p-4 sm:p-8">
      <header className="mx-auto mt-10 w-full max-w-xl rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Welcome to Doctor's Portal
        </h1>

        <p className="mt-2 text-sm text-slate-300 sm:text-base">
          Continue securely to manage appointments and patient workflow.
        </p>

        <Show when="signed-out">
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <SignInButton mode="modal">
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-cyan-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-400"
              >
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/20"
              >
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </Show>

        <Show when="signed-in">
          <div className="mt-6 flex items-center justify-center rounded-xl bg-white/10 p-4 border border-white/10 backdrop-blur">
            <UserButton />
          </div>
        </Show>
      </header>
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default Login;
