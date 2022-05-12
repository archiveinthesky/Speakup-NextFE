import Header from '../../components/navbar/Header';
import Sidebar from '../../components/navbar/Sidebar.js';

const AdminHomePage = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-100">
            <Header />
            <Sidebar />
            <div className="mt-16 ml-64 pt-16 pl-20">
                <h1 className="text-4xl text-primary-800"></h1>
            </div>
        </div>
    );
};

export default AdminHomePage;
