import { useEffect, useState } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom";

function OnThisPage({ filteredData }) {
    const location = useLocation();
    const navigateTo = useNavigate()
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '')[1];
    const getIdFromUrl = location.hash.startsWith('#') ? location.hash.substring(1) : '';
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const options = {
            rootMargin: "-300px 0px 0px 0px",
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        const sections = Array.from(document.querySelectorAll(".scrollspy-section"));
        sections.forEach((section) => observer.observe(section));

        if (location.hash.startsWith("#")) {
            const element = document.getElementById(location.hash.substr(1));
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
                setActiveSection(element.id);
            }
        }

        return () => {
            observer.disconnect();
        };
    }, [location]);

    const toggleDomain = (domain, id) => {
        const domainUrl = domain.replace(/\s+/g, " ").toLowerCase();
        navigateTo(`/datasets/${domainUrl}#${id}`);
        if (activeSection !== id ) {
            setActiveSection(id);
        }
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };
    
    return (
        <div className="hidden lg:block">
            <div className="border-l border-amber-500/80 p-4  rounded-lg shadow-amber-500/10 drop-shadow-lg shadow-lg flex fixed justify-end items-end max-w-fit ">
                <div className=" flex flex-col justify-start  ">
                    <div className="dark:text-white text-xl font-semibold">
                        On this page
                    </div>
                    <div className="text-lg dark:text-white/80 mt-4">
                        {
                            filteredData && filteredData.map((item) => (
                                <ul key={item.domain} >
                                    {
                                        item.datasets.map((subitem) => (
                                            <li key={subitem.id} className="py-2 flex justify-start truncate">
                                                <button onClick={() => toggleDomain(item.domain, subitem.id)} className={`text-lg w-64 truncate text-start ${(activeSection === subitem.id) ? 'text-amber-500 font-semibold' : 'dark:text-white/80 dark:hover:text-white/90'}`}>
                                                    {subitem.title}
                                                </button>
                                            </li>
                                        ))
                                    }
                                </ul>
                            ))
                        }
                        <div className="border-t dark:border-white/30 text-md mt-6">
                            <button className="mt-3 inline-flex flex-row">
                               
                                <Link to={`https://github.com/neokd/DataBucket/issues/new?title=Feedback%20for%20${ decodeURIComponent(pathSegments)}&body=Feedback%20for%20${decodeURIComponent(pathSegments)}&labels=feedback `} className="mr-2" target="_blank" rel="noopener noreferrer">Give us feedback </Link>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mt-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />

                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnThisPage;
