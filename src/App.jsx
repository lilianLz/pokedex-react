import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import CollectionPage from "./pages/CollectionPage"
import ContactPage from "./pages/ContactPage"
import HomePage from "./pages/HomePage"

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coleccion" element={<CollectionPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </HashRouter>
  )
}
