import axios from 'axios';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { Link } from 'react-router-dom';
import "../styles/not-found.css";

const NotFound = () => {
    return (
        <>
            <Navbar />
            <section
                className="d-flex justify-content-center align-items-center bg-image p-5"
                style={{
                    background: 'url(https://4kwallpapers.com/images/wallpapers/404-error-404-not-3840x2160-9410.jpg) no-repeat',
                    backgroundSize: "cover", backgroundPosition: "center"
                }}>
                <div className="mask d-flex justify-content-center align-items-center h-100 gradient-custom-3 mt-5">
                    <div className="container text-center">
                        <div className="row">
                            <div className="col-12">
                                <div className="card rounded not-found bg-dark">
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase mb-4 text-light" style={{ fontSize: '3rem' }}>
                                            Oops! <span className='text-danger'>{axios.HttpStatusCode.NotFound}</span> Page Not Found
                                        </h2>
                                        <p className="lead mb-4 text-light" style={{ fontSize: '1.2rem' }}>
                                            The page you're looking for doesn't exist or has been moved. Try navigating back to our homepage.
                                        </p>
                                        <Link to="/amazon/" className="btn btn-primary btn-lg text-light">Go to Homepage</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default NotFound;