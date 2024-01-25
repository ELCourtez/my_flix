 import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <nav className="navbar is-fixed-top block is-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <Link className="navbar-item is-size-5 has-text-weight-bold has-text-danger" href="/">
            Personnal FLIX
          </Link>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbar" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item">
              Films
            </a>

            <a class="navbar-item">
              Séries
            </a>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                Catégories
              </a>
              <div class="navbar-dropdown">
                <a class="navbar-item">
                  Action
                </a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </>
  )
}