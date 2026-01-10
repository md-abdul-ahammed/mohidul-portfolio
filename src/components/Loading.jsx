import React from 'react'

const Loading = () => {
    return (
        <div className="md:mx-2">
            <div className="md:max-w-[1444px] px-4 mx-auto pt-12 pb-10 md:pt-[132px] md:pb-32 border-y md:border-x border-[#D3D8DF]">
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-bars loading-xl"></span>

                </div>
            </div>
        </div>
    )
}

export default Loading
