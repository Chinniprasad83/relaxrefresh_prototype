import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string
}

export default function TextSearch({ className, ...rest }: Props): JSX.Element {
  return (
    <div className={className}>
      <span aria-hidden className="searchIcon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <input
        {...rest}
        type={rest.type ?? 'search'}
        className="innerInput"
      />
    </div>
  )
}
