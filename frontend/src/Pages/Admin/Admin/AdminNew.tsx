import React from "react";

const AdminNew: React.FC = React.memo(() => {
    return (
        <>
            <div className="px-12 py-4">
                <div className="mb-8">
                    <p className="text-xl font-semibold text-gray-700">
                        管理者追加
                    </p>
                </div>
                <div className="grid grid-cols-12 gap-4 sm:gap-6">
                    <div className="col-span-3">
                        <label className="inline-block  text-gray-800 mt-2.5">名前</label>
                    </div>
                    <div className="col-span-9">
                        <input className="border-gray-400 py-2 px-3 pr-11 block w-3/4 shadow-sm text-sm rounded-lg" />
                    </div>
                </div>
            </div>
        </>
    )
})

export default AdminNew