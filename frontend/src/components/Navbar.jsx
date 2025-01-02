import { useAuthContext } from "../contexts/auth.context";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout } = useAuthContext();
  return (
    <header class="sticky top-0 z-50 flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-md py-3 shadow-md">
      <nav class="max-w-[95vw] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div class="flex items-center justify-between">
          <a
            class="flex-none text-xl font-semibold focus:outline-none focus:opacity-80"
            href="/"
            aria-label="MernBlogs"
          >
            <span class="inline-flex items-center gap-x-2 text-lg text-gray-700 font-semibold">
              <svg
                class="w-10 h-auto"
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="100" height="100" rx="10" fill="black" />
                <path
                  d="M37.656 68V31.6364H51.5764C54.2043 31.6364 56.3882 32.0507 58.1283 32.8793C59.8802 33.696 61.1882 34.8146 62.0523 36.2351C62.9282 37.6555 63.3662 39.2654 63.3662 41.0646C63.3662 42.5443 63.0821 43.8108 62.5139 44.8643C61.9458 45.906 61.1823 46.7524 60.2235 47.4034C59.2646 48.0544 58.1934 48.522 57.0097 48.8061V49.1612C58.2999 49.2322 59.5369 49.6288 60.7206 50.3509C61.9162 51.0611 62.8927 52.0672 63.6503 53.3693C64.4079 54.6714 64.7867 56.2457 64.7867 58.0923C64.7867 59.9744 64.3309 61.6671 63.4195 63.1705C62.508 64.6619 61.1349 65.8397 59.3002 66.7038C57.4654 67.5679 55.1572 68 52.3754 68H37.656ZM44.2433 62.4957H51.3279C53.719 62.4957 55.4413 62.04 56.4948 61.1286C57.5601 60.2053 58.0928 59.0215 58.0928 57.5774C58.0928 56.5002 57.8264 55.5296 57.2938 54.6655C56.7611 53.7895 56.0035 53.103 55.021 52.6058C54.0386 52.0968 52.8667 51.8423 51.5054 51.8423H44.2433V62.4957ZM44.2433 47.1016H50.7597C51.896 47.1016 52.92 46.8944 53.8314 46.4801C54.7429 46.054 55.459 45.4562 55.9798 44.6868C56.5125 43.9055 56.7789 42.9822 56.7789 41.9169C56.7789 40.5083 56.2817 39.3482 55.2874 38.4368C54.3049 37.5253 52.843 37.0696 50.9017 37.0696H44.2433V47.1016Z"
                  fill="white"
                />
              </svg>
              BLOGS
            </span>
          </a>
        </div>
        <div
          id="hs-navbar-example"
          class="hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
          aria-labelledby="hs-navbar-example-collapse"
        >
          {/* Hide sign in and sign up btn when logged in */}
          {user ? (
            <div class="flex flex-col gap-6 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              <a
                class="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                href="/create"
                aria-current="page"
              >
                Create post
              </a>
              <button
                class="font-medium text-rose-500 focus:outline-none"
                onClick={() => {
                  Swal.fire({
                    title: "Logout",
                    text: "Do you want to logout?",
                    icon: "question",
                    showCancelButton: true,
                    cancelButtonText: "No",
                    confirmButtonText: "Yes",
                    confirmButtonColor: "#ff0054",
                    cancelButtonColor: "#8d99ae",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      logout();
                      Swal.fire({
                        title: "Logout",
                        text: "logout successfully!",
                        icon: "success",
                      });
                    }
                  });
                }}
              >
                logout({user.username})
              </button>
            </div>
          ) : (
            <div class="flex flex-col gap-6 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              <a
                class="font-medium text-emerald-500 focus:outline-none"
                href="/login"
                aria-current="page"
              >
                Sign in
              </a>
              <a
                class="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                href="/register"
              >
                Sign up
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
