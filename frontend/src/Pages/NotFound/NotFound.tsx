import React from "react";

const NotFound: React.FC = React.memo(() => {
    return (
        <div className="max-w-[50rem] flex flex-col mx-auto w-full h-full">
            <div className="text-center py-10 px-4 sm:px-6 lg:px-8 mt-40">
                <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white">404</h1>
                <h1 className="block text-2xl font-bold text-white"></h1>
                <p className="mt-3 text-gray-600 dark:text-gray-400">Oops, something went wrong.</p>
                <p className="text-gray-600 dark:text-gray-400">Sorry, we couldn't find your page.</p>
            </div>
            <footer className="mt-auto text-center py-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-sm text-gray-500">© All Rights Reserved. 2023.</p>
                </div>
            </footer>
        </div>
    )
})

export default NotFound