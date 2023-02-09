const FooterComp = () => {
  return (
    <footer>
      <div className="bg-dark">
        <div className="container">
          <div className="row justify-content-beetwen bg-dark p-5">
            <div className="col col-md-6">
              <h1 className="text-light">Mar Fashion</h1>
              <div>
                <p className="text-light">Lets shopping</p>
                <p className="text-light">Dijamin murah</p>
              </div>
              <p className="text-light">© Copyright 2023 Designed by someone</p>
            </div>
            <div className="col-md-3 d-none d-md-block">
              <h6 className="text-light">Layanan</h6>
              <p className="text-light">Reseller</p>
              <p className="text-light">Artikel</p>
            </div>
            <div className="col d-none d-md-block">
              <h6 className="text-light">Kontak</h6>
              <p className="text-light">+62 878-5035-9488</p>
              <p className="text-light">MarFashion@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComp;