import React from 'react'
import Icon from '../../Admin/components/atoms/Icon';

type Props = {
    text: string;
    svg?: React.ReactNode;
}
const GrayBtn: React.FC<Props> = React.memo(({ text, svg = null }) => {
    return (
        <button className="w-20 py-2 px-3 flex items-center justify-center rounded-md border-transparent font-semibold bg-gray-500 text-white hover:bg-gray-600 transition duration-300 text-sm">
            <p className='mr-1'><Icon svg={svg} color='' /></p>
            <p>{text}</p>
        </button>
    )
})

export default GrayBtn