import React from 'react'

function Loader() {
    return (
        <>
            <div className="text-center py-20 h-screen">
                <div className="flex items-center justify-center h-50 w-screen bg-white">
                <div className="w-20 h-20 border-8 border-blue-500 border-t-transparent rounded-full animate-spin">

                </div>
            </div>
            </div>
        </>
    )
}

export default Loader;