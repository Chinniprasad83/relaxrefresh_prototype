
import React from 'react'
import './styles/globals.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import LocationFinderPage from './components/LocationFinderPage'
import DetailsPage from './components/DetailsPage'
import InterestPage from './components/InterestPage';
import QueriesPage from './components/QueriesPage';

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
  <Route path="/app" element={<LocationFinderPage />} />
  <Route path="/details" element={<DetailsPage />} />
  <Route path="/interest" element={<InterestPage />} />
  <Route path="/queries" element={<QueriesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
