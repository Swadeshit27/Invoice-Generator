import React, { useState } from 'react'
import axios from 'axios';
import TableData from '../components/TableData';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { resetInvoice } from '../redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';


const GeneratePDF: React.FC = () => {
  const { user, invoice } = useAppSelector(store => store.products);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const downloadInvoice = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/products/generate`, { invoice }, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      dispatch(resetInvoice());
      navigate('/');
    } catch (err) {
      alert("something went wrong")
      throw err
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      {
        loading ? <Loader /> :
          <div className='w-[95%] h-auto border mx-auto bg-white shadow-xl p-4 sm:p-8 mb-10 pt-10 sm:pt-24'>
            <h1 className='text-2xl font-semibold text-center capitalize text-black mb-6'>INVOICE</h1>
            <div className="mb-10 flex flex-wrap items-center justify-end gap-3.5">
              <button onClick={downloadInvoice} className="inline-flex items-center gap-2.5 rounded bg-blue_primary px-4 py-[7px] font-medium text-white hover:bg-opacity-90">
                <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.3419 4.66885L11.5204 0.843848C11.2988 0.618848 10.9942 0.506348 10.6896 0.506348H4.04344C3.10191 0.506348 2.29883 1.29385 2.29883 2.27822V8.8876C2.29883 9.2251 2.57575 9.53447 2.93575 9.53447C3.29575 9.53447 3.57267 9.25322 3.57267 8.8876V2.2501C3.57267 1.96885 3.79421 1.74385 4.07114 1.74385H10.3296V5.34385C10.3296 5.68135 10.6065 5.99072 10.9665 5.99072H14.4834V8.71885C14.4834 9.05635 14.7604 9.36572 15.1204 9.36572C15.4804 9.36572 15.7573 9.08447 15.7573 8.71885V5.5126C15.6742 5.20322 15.5634 4.89385 15.3419 4.66885ZM11.5481 2.64385L13.625 4.7251H11.5481V2.64385Z" fill=""></path>
                  <path d="M15.0653 14.5688C14.733 14.5688 14.4284 14.8501 14.4284 15.2157V15.7782C14.4284 16.0595 14.2069 16.2845 13.9299 16.2845H4.04379C3.76687 16.2845 3.54533 16.0595 3.54533 15.7782V15.3845C3.54533 15.047 3.26841 14.7376 2.90841 14.7376C2.54841 14.7376 2.27148 15.0188 2.27148 15.3845V15.7501C2.27148 16.7063 3.04687 17.522 4.0161 17.522H13.9023C14.8438 17.522 15.6469 16.7345 15.6469 15.7501V15.1876C15.6746 14.8501 15.3976 14.5688 15.0653 14.5688Z" fill=""></path>
                  <path d="M12.6014 10.6875H14.1245C14.4568 10.6875 14.7614 10.4063 14.7614 10.0407C14.7614 9.67505 14.4845 9.3938 14.1245 9.3938H12.6014C11.8537 9.3938 11.2168 10.0407 11.2168 10.8V14.2032C11.2168 14.5407 11.4937 14.85 11.8537 14.85C12.2137 14.85 12.4906 14.5688 12.4906 14.2032V12.4313H13.543C13.8753 12.4313 14.1799 12.15 14.1799 11.7844C14.1799 11.4188 13.903 11.1375 13.543 11.1375H12.463V10.7719C12.463 10.7719 12.5183 10.6875 12.6014 10.6875Z" fill=""></path>
                  <path d="M8.8346 14.8782C9.80383 14.8782 10.6069 14.0626 10.6069 13.0501V11.1938C10.6069 10.1813 9.80383 9.36572 8.8346 9.36572H7.56075C7.22844 9.36572 6.92383 9.64697 6.92383 10.0126V14.2595C6.92383 14.597 7.20075 14.9063 7.56075 14.9063H8.8346V14.8782ZM8.16998 10.6313H8.8069C9.08383 10.6313 9.33306 10.8845 9.33306 11.1938V13.0501C9.33306 13.3595 9.08383 13.6126 8.8069 13.6126H8.16998V10.6313Z" fill=""></path>
                  <path d="M3.87716 14.8782C4.20947 14.8782 4.51408 14.5969 4.51408 14.2313V12.5438H5.871C6.20331 12.5438 6.50793 12.2625 6.50793 11.8969V10.0407C6.50793 9.70317 6.231 9.3938 5.871 9.3938H3.87716C3.54485 9.3938 3.24023 9.67505 3.24023 10.0407V14.2313C3.26793 14.5969 3.54485 14.8782 3.87716 14.8782ZM4.51408 10.6875H5.23408V11.2782H4.51408V10.6875Z" fill=""></path>
                </svg>
                Save As PDF
              </button>
            </div>
            <div className="w-[90%] sm:w-4/5 mx-auto">
              <div className="flex flex-wrap justify-between  gap-16">
                <div>
                  <p className="mb-1 font-medium text-black">
                    Billing From:
                  </p>
                  <h4 className="mb-3 text-xl font-bold text-black">
                    Levitation Infotech
                  </h4>
                  <a href="#" className="block"><span className="font-medium text-black">Email:</span>
                    contact@example.com</a>
                  <span className="mt-1 block"><span className="font-medium text-black">Address:</span>
                    Noida, Uttar Pardesh.</span>
                </div>

                <div>
                  <p className="mb-1 font-medium text-black">
                    Billing To:
                  </p>
                  <h4 className="mb-3 text-xl font-bold text-black">
                    {user?.name}
                  </h4>
                  <a href='#' className="block"><span className="font-medium text-black">Email:</span>
                    {user?.email}</a>
                  <span className="mt-1 block"><span className="font-medium text-black">Address:</span></span>
                </div>
              </div>
              <div className="my-8 grid grid-cols-1 border border-stroke text-light  sm:grid-cols-4">
                <div className="border-b border-r border-stroke px-5 py-4 last:border-r-0 sm:border-b-0">
                  <h5 className="mb-1 font-bold text-black">
                    Invoice ID :
                  </h5>
                  <span className="text-sm font-medium"> {invoice.invoiceNumber} </span>
                </div>

                <div className="border-b border-stroke px-5 py-4 last:border-r-0 sm:border-b-0 sm:border-r">
                  <h5 className="mb-1 font-bold text-black">
                    Date Issued :
                  </h5>
                  <span className="text-sm font-medium">{new Date().toLocaleDateString()}</span>
                </div>

                <div className="border-b border-r border-stroke px-5 py-4 last:border-r-0 xsm:border-b-0">
                  <h5 className="mb-1 font-bold text-black">
                    Due Date :
                  </h5>
                  <span className="text-sm font-medium">{new Date().toLocaleDateString()} </span>
                </div>

                <div className="border-r border-stroke px-5 py-4 last:border-r-0">
                  <h5 className="mb-1 font-bold text-black">
                    Due Amount :
                  </h5>
                  <span className="text-sm font-medium"> ₹ {invoice.finalPrice} </span>
                </div>
              </div>

              {invoice.products.length &&
                <div className="border border-stroke">
                  <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[670px]">
                      <TableData slNo={'SL. No'} product='Product' qty={'Quantity'} price={'Price'} total={'Total Price'} />
                      {
                        invoice.products.map((item, i) => {
                          const { price, qty, name } = item;
                          return <TableData slNo={i + 1} product={name} qty={qty} price={price} total={qty * price} />
                        })
                      }
                    </div>
                  </div>

                  {/* <!-- total price start --> */}
                  <div className="flex justify-end p-6">
                    <div className="w-full max-w-[20rem]">
                      <div className="flex flex-col gap-4">
                        <p className="flex justify-between font-medium text-black">
                          <span> Total </span>
                          <span>₹ {invoice.finalPrice} </span>
                        </p>
                        <p className="flex justify-between font-medium text-black">
                          <span> GST </span>
                          <span> 18% </span>
                        </p>
                      </div>

                      <p className="mt-4 flex justify-between border-t border-stroke pt-5">
                        <span className="font-medium text-black">
                          Final Total
                        </span>

                        <span className="font-bold text-meta-3">₹ {Number(invoice.finalPrice) + (Number(invoice.finalPrice) * 0.18)}</span>
                      </p>

                      <button className="float-right mt-10 inline-flex items-center gap-2.5 rounded bg-blue_primary px-8 py-2.5 font-medium text-white hover:bg-opacity-90" onClick={downloadInvoice}>
                        Download
                        <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_1878_13706)">
                            <path d="M16.8754 12.375C16.5379 12.375 16.2285 12.6562 16.2285 13.0219V15.525C16.2285 15.7781 16.0316 15.975 15.7785 15.975H2.22227C1.96914 15.975 1.77227 15.7781 1.77227 15.525V13.0219C1.77227 12.6562 1.46289 12.375 1.12539 12.375C0.787891 12.375 0.478516 12.6562 0.478516 13.0219V15.525C0.478516 16.4812 1.23789 17.2406 2.19414 17.2406H15.7785C16.7348 17.2406 17.4941 16.4812 17.4941 15.525V13.0219C17.5223 12.6562 17.2129 12.375 16.8754 12.375Z" fill=""></path>
                            <path d="M8.55055 13.078C8.66305 13.1905 8.8318 13.2468 9.00055 13.2468C9.1693 13.2468 9.30992 13.1905 9.45054 13.078L13.5287 9.1124C13.7818 8.85928 13.7818 8.46553 13.5287 8.2124C13.2755 7.95928 12.8818 7.95928 12.6287 8.2124L9.64742 11.1374V1.40615C9.64742 1.06865 9.36617 0.759277 9.00055 0.759277C8.66305 0.759277 8.35367 1.04053 8.35367 1.40615V11.1374L5.37242 8.2124C5.1193 7.95928 4.72555 7.9874 4.47242 8.2124C4.2193 8.46553 4.24742 8.85928 4.47242 9.1124L8.55055 13.078Z" fill=""></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_1878_13706">
                              <rect width="18" height="18" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
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

export default GeneratePDF

