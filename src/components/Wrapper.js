import React from 'react'

export default function Wrapper({ children }) {
  return <div className="d-flex flex-column min-vh-100">{children}</div>
}
