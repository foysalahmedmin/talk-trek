import { useEffect, useState } from "react";
import { HiMenuAlt1, HiOutlineUserCircle, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import ActiveLink from "../../../providers/ActiveLink";
import logo from "../../../assets/TalkTrekLogo.svg"
import useAuth from "../../../hooks/useAuth";

const Header = ({ dashboard }) => {
    const { user, SignOut } = useAuth()
    const [menuActive, setMenuActive] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

    const themeHandler = (event) => {
        if (event.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }
    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem("theme")
        document.querySelector("html").setAttribute("data-theme", localTheme)
    }, [theme])

    useEffect(() => {
        const handleScroll = () => {
            const topHeight = window.scrollY
            if (topHeight > 70) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <header className={`top-0 w-full z-50 transition-[top] shadow bg-base-100 ${dashboard || 'fixed'}`}>
            <div className={dashboard ? 'px-[2.5%]' : 'container'}>
                <nav className='flex gap-3 justify-around items-center py-2 '>
                    <Link to='/' className='mr-auto'>
                        <div className='flex gap-1 items-center'>
                            <img className="w-10" src={logo} alt="" />
                            <p>
                                <span className="font-semibold text-secondary">Talk</span><span className="font-bold text-xl text-primary">Trek</span>
                            </p>
                        </div>
                    </Link>
                    <ul className={`
                        z-50
                        lg:static 
                        lg:bg-transparent 
                        lg:min-h-[auto] 
                        lg:leading-3 
                        lg:flex 
                        justify-center 
                        items-center 
                        gap-5
                        absolute
                        p-5 
                        mp-[2.5%]
                        left-5
                        right-5
                        bg-base-100
                        bg-opacity-90
                        rounded-md
                        leading-10 
                        transition-[top] 
                        ${menuActive ? 'top-[4rem]' : 'top-[-1000%]'}
                        `}>
                        <div className="text-right">
                            {
                                menuActive && <button onClick={() => setMenuActive(false)} className='text-3xl ml-auto lg:hidden'><HiX /></button>
                            }
                        </div>
                        <li className='font-semibold hover:text-primary border-y-2 border-transparent shrink-0'><ActiveLink to={"/"}>HOME</ActiveLink></li>
                        <li className='font-semibold hover:text-primary border-y-2 border-transparent shrink-0'><ActiveLink to={"/classes"}>CLASSES</ActiveLink></li>
                        <li className='font-semibold hover:text-primary border-y-2 border-transparent shrink-0'><ActiveLink to={"/instructor"}>INSTRUCTOR</ActiveLink></li>
                        {
                            user && (<li className='font-semibold hover:text-primary border-y-2 border-transparent shrink-0'><ActiveLink to={"/dashboard"}>DASHBOARD</ActiveLink></li>)
                        }
                    </ul>
                    <div className=" h-auto flex justify-end items-center border-2 rounded-full p-1">
                        {
                            user ?
                                <button onClick={SignOut} className='btn btn-sm rounded-full'>Sign-Out</button>
                                : <Link to='/signIn'><button className='btn btn-sm rounded-full'>Sign-In</button></Link>
                        }
                        {
                            user ?
                                user.photoURL ?
                                    <img src={user?.photoURL} title={user?.displayName} className='w-7 h-7 rounded-full object-cover' alt="" />
                                    : <h3 title={user?.displayName}><HiOutlineUserCircle className='text-3xl' /></h3>
                                : ''
                        }
                    </div>
                    <label className="swap swap-rotate">
                        <input onClick={themeHandler} type="checkbox" />

                        <svg className="swap-on fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                        <svg className="swap-off fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                    </label>
                    {
                        !menuActive && <button onClick={() => setMenuActive(true)} className='text-3xl mr-3 lg:hidden'><HiMenuAlt1 /></button>
                    }
                </nav>
            </div>
        </header>
    );
};

export default Header;