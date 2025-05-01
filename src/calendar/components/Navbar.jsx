import { useAuthStore } from "../../hooks"



export const Navbar = () => {

  const { startLogout, user } = useAuthStore();
  const handleLogout = () => {
    startLogout();
  }
  return (
    <>
      <nav className=" border border-bottom border-secondary bg-dark text-white">
        <div className="w-100 d-flex  align-items-center justify-content-between  p-3 ">
          <div className="ps-4 d-flex justify-content-between align-items-center">
            <ion-icon name="calendar-outline" ></ion-icon>
            <span className="fs-3 mt-2 ms-3">{user.name}</span>
          </div>
          <button
            onClick={handleLogout}
            type="button"
            className="btn btn-outline-danger d-flex align-baseline"
            id="user-menu-button" >
            <ion-icon name="log-out-outline" ></ion-icon>
            <span className=" ">
              Salir
            </span>
          </button>
        </div>

      </nav>

    </>
  )
}