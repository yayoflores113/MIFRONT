import React from "react";
import { Link } from "@heroui/react";
import { useLocation } from "react-router-dom";

/* SVGs inline para redes: no requieren dependencias extra */
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M22 12.06C22 6.49 17.52 2 11.94 2 6.37 2 2 6.49 2 12.06c0 4.99 3.66 9.14 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.86h2.78l-.44 2.9h-2.34V22c4.78-.8 8.44-4.95 8.44-9.94z" />
  </svg>
);
const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M22 5.92a8.24 8.24 0 0 1-2.36.65 4.13 4.13 0 0 0 1.81-2.28 8.25 8.25 0 0 1-2.61 1 4.12 4.12 0 0 0-7 3.76A11.7 11.7 0 0 1 3.15 4.7a4.11 4.11 0 0 0 1.28 5.49 4.08 4.08 0 0 1-1.86-.51v.05a4.12 4.12 0 0 0 3.3 4.04 4.16 4.16 0 0 1-1.85.07 4.12 4.12 0 0 0 3.84 2.85A8.27 8.27 0 0 1 2 18.42a11.67 11.67 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.35 8.35 0 0 0 22 5.92z" />
  </svg>
);
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11.001A5.5 5.5 0 0 1 12 7.5zm0 2a3.5 3.5 0 1 0 .001 6.999A3.5 3.5 0 0 0 12 9.5zm5.75-2.25a1 1 0 1 1 0 2.001 1 1 0 0 1 0-2.001z" />
  </svg>
);
const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v15H0V8zm7.5 0h4.8v2.05h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 6 3.33 6 7.66V23H18v-6.55c0-1.56-.03-3.56-2.17-3.56-2.18 0-2.51 1.7-2.51 3.45V23H7.5V8z" />
  </svg>
);

const Footer = () => {
  const { pathname } = useLocation();

  // Ocultar footer en auth pages (igual que tu versión actual)
  if (pathname === "/login" || pathname === "/register") return null;

  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-default-200 bg-default-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand + About */}
          <div className="lg:col-span-2">
            <img src="MI.png" alt="" width={35} height={35} />
            <p className="mb-4 max-w-md text-default-600">
              MI is a leading online education platform offering high-quality
              courses from top universities and industry experts to help you
              advance your career.
            </p>

            <div className="flex gap-4">
              <Link
                href="#"
                className="text-default-600 transition-colors hover:text-[#2CBFF0]"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-default-600 transition-colors hover:text-[#2CBFF0]"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-default-600 transition-colors hover:text-[#2CBFF0]"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-default-600 transition-colors hover:text-[#2CBFF0]"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 font-semibold">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  color="foreground"
                  className="text-default-600 hover:text-[#2CBFF0]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  color="foreground"
                  className="text-default-600 hover:text-[#2CBFF0]"
                >
                  Universities
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  color="foreground"
                  className="text-default-600 hover:text-[#2CBFF0]"
                >
                  Degrees
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  color="foreground"
                  className="text-default-600 hover:text-[#2CBFF0]"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  color="foreground"
                  className="text-default-600 hover:text-[#2CBFF0]"
                >
                  Subscription Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 font-semibold">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  color="foreground"
                  className="text-default-600 hover:text-[#2CBFF0]"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  color="foreground"
                  className="text-default-600 hover:text-[#2CBFF0]"
                >
                  Data Science
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  color="foreground"
                  className="text-default-600 hover:text-[#2CBFF0]"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  color="foreground"
                  className="text-default-600 hover:text-[#2CBFF0]"
                >
                  Design
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  color="foreground"
                  className="text-default-600 hover:text-[#2CBFF0]"
                >
                  Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  color="foreground"
                  className="text-default-600 hover:text-[#2CBFF0]"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  color="foreground"
                  className="text-default-600 hover:text-[#2CBFF0]"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  color="foreground"
                  className="text-default-600 hover:text-[#2CBFF0]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  color="foreground"
                  className="text-default-600 hover:text-[#2CBFF0]"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  color="foreground"
                  className="text-default-600 hover:text-[#2CBFF0]"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-default-200 pt-6 md:flex-row">
          <p className="text-sm text-default-500">
            © {year} Modern Institute. All rights reserved.
          </p>
          <div className="mt-4 flex gap-4 text-sm text-default-500 md:mt-0">
            <Link
              href="#"
              color="foreground"
              className="text-default-500 hover:text-default-700"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="foreground"
              className="text-default-500 hover:text-default-700"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              color="foreground"
              className="text-default-500 hover:text-default-700"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
