import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/sideBar/SideBar";
import Navbar from "../components/common/navbar/Navbar";

export const Layaud = () => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh", background:"#E8E8E8"}}>
      {/* Header */}
      <header className="flex-grow-1 d-flex flex-column sticky-top z-3"
      style={{marginLeft:"250px"}}> 
        <Navbar/>
      </header>

      {/* Layout principal */}
      <div className="d-flex" >
        {/* Barra lateral */}
        <aside
          className="bg-light"
          style={{
            width: "250px", // Ancho fijo de la barra lateral
            height: "calc(100vh - 5rem)", // Altura ajustada al espacio disponible debajo del header
            position: "sticky",
            top: "5rem", // Alineada justo debajo del header
            overflowY: "auto", // Scroll vertical independiente
          }}
        >
          <Sidebar/>
        </aside>

        {/* Contenido principal */}
        <main
          className="flex-grow-1 "
          style={{
            padding: "20px",
            background: 'linear-gradient(135deg, #f6f8ff 0%, #f0f4ff 100%)'
          }}
        >
          <Outlet/>
        </main>
      </div>

      {/* Footer */}
      {/* <footer
        className="bg-light text-black w-100"
        style={{
          padding: "3px 0",
          marginTop: "auto",
          position: "fixed",
          bottom: 0,
          zIndex: 5,
        }}
      >
        <div className="container text-center">
          <p>&copy; 2024 Hospital el PEPE</p>
        </div>
      </footer> */}
    </div>
  );
};