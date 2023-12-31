import { Outlet } from "react-router-dom";
import Header from "../pages/Shared/Header/Header";
import SideBar from "../pages/Dashboard/Sidebar/SideBar";
import { FaDoorOpen } from "react-icons/fa";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const Dashboard = () => {
    useEffect(()=>{
        AOS.init()
    }, [])
    return (
        <>
            <main className="flex w-screen mx-auto justify-center lg:h-screen overflow-y-hidden flex-row-reverse relative">
                <section className="flex-1 relative w-screen lg:w-full">
                    <Header dashboard={true} />
                    <div className="">
                        <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden"><FaDoorOpen /> Side-Bar</label>
                    </div>
                    <div className="py-10 lg:h-[calc(100vh-5rem)] lg:overflow-y-scroll">
                        <Outlet />
                    </div>
                </section>
                <section>
                    <SideBar />
                </section>

            </main>
            
        </>

    );
};

export default Dashboard;