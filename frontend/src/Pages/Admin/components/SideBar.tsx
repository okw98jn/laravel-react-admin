import React, { useRef } from 'react'

import { SideBarInfo } from '../../../consts/AdminConst';
import { Link } from 'react-router-dom';
import SideBarList from './molecules/SideBarList';

const SideBar: React.FC = React.memo(() => {
    const ref = useRef<HTMLButtonElement>(null);
    const handleClick = () => {
        if (ref.current) {
            ref.current.click();
        }
    };
    return (
        <>
            <button type="button" onMouseEnter={handleClick} ref={ref} className="text-gray-500 hover:text-gray-600" data-hs-overlay="#docs-sidebar" aria-controls="docs-sidebar" aria-label="Toggle navigation">
                <svg className="w-7 h-7" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </button>
            <div id="docs-sidebar" onMouseLeave={handleClick} className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 fixed transform hidden top-0 left-0 bottom-0 z-[60] w-64 bg-gray-100 border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y">
                <div className="px-6">
                    <Link className="flex-none text-xl font-semibold hover:text-slate-700" aria-label="Brand" to={'/admin'}>Laravel + React</Link>
                </div>
                <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap">
                    <ul className="space-y-1.5">
                        {SideBarInfo.map((item) => (
                            <SideBarList key={item.key} href={item.href} svg={item.svg} title={item.title} subInfo={item.subInfo} />
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
})

export default SideBar