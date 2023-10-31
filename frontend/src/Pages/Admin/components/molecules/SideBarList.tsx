import React from 'react'
import { useLocation, Link } from 'react-router-dom';

import Icon from '../atoms/Icon';

type SideBarProps = {
    key: number;
    href: string;
    svg: React.ReactNode;
    title: string;
}

type SideBarInfoProps = SideBarProps & {
    subInfo?: SideBarProps[];
}

const SideBarList: React.FC<SideBarInfoProps> = React.memo(({ href, svg, title, subInfo }) => {
    const pathName: string = useLocation().pathname;
    const isActivePath = pathName.split('/')[2] === href.split('/')[2];
    return subInfo?.length === 0 ? (
        <li>
            <Link className={"flex items-center gap-x-3.5 py-2 px-2.5 hover:bg-gray-200 hover:text-slate-700 text-sm text-slate-700 rounded-md" + ' ' + (isActivePath && 'bg-gray-200')} to={href}>
                <Icon svg={svg} color='' />
                {title}
            </Link>
        </li>
    ) : (
        <li className="hs-accordion">
            <Link className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hover:bg-gray-200 hover:text-slate-700 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md" to={'#'}>
                <Icon svg={svg} color='' />
                {title}
                <svg className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                </svg>
                <svg className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                </svg>
            </Link>
            <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                <ul className="pt-2 pl-3">
                    {subInfo?.map((item) => (
                        <li key={item.key}>
                            <Link className={"flex items-center gap-x-2 py-2 px-1 text-sm text-slate-700 rounded-md hover:bg-gray-200 hover:text-slate-700" + ' ' + (isActivePath && 'bg-gray-200')} to={item.href}>
                                <Icon svg={item.svg} color='' />
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    )
})

export default SideBarList