import React from 'react'
import AdminPanel from './Dashboard/AdminDash'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../Layout/MainLayout'
import ProductActions from './ProductsCRUD/ProductsCRUD'
import AdminLayout from './Layout/adminLayout'
import ProductData from './Dashboard/ProductData'
import ManageTools from './Tools/ManageTools'
import CreateBusinessCategory from './Tools/CreateBusinessCategory'
import CreateCategory from './Tools/CreateCatefory'
import Main from './OrderCRUD/Main'

export default function AdminRoutes() {
  return (
    <>
     <Routes>

        <Route
          path="/"
          element={
            <AdminLayout>

              <ProductData />
            </AdminLayout>
       
          }
          />
        <Route
          path="/users"
          element={
                      <AdminLayout>
              {/* <AdminPanel /> */}
                   </AdminLayout>
          }
          />
        <Route
          path="/products"
          element={
                      <AdminLayout>
              <ProductActions />
                   </AdminLayout>
          }
          />
         
        <Route
          path="/manage-tools"
          element={
                      <AdminLayout>
              <ManageTools />
                   </AdminLayout>
          }
          />
        <Route
          path="/businessCategory"
          element={
                      <AdminLayout>
              <CreateBusinessCategory />
                   </AdminLayout>
          }
          />
        <Route
          path="/tools"
          element={
                      <AdminLayout>
              <CreateCategory />
                   </AdminLayout>
          }
          />
        <Route
          path="/orders"
          element={
                      <AdminLayout>
              <Main />
                   </AdminLayout>
          }
          />
          </Routes>
    </>
  )
}
