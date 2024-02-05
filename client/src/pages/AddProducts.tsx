
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { clearAllProducts, deleteProducts, resetInvoice, updateInvoiceData } from '../redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MdDelete } from 'react-icons/md'
import AddProductForm from '../components/AddProductForm'
import Loader from '../components/Loader'
import { Table } from 'flowbite-react'

const AddProducts: React.FC = () => {
  const { products, totalPrice } = useAppSelector((state) => state.products)
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const invoiceNo = () => {
    const randomId = Math.floor(Math.random() * 1000000);
    return `#LEV${randomId}`
  }

  const saveToDB = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/products/add`, { id: invoiceNo(), products, totalPrice })
      dispatch(updateInvoiceData(data.data))
      dispatch(clearAllProducts());
      alert("product added successfully");
      navigate('/generate-pdf')
    } catch (error) {
      console.log(error);
      //@ts-ignore
      const errorData = error?.response?.data;
      alert(errorData)
      throw error
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    dispatch(resetInvoice())
  }, [])

  return (
    <>
      {
        loading ? <Loader /> :
          <div className='md:w-[95%] h-full border mx-auto bg-white shadow-xl mb-10 p-4 sm:p-8'>
            <div>
              <AddProductForm />
              {
                products.length > 0 &&
                <div className='flex max-lg:flex-col justify-between xl:justify-around'>
                  <div className="w-full lg:w-[75%] xl:w-[65%]  bg-white pb-2.5 pt-6 sm:px-7.5 xl:pb-1">
                    <h4 className="mb-2 text-xl font-semibold text-black">
                      All Products
                    </h4>
                    <div className="overflow-x-auto">
                      <Table striped>
                        <Table.Head className='bg-gray-200' >
                          <Table.HeadCell className='text-start px-2'>Product</Table.HeadCell>
                          <Table.HeadCell className='text-start px-2'>Qty</Table.HeadCell>
                          <Table.HeadCell className='text-start px-2'>Price</Table.HeadCell>
                          <Table.HeadCell className='text-start px-2'>Total</Table.HeadCell>
                          <Table.HeadCell className='text-start px-2'>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                          {
                            products.map(item => {
                              const { id, name, price, qty } = item;
                              return (
                                <Table.Row key={id}>
                                  <Table.Cell className="px-2 font-medium text-gray-800 break-words">
                                    {name}
                                  </Table.Cell>
                                  <Table.Cell className='px-2'>{qty}</Table.Cell>
                                  <Table.Cell className='px-2'>₹ {price}</Table.Cell>
                                  <Table.Cell className='px-2'>₹ {qty * price}</Table.Cell>
                                  <Table.Cell className='px-2'>
                                    <MdDelete className='text-red-500 cursor-pointer' onClick={() => dispatch(deleteProducts(item))} />
                                  </Table.Cell>
                                </Table.Row>
                              )
                            })
                          }
                        </Table.Body>
                      </Table>
                    </div>

                  </div>
                  <div className='w-[20rem] mx-auto xl:w-1/5 lg:mt-14 font-semibold'>
                    <div className='bg-gray_primary p-4 text-black uppercase'>Billing</div>
                    <div className='space-y-4 mt-4'>
                      <div className='px-4 flex justify-between items-center'>
                        <h1>Total Price</h1>
                        <h1> ₹ {totalPrice}</h1>
                      </div>
                      <div className='px-4 flex justify-between items-center'>
                        <h1>GST</h1>
                        <h1>18%</h1>
                      </div>
                      <div className=' border-b px-4 border-t py-2 flex justify-between items-center'>
                        <h1>Final Price</h1>
                        <h1> ₹ {totalPrice + (totalPrice * 0.18)}</h1>
                      </div>
                    </div>
                    <div className='w-44 cursor-pointer float-end my-6 text-center py-2 font-semibold text-white bg-green_primary rounded-md capitalize' onClick={saveToDB}>
                      Confirm
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
      }
    </>
  )
}

export default AddProducts
