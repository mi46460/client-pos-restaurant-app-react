interface props{
    color: string
}

export const HomeIcon = (props: props) => {
    return(
        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.23 0.787988C8.5 -0.221012 10.28 -0.261012 11.589 0.667988L11.75 0.787988L17.839 5.65899C18.509 6.17799 18.92 6.94899 18.99 7.78799L19 7.98899V16.098C19 18.188 17.349 19.888 15.28 19.998H13.29C12.339 19.979 11.57 19.239 11.5 18.309L11.49 18.168V15.309C11.49 14.998 11.259 14.739 10.95 14.688L10.86 14.678H8.189C7.87 14.688 7.61 14.918 7.57 15.218L7.56 15.309V18.159C7.56 18.218 7.549 18.288 7.54 18.338L7.53 18.359L7.519 18.428C7.4 19.279 6.7 19.928 5.83 19.989L5.7 19.998H3.91C1.82 19.998 0.11 18.359 0 16.298V7.98899C0.009 7.13799 0.38 6.34799 1 5.79799L7.23 0.787988ZM10.88 1.87799C10.12 1.26799 9.04 1.23899 8.24 1.76799L8.089 1.87799L2.009 6.77899C1.66 7.03799 1.45 7.42799 1.4 7.83799L1.389 7.99799V16.098C1.389 17.428 2.429 18.518 3.75 18.598H5.7C5.92 18.598 6.11 18.449 6.139 18.239L6.16 18.059L6.17 18.008V15.309C6.17 14.239 6.99 13.369 8.04 13.288H10.86C11.929 13.288 12.799 14.109 12.88 15.159V18.168C12.88 18.378 13.03 18.559 13.23 18.598H15.089C16.429 18.598 17.519 17.569 17.599 16.258L17.61 16.098V7.99799C17.599 7.56899 17.42 7.16799 17.11 6.86899L16.98 6.75799L10.88 1.87799Z" 
        fill={props.color}/>
        </svg>
    )
}