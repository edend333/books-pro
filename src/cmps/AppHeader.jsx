import { Link, NavLink } from 'react-router-dom'
export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section>
                <h1>React Book App</h1>
                <nav className="app-nav container">
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/booksList">Books</NavLink>
                </nav>
            </section>
        </header>
    )
}