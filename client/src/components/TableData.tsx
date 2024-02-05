import React from 'react'
import { tableDataType } from '../types'

const TableData: React.FC<tableDataType> = ({ slNo, product, price, qty, total }) => {
    return (
        <>
            <div className="grid grid-cols-12 border-b border-stroke py-3.5 pl-5 pr-6" key={slNo}>
                <div className="col-span-2">
                    <p className="font-medium">{slNo}</p>
                </div>

                <div className="col-span-4">
                    <p className="font-medium">{product}</p>
                </div>

                <div className="col-span-2">
                    <p className="font-medium">{qty}</p>
                </div>

                <div className="col-span-2">
                    <p className="font-medium">{price}</p>
                </div>

                <div className="col-span-2">
                    <p className="text-right font-medium">{total}</p>
                </div>
            </div>
        </>
    )
}

export default TableData
