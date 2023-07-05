import { Button, Modal, message } from "antd";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { CLEAR_CURRENT_BILL } from "../../redux/BillSlice";
import { useNavigate } from "react-router-dom";



const PrintBill = ({ isModalOpen, setIsModalOpen }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const componentRef = useRef();
  const ReduxCurrentBill = useSelector((state) => state.bills.currentBill);
  const handlePrint = useReactToPrint({ content: () => componentRef.current, });

  const Print = () => {
      handlePrint()
      navigate("/")
      dispatch(CLEAR_CURRENT_BILL())
      message.success("Fatura Yazdırıldı...")
  }

  return (
    <Modal title="Fatura Yazdır" open={isModalOpen}
           footer={false} width={800}
           onCancel={() => setIsModalOpen(!isModalOpen)} >
      <section className="py-20 bg-black" ref={componentRef}>
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h2 className="text-4xl font-bold text-slate-700">HNF</h2>
            </div>
            <div className="bill-details">
              <div className="flex justify-between">
                  <div className="text-md text-slate-500 flex flex-col gap-1 flex-1">
                      <div className="flex gap-2 w-full">
                          <p className="font-bold text-slate-700">Sipariş Veren:</p>
                          <p className="text-green-600">{ReduxCurrentBill?.userName}</p>
                      </div>
                      <div className="flex gap-2 w-full">
                          <p className="font-bold text-slate-700">Teslim Alan:</p>
                          <p className="text-green-600">{ReduxCurrentBill?.teslimAlan}</p>
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                          <p className="font-bold text-slate-700">Fatura Adresi:</p>
                          <p>{ReduxCurrentBill.address} </p>
                      </div>
                  </div>
                  <div className="text-md text-slate-500 flex-1">
                      
                        <div className="flex items-center gap-1">
                          <p className="font-bold text-slate-700">Fatura numarası:</p>
                          <p>000{Math.floor(Math.random() * 100)}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="font-bold text-slate-700 ">
                            Veriliş Tarihi:
                          </p>
                          <p>  05.06.2023
                          </p>
                        </div>
                  </div>
              
              </div>
            </div>
            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th scope="col"
                        className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"  >
                      Görsel
                    </th>
                    <th scope="col"
                        className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"  >
                      {" "}
                      Başlık
                    </th>
                    <th colSpan={4}
                        scope="col"
                        className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:hidden" >
                          {" "}
                          Başlık
                    </th>
                    <th scope="col"
                      className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden">
                      Fiyat
                    </th>
                    <th scope="col"
                        className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden" >
                      Adet
                    </th>
                    <th scope="col"
                        className="py-3.5 text-end text-sm font-normal text-slate-700 md:pl-0" >
                      Toplam
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ReduxCurrentBill?.cartItems?.map((item) => (
                    <tr className="border-b border-slate-200">
                      <td className="py-4 sm:table-cell hidden">
                        <img
                          src={item.productImg}
                          alt=""
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="py-4 sm:table-cell hidden">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.productName}</span>
                          <span className="sm:hidden inline-block text-xs">
                            Birim Fiyatı {item.productPrice}₺
                          </span>
                        </div>
                      </td>
                      <td className="py-4 sm:hidden" colSpan={4}>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.productName}</span>
                          <span className="sm:hidden inline-block text-xs">
                            Birim Fiyatı {item.productPrice}₺
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-center sm:table-cell hidden">
                        <span>{item.productPrice.toFixed(2)}₺</span>
                      </td>
                      <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                        <span>{item.productQuantity}</span>
                      </td>
                      <td className="py-4 text-end">
                        <span>{(item.productPrice * item.productQuantity).toFixed(2)}₺</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th className="text-right pt-4 sm:table-cell hidden"
                        colSpan="4" scope="row" >
                      <span className="font-normal text-slate-700">
                        Ara Toplam
                      </span>
                    </th>
                    <th className="text-left pt-4 sm:hidden"
                        scope="row" colSpan="4"  >
                      <p className="font-normal text-slate-700">Ara Toplam</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {ReduxCurrentBill?.subTotal}₺
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"  >
                      <span className="font-normal text-slate-700">KDV</span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4" >
                      <p className="font-normal text-slate-700">KDV</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-red-600">
                        +{ReduxCurrentBill?.tax}₺
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row" >
                      <span className="font-normal text-slate-700">
                        Genel Toplam
                      </span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4">
                      <p className="font-normal text-slate-700">Genel Toplam</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {ReduxCurrentBill?.subTotal}₺
                      </span>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-9">
                <div className="border-t pt-9 border-slate-200">
                  <p className="text-sm font-light text-slate-700">
                    Ödeme koşulları 14 gündür. Paketlenmemiş Borçların Geç
                    Ödenmesi Yasası 0000'e göre, serbest çalışanların bu süreden
                    sonra borçların ödenmemesi durumunda 00.00 gecikme ücreti
                    talep etme hakkına sahip olduklarını ve bu noktada bu ücrete
                    ek olarak yeni bir fatura sunulacağını lütfen unutmayın.
                    Revize faturanın 14 gün içinde ödenmemesi durumunda, vadesi
                    geçmiş hesaba ek faiz ve %8 yasal oran artı %0,5 Bank of
                    England tabanı olmak üzere toplam %8,5 uygulanacaktır.
                    Taraflar Kanun hükümleri dışında sözleşme yapamazlar.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large" onClick={Print} >
          Yazdır
        </Button>
      </div>
    </Modal>
  );
};

export default PrintBill;