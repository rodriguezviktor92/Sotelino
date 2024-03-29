//returns a navbar component styled with tailwind that contains title and links to home, obras, about, iniciar sesion and registrarse
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import s from "./NavBar.module.css";
import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "../../utils/customerHooks/useLocalStorage";
import CartModal from "../CartModal/CartModal";
import { HashLink } from "react-router-hash-link";

export default function NavBar({ gallerySection, aboutSection }) {
  const [name, setName] = useLocalStorage("name", "");
  const [perfilOptions, setPerfilOptions] = useState(false);
  const scrollToSection = (sectionref) => {
    window.scrollTo({
      top: sectionref.current.offsetTop,
      behavior: "smooth",
    });
  };

  const handleClickOptions = () => {
    setPerfilOptions(!perfilOptions);
  };
  const handleclicklogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id_customer");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    window.location.reload();
  };

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [background, setBackground] = useState(false);

  const [modalState, setmodalState] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  function openModal() {
    setmodalState(!modalState);
  }

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        // if scroll up show the navbar
        setShow(true);
      }
      if (window.scrollY >= 40) {
        setBackground(true);
      } else {
        setBackground(false);
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  useEffect(() => {
    console.log("use efect navbar");
    if (localStorage.getItem("role") === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [localStorage]);

  return (
    <nav
      className={`flex items-center justify-between flex-wrap p-2 fixed w-screen z-20 w-full ${
        background && s.background
      } ${show ? s.active : s.hidden}`}
    >
      <div className="self-end sm:block hidden flex items-center flex-shrink-0 text-white mr-6">
        <span className={s.title}>Sotelino</span>
      </div>
      <div className="block flex-grow lg:flex lg:items-center">
        <div className="text-sm lg:flex-grow"></div>
        <div className="lg:flex grid grid-cols-3 justify-center items-center content-center text-center">
          <Link
            to="/home"
            className="block lg:inline-block lg:mt-0 text-gray-200 hover:text-white lg:mr-12"
          >
            Inicio
          </Link>
          {isAdmin ? (
            <Link
              to="/dashboard#admin"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white lg:mr-12"
            >
              Panel
            </Link>
          ) : null}

          <HashLink
            smooth
            to="/home#gallery"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-200
            	hover:text-white lg:mr-12 pointer"
          >
            Obras
          </HashLink>

          <HashLink
            smooth
            to="/home#about"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white lg:mr-12 pointer"
          >
            Sobre mi
          </HashLink>
          <Link
            to="/comentarios"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white lg:mr-12 pointer"
          >
            Comentarios
          </Link>
          {!localStorage.getItem("token") ? (
            <Link
              to="/login"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white lg:mr-12"
            >
              Iniciar sesion
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={handleClickOptions}
                className="focus:outline-none text-base block mt-4 lg:inline-block lg:mt-0 text-white underline hover:text-white mr-12 cursor-pointer uppercase font-bold"
              >
                {name === "" || name === null ? "usuario" : name}
              </button>
              <div
                className={`${
                  !perfilOptions && "hidden"
                } ease-out duration-300 rounded-xl absolute w-40 h-30 top-10 right-0 bg-white text-black text-sm text-center`}
              >
                <ul>
                  <li>
                    <button
                      onClick={handleclicklogout}
                      className="mb-2.5 mt-2.5 focus:outline-none hover:opacity-80"
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <Link className="mb-2.5 mt-2.5" to="/perfil">
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <Link className="mb-2.5 mt-2.5" to="/shopping">
                      Compras
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {!localStorage.getItem("token") ? (
            <Link
              to="/registry"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-8 cursor-pointer"
            >
              Registrarse
            </Link>
          ) : (
            ""
          )}
          <Cart openModal={openModal} />
          <CartModal openModal={openModal} modalState={modalState} />
        </div>
      </div>
    </nav>
  );
}
