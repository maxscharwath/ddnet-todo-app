import React, { SVGProps } from 'react'

export const AddUserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M15 11h3m0 0h3m-3 0v3m0-3V8m-3 11v-1.25c0-2.071-1.919-3.75-4.286-3.75H7.286C4.919 14 3 15.679 3 17.75V19m9-11a3 3 0 1 1-6 0a3 3 0 0 1 6 0z"></path>
  </svg>
)

export const RemoveUserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M16 11h6m-6 8v-1.25c0-2.071-1.919-3.75-4.286-3.75H8.286C5.919 14 4 15.679 4 17.75V19m9-11a3 3 0 1 1-6 0a3 3 0 0 1 6 0z"></path>
  </svg>
)

export const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path fill="currentColor"
          d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"></path>
  </svg>
)

export const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
  </svg>
)

export const ExclamationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 26 26" {...props}>
    <g fill="none">
      <defs>
        <mask id="pepiconsPopExclamationCircleFilled0">
          <path fill="#fff" d="M0 0h26v26H0z"></path>
          <g fill="#000">
            <path fillRule="evenodd" d="M13 5a2 2 0 0 1 2 2v7a2 2 0 1 1-4 0V7a2 2 0 0 1 2-2Z" clipRule="evenodd"></path>
            <path d="M15 19a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z"></path>
          </g>
        </mask>
      </defs>
      <circle cx="13" cy="13" r="13" fill="currentColor" mask="url(#pepiconsPopExclamationCircleFilled0)"></circle>
    </g>
  </svg>
)

export const SpinnerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <circle cx="4" cy="12" r="3" fill="currentColor">
      <animate id="svgSpinners3DotsFade0" fill="freeze" attributeName="opacity"
               begin="0;svgSpinners3DotsFade1.end-0.25s" dur="0.75s" values="1;.2"></animate>
    </circle>
    <circle cx="12" cy="12" r="3" fill="currentColor" opacity=".4">
      <animate fill="freeze" attributeName="opacity" begin="svgSpinners3DotsFade0.begin+0.15s" dur="0.75s"
               values="1;.2"></animate>
    </circle>
    <circle cx="20" cy="12" r="3" fill="currentColor" opacity=".3">
      <animate id="svgSpinners3DotsFade1" fill="freeze" attributeName="opacity" begin="svgSpinners3DotsFade0.begin+0.3s"
               dur="0.75s" values="1;.2"></animate>
    </circle>
  </svg>
)

export const MenuDotsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" fillRule="evenodd"
          d="M2.25 12a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0ZM5 10.75a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5ZM9.25 12a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0ZM12 10.75a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5Zm7-1.5a2.75 2.75 0 1 0 0 5.5a2.75 2.75 0 0 0 0-5.5ZM17.75 12a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0Z"
          clipRule="evenodd"></path>
  </svg>
)
