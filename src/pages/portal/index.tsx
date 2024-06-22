
import { Link, Outlet } from "react-router-dom";
import HeaderDefault from "../../components/Header";
const Portal = () => {
    return (
        <>
            {/* Header default */}
            <HeaderDefault  position="fixed top-0 w-full"/>
            <section className="portal">
                <Outlet />
            </section>
            <footer className="container">
                <h1>Ini adalah footer</h1>
            </footer>

        </>
    );
}

export default Portal;