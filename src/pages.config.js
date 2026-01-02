import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Profile from './pages/Profile';
import Trading from './pages/Trading';
import index from './pages/index';


export const PAGES = {
    "About": About,
    "Contact": Contact,
    "Home": Home,
    "Layout": Layout,
    "Profile": Profile,
    "Trading": Trading,
    "index": index,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
};