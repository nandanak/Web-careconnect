<>
  <meta charSet="utf-8" />
  <title>CareConnect</title>
  <link href="/static/img/favicon.ico" rel="icon" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&family=Roboto:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    rel="stylesheet"
  />
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css"
    rel="stylesheet"
  />
  <link
    href="/static/lib/owlcarousel/assets/owl.carousel.min.css"
    rel="stylesheet"
  />
  <link
    href="/static/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css"
    rel="stylesheet"
  />
  <link href="/static/css/bootstrap.min.css" rel="stylesheet" />
  <link href="/static/css/style.css" rel="stylesheet" />
  {/* Navbar */}
  <div id="navbar" className="container-fluid sticky-top bg-white shadow-sm">
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
        <a href="#" className="navbar-brand">
          <h1 className="m-0 text-uppercase text-primary">
            <i className="fa fa-clinic-medical me-2" />
            CareConnect
          </h1>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <a href="#" className="nav-item nav-link active">
              Home
            </a>
            <a href="#aboutdiv" className="nav-item nav-link">
              About
            </a>
            <a href="#appointdiv" className="nav-item nav-link">
              Appointment
            </a>
            <a href="#testdiv" className="nav-item nav-link">
              Testimonial
            </a>
            <a href="#blogdiv" className="nav-item nav-link">
              Blog Posts
            </a>
            <div
              className="nav-item nav-link"
              id="welcomeview"
              style={{ display: "none" }}
            >
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#SigninModal"
              >
                Sign In
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#SignupModal"
              >
                Sign Up
              </button>
            </div>
            <div
              className="modal fade"
              id="SigninModal"
              tabIndex={-1}
              aria-labelledby="SigninLabel"
              aria-hidden="true"
              data-backdrop="false"
            >
              <div className="modal-dialog">
                <div className="modal-content" style={{ color: "#13C5DD" }}>
                  <div className="modal-header">
                    <h4 className="modal-title w-100 font-weight-bold">
                      Sign In
                    </h4>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <form
                    id="signinform"
                    onsubmit="signinvalidation(); return false;"
                  >
                    <div className="modal-body">
                      <div className="md-form mb-5">
                        <i className="fas fa-envelope prefix grey-text" />
                        <input
                          type="email"
                          id="siemail"
                          className="form-control validate"
                        />
                        <label
                          data-bs-error="wrong"
                          data-bs-success="right"
                          htmlFor="siemail"
                        >
                          Email
                        </label>
                      </div>
                      <div className="md-form mb-4">
                        <i className="fas fa-lock prefix grey-text" />
                        <input
                          type="password"
                          id="sipass"
                          className="form-control validate"
                        />
                        <label
                          data-bs-error="wrong"
                          data-bs-success="right"
                          htmlFor="sipass"
                        >
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="modal-footer  justify-content-center">
                      <button
                        type="submit"
                        id="signinbtn"
                        value="save"
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  <p
                    id="welcomemessagesi"
                    className="alert alert-info"
                    role="alert"
                    style={{ display: "none" }}
                  ></p>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="SignupModal"
              tabIndex={-1}
              aria-labelledby="SignupLabel"
              aria-hidden="true"
              data-backdrop="false"
            >
              <div className="modal-dialog">
                <div className="modal-content" style={{ color: "#13C5DD" }}>
                  <div className="modal-header">
                    <h4 className="modal-title w-100 font-weight-bold">
                      Sign Up
                    </h4>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <form
                    id="signupform"
                    onsubmit="signupvalidation(); return false;"
                  >
                    <div className="modal-body">
                      <div className="md-form mb-5">
                        <i className="fas fa-envelope prefix grey-text" />
                        <input
                          type="email"
                          id="suemail"
                          className="form-control validate"
                        />
                        <label
                          data-bs-error="wrong"
                          data-bs-success="right"
                          htmlFor="suemail"
                        >
                          Email
                        </label>
                      </div>
                      <div className="md-form mb-4">
                        <i className="fas fa-user prefix grey-text" />
                        <input
                          type="text"
                          id="suuser"
                          className="form-control validate"
                        />
                        <label
                          data-bs-error="wrong"
                          data-bs-success="right"
                          htmlFor="suuser"
                        >
                          Username
                        </label>
                      </div>
                      <div className="md-form mb-4">
                        <i className="fas fa-phone prefix grey-text" />
                        <input
                          type="tel"
                          id="sutel"
                          className="form-control validate"
                        />
                        <label
                          data-bs-error="wrong"
                          data-bs-success="right"
                          htmlFor="sutel"
                        >
                          Phone number
                        </label>
                      </div>
                      <div className="md-form mb-4">
                        <i className="fas fa-lock prefix grey-text" />
                        <input
                          type="password"
                          id="supass"
                          className="form-control validate"
                        />
                        <label
                          data-bs-error="wrong"
                          data-bs-success="right"
                          htmlFor="supass"
                        >
                          New Password
                        </label>
                      </div>
                      <div className="md-form mb-4">
                        <i className="fas fa-lock prefix grey-text" />
                        <input
                          type="password"
                          id="suconf"
                          className="form-control validate"
                        />
                        <label
                          data-bs-error="wrong"
                          data-bs-success="right"
                          htmlFor="suconf"
                        >
                          Confirm Password
                        </label>
                      </div>
                      <div className="modal-footer  justify-content-center">
                        <button
                          type="submit"
                          id="signupbtn"
                          value="save"
                          className="btn btn-primary"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                  <p
                    id="welcomemessagesu"
                    className="alert alert-info"
                    role="alert"
                    style={{ display: "none" }}
                  ></p>
                </div>
              </div>
            </div>
            <div
              id="profileview"
              className="nav-item nav-link"
              style={{ display: "none" }}
            >
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#AccountModal"
              >
                Account
              </button>
              <button
                type="button"
                onclick="signout();"
                className="btn btn-primary"
                data-bs-toggle="modal"
              >
                Sign Out
              </button>
            </div>
            <div
              className="modal fade"
              id="AccountModal"
              tabIndex={-1}
              aria-labelledby="AccountLabel"
              aria-hidden="true"
              data-backdrop="false"
            >
              <div className="modal-dialog">
                <div className="modal-content" style={{ color: "#13C5DD" }}>
                  <div className="modal-header">
                    <h4 className="modal-title w-100 font-weight-bold">
                      My Account
                    </h4>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <form
                    id="changepassform"
                    onsubmit="changepass(); return false;"
                  >
                    <div className="modal-body">
                      <div>
                        <div className="md-form mb-4">
                          <i className="fas fa-lock prefix grey-text" />
                          <input
                            type="password"
                            id="oldpass"
                            className="form-control validate"
                          />
                          <label
                            data-bs-error="wrong"
                            data-bs-success="right"
                            htmlFor="oldpass"
                          >
                            Old Password
                          </label>
                        </div>
                        <div className="md-form mb-4">
                          <i className="fas fa-lock prefix grey-text" />
                          <input
                            type="password"
                            id="newpass"
                            className="form-control validate"
                          />
                          <label
                            data-bs-error="wrong"
                            data-bs-success="right"
                            htmlFor="newpass"
                          >
                            New Password
                          </label>
                        </div>
                        <div className="md-form mb-4">
                          <i className="fas fa-lock prefix grey-text" />
                          <input
                            type="password"
                            id="confpass"
                            className="form-control validate"
                          />
                          <label
                            data-bs-error="wrong"
                            data-bs-success="right"
                            htmlFor="confpass"
                          >
                            Confirm Password
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer  justify-content-center">
                      <button
                        type="submit"
                        id="changepassbtn"
                        value="save"
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  <p
                    id="accountmessage"
                    className="alert alert-info"
                    role="alert"
                    style={{ display: "none" }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
  {/* Navbar */}
  {/* Hero */}
  <div className="container-fluid bg-primary py-5 mb-5 hero-header">
    <div className="container py-5">
      <div className="row justify-content-start">
        <div className="col-lg-8 text-center text-lg-start">
          <p
            id="signoutmsg"
            className="alert alert-info"
            role="alert"
            style={{
              width: "40%",
              textAlign: "center !important",
              display: "none",
              left: "55rem",
              top: 20
            }}
          />
          <h5
            className="d-inline-block text-primary text-uppercase border-bottom border-5"
            style={{ borderColor: "rgba(256, 256, 256, .3) !important" }}
          >
            Welcome To CareConnect
          </h5>
          <h1 className="display-1 text-white mb-md-4">
            Find The Best Healthcare Near You
          </h1>
          <div className="pt-2">
            <button
              id="btnsearch"
              onclick="showdiv()"
              className="btn btn-light rounded-pill py-md-3 px-md-5 mx-2"
            >
              Search
            </button>
            <a
              href="#appointdiv"
              className="btn btn-light rounded-pill py-md-3 px-md-5 mx-2"
            >
              Book Appointment
            </a>
          </div>
          <div
            className="mx-auto"
            style={{ width: "100%", maxWidth: 600, display: "none" }}
            id="searchtab"
          >
            <form onsubmit="search(); return false;">
              <div className="input-group" style={{ left: "-60px", top: 30 }}>
                <select
                  className="form-control border-primary w-25"
                  style={{ height: 60, backgroundColor: "#fff" }}
                >
                  <option selected="">Hospital</option>
                  {/*<option value="1">Department</option>
                          <option value="2">Physician</option> */}
                </select>
                <input
                  id="loc"
                  type="text"
                  className="form-control border-primary w-50"
                  placeholder="Keyword"
                  required=""
                />
                <button
                  type="submit"
                  value="save"
                  className="btn btn-dark border-0 w-25"
                >
                  Search
                </button>
                <button
                  onclick="getLocation()"
                  style={{ position: "absolute", left: 610 }}
                  className="btn btn-dark border-0 w-25"
                >
                  Search by your location
                </button>
                <div
                  id="scrollmsg"
                  className="bg-white text-center rounded p-3"
                  style={{
                    position: "relative",
                    left: 220,
                    top: 40,
                    display: "none"
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Hero */}
  {/* Search */}
  <div
    className="container-fluid py-5"
    id="searchdiv"
    style={{ display: "none" }}
  >
    <div className="container">
      <div className="row gx-5">
        <div
          id="aboutmsg"
          className="bg-white text-center rounded p-5"
          style={{ display: "none" }}
        />
        <div id="searchmsg" className="bg-white text-center rounded p-5" />
      </div>
    </div>
  </div>
  {/* Search */}
  {/* About */}
  <div className="container-fluid py-5" id="aboutdiv">
    <div className="container">
      <div className="row gx-5">
        <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: 500 }}>
          <div className="position-relative h-100">
            <img
              className="position-absolute w-100 h-100 rounded"
              src="/static/img/about2.jpg"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="col-lg-7">
          <div className="mb-4">
            <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
              About Us
            </h5>
          </div>
          <p>
            Welcome to our Hospital Finder website! We provide a convenient way
            to search for hospitals near you and book appointments with doctors.
            Our mission is to help you find the best healthcare options
            available in your area. We are committed to providing a seamless and
            user-friendly experience for all our visitors. Thank you for
            choosing us as your trusted healthcare partner.
          </p>
          <div className="row g-3 pt-3">
            <div className="col-sm-3 col-6">
              <div className="bg-light text-center rounded-circle py-4">
                <i className="fa fa-3x fa-user-md text-primary mb-3" />
                <h6 className="mb-0">
                  Quality
                  <small className="d-block text-primary">Healthcare</small>
                </h6>
              </div>
            </div>
            <div className="col-sm-3 col-6">
              <div className="bg-light text-center rounded-circle py-4">
                <i className="fa fa-3x fa-procedures text-primary mb-3" />
                <h6 className="mb-0">
                  Trustworthy
                  <small className="d-block text-primary">Services</small>
                </h6>
              </div>
            </div>
            <div className="col-sm-3 col-6">
              <div className="bg-light text-center rounded-circle py-4">
                <i className="fa fa-3x fa-microscope text-primary mb-3" />
                <h6 className="mb-0">
                  Appointment
                  <small className="d-block text-primary">Scheduling</small>
                </h6>
              </div>
            </div>
            <div className="col-sm-3 col-6">
              <div className="bg-light text-center rounded-circle py-4">
                <i className="fa fa-3x fa-ambulance text-primary mb-3" />
                <h6 className="mb-0">
                  Easy<small className="d-block text-primary">Navigation</small>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* About */}
  {/* Appointment */}
  <div className="container-fluid bg-primary my-5 py-5" id="appointdiv">
    <div className="container py-5">
      <div className="row gx-5">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="mb-4">
            <h5 className="d-inline-block text-white text-uppercase border-bottom border-5">
              Appointment
            </h5>
            <h2 className="display-4">
              Book Your Next Appointment with Ease: Schedule Your Visit Today!
            </h2>
          </div>
          <p className="text-white mb-5">
            Our website provides a hassle-free appointment booking system,
            allowing you to easily book appointments with your desired hospital
            and doctor. With just a few clicks, you can select the date, time,
            and doctor of your choice, and receive a confirmation email with all
            the necessary details. We understand the importance of timely
            healthcare services and strive to make the process as seamless as
            possible for our users. Book your next appointment with us and
            experience the convenience of our platform.
          </p>
        </div>
        <div className="col-lg-6">
          <div className="bg-white text-center rounded p-5">
            <h1 className="mb-4">Book An Appointment</h1>
            <form
              autoComplete="off"
              id="appointform"
              onsubmit="bookappointment(); return false;"
            >
              <div className="row g-3">
                <div className="col-12 col-sm-6">
                  <div className="time" id="inp" data-target-input="nearest">
                    <input
                      id="hospinput"
                      type="text"
                      className="autocomplete form-control bg-light border-0"
                      placeholder="Hospital Name"
                      data-target="#hospinput"
                      style={{ height: 55 }}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <select
                    id="depdropdown"
                    onchange="doctordrop();"
                    className="form-select bg-light border-0"
                    style={{ height: 55 }}
                  >
                    <option selected="">Choose Department</option>
                  </select>
                </div>
                <div className="col-12 col-sm-6">
                  <select
                    id="doctdropdown"
                    className="form-select bg-light border-0"
                    style={{ height: 55 }}
                  >
                    <option selected="">Select Doctor</option>
                  </select>
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    id="inpname"
                    type="text"
                    className="form-control bg-light border-0"
                    placeholder="Your Name"
                    style={{ height: 55 }}
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    id="inpmail"
                    type="email"
                    className="form-control bg-light border-0"
                    placeholder="Your Email"
                    style={{ height: 55 }}
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <div
                    className="date"
                    id="datetime"
                    data-target-input="nearest"
                    style={{ position: "relative" }}
                  >
                    <input
                      id="inpdatetime"
                      type="datetime-local"
                      className="form-control bg-light border-0"
                      placeholder="Date & Time"
                      data-target="#inpdatetime"
                      style={{ height: 55 }}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-primary w-100 py-3"
                    type="submit"
                    value="save"
                  >
                    Make An Appointment
                  </button>
                </div>
              </div>
            </form>
            <p
              id="appointmsg"
              className="alert alert-info"
              role="alert"
              style={{ display: "none" }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Appointment */}
  {/* Testimonial */}
  <div className="container-fluid py-5" id="testdiv">
    <div className="container">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: 500 }}>
        <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
          Testimonial
        </h5>
        <h1 className="display-4">Patients Say About Our Services</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="testimonial-grid">
            <div className="testimonial-item">
              <img
                className="img-fluid rounded-circle mx-auto"
                src="/static/img/peer-review-icon-2888794__340.webp"
                alt=""
              />
              <p className="fs-4 fw-normal">
                I had to find a hospital for my grandmother and came across this
                website. It made the process so much easier and less stressful.
                We were able to find a great hospital close by with excellent
                reviews. Thank you!
              </p>
              <h3>Damon</h3>
              <h6 className="fw-normal text-primary mb-3">Registered User</h6>
            </div>
            <div className="testimonial-item">
              <img
                className="img-fluid rounded-circle mx-auto"
                src="/static/img/peer-review-icon-2888794__340.webp"
                alt=""
              />
              <p className="fs-4 fw-normal">
                This website was a lifesaver when I needed to find an emergency
                room. The map feature was incredibly helpful in finding a
                hospital that was close by and had good ratings. I would
                definitely recommend this site to anyone in need of finding a
                hospital quickly.
              </p>
              <h3>Elsa</h3>
              <h6 className="fw-normal text-primary mb-3">Registered User</h6>
            </div>
            <div className="testimonial-item">
              <img
                className="img-fluid rounded-circle mx-auto"
                src="/static/img/peer-review-icon-2888794__340.webp"
                alt=""
              />
              <p className="fs-4 fw-normal">
                I've been using this hospital finder website for a while now,
                and I must say, it's one of the most reliable sources out there.
                It's helped me find the best hospitals in town for my regular
                checkups and medical treatments. Highly recommended!
              </p>
              <h3>John</h3>
              <h6 className="fw-normal text-primary mb-3">Registered User</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Testimonial */}
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n    .testimonial-grid {\n        display: grid;\n        grid-template-columns: repeat(3, 1fr);\n        grid-gap: 30px;\n    }\n\n    .testimonial-item {\n        text-align: center;\n    }\n"
    }}
  />
  {/* Blog */}
  <div className="container-fluid py-5" id="blogdiv">
    <div className="container">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: 500 }}>
        <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
          Blog Post
        </h5>
        <h1 className="display-4">
          Insights and Inspiration: Discover Our Latest Medical Blog Posts
        </h1>
      </div>
      <div className="row g-5">
        <div className="col-xl-4 col-lg-6">
          <div className="bg-light rounded overflow-hidden">
            <img
              className="img-fluid w-100"
              src="/static/img/Unknown-3"
              alt=""
            />
            <div className="p-4">
              <a
                className="h3 d-block mb-3"
                href="https://www.stanfordchildrens.org/en/topic/default?id=why-childhood-immunizations-are-important-1-4510"
              >
                Why Childhood Immunizations Are Important
              </a>
              <p className="m-0">
                Vaccinations protect children against serious illnesses and
                diseases, and they are an important part of ensuring their
                overall health and well-being.
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6">
          <div className="bg-light rounded overflow-hidden">
            <img
              className="img-fluid w-100"
              src="/static/img/Unknown-2"
              alt=""
            />
            <div className="p-4">
              <a
                className="h3 d-block mb-3"
                href="https://www.mayoclinic.org/diseases-conditions/mental-illness/in-depth/mental-health/art-20046477"
              >
                Mental health: Overcoming the stigma of mental illness
              </a>
              <p className="m-0">
                Mental health stigma can prevent individuals from seeking help
                and lead to discrimination. Learn how to recognize and overcome
                mental health stigma.
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6">
          <div className="bg-light rounded overflow-hidden">
            <img
              className="img-fluid w-100"
              src="/static/img/bloga.jpeg"
              alt=""
            />
            <div className="p-4">
              <a
                className="h3 d-block mb-3"
                href="https://www.hopkinsmedicine.org/health/wellness-and-prevention/7-heart-benefits-of-exercise"
              >
                7 Heart Benefits of Exercise
              </a>
              <p className="m-0">
                Regular exercise can improve heart health by reducing the risk
                of heart disease, stroke, and other related conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Blog */}
</>
