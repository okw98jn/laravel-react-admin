import React from "react";
import TableTh from "../molecules/TableTh";

type Props = {
    trList: string[];
}

const Thead: React.FC<Props> = React.memo(({ trList }) => {
    return (
        <thead className="bg-gray-50">
            <tr>
                {trList.map((trInfo) => {
                    return (
                        <TableTh title={trInfo} key={trInfo} />
                    )
                })}
            </tr>
        </thead>
    )
})

export default Thead