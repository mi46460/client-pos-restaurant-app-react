import { useContext, useEffect, useState } from "react";
import SearchIcon from "../Icons/SearchIcon";
import TodayDate from "../utils/DateConverter";
import { TrashIcon } from "../Icons/TrashIcon";
import { CreditCardicon } from "../Icons/CreditCardIcon";
import { WalletIcon } from "../Icons/WalletIcon";
import { CheckmateIcon } from "../Icons/CheckmateIcon";
import { QrisIcon } from "../Icons/QrisIcon";
import DummyData from "../data/data.json";
import { AppPageContext, AppPageContextType } from "../Context/appPageContext";
import MenuIcon from '@mui/icons-material/Menu';

interface FoodData {
    id: number,
    imagePath: string,
    foodName: string,
    price: number
}

interface Order {
    foodData: FoodData,
    qty: number,
    note?: string,
    price: number
}

export default function Dashboard() {
    const currentDate = TodayDate();
    const [activeTab, setActiveTab] = useState("Food");
    const [activeOrderState, setActiveOrderState] = useState("Dine In");
    const [listOrder, setListOrder] = useState<Order[]>([]);
    const [listMenu, setListMenu] = useState<FoodData[]>([]);
    const [paymentStatus, setPaymentStatus] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [subTotal, setSubTotal] = useState(0);
    const {appPage, setNavbarState} = useContext(AppPageContext) as AppPageContextType;

    useEffect(() => {
        setListMenu(DummyData.FoodData);
    }, [])
    
    const CardComponent = (props: FoodData) => {
        return (
            <div className="p-4 bg-bg-card-color text-white text-center rounded-2xl hover:cursor-pointer"
            onClick={() => addToListOrder(props)}
            >
                <img src={props.imagePath} alt="" className=" block m-auto object-scale-down w-[200px] h-[200px]" />
                <div className="font-medium text-sm font-barlow mt-3">
                    {props.foodName}
                </div>
                <div className="text-sm font-barlow font-normal mt-1">
                    $ {props.price}
                </div>
            </div>
        )
    }

    const changeQuantity = (id: number, qty: string) => {
    
        const changedData: Order[] = listOrder.map((data, index) => {
            if(data.foodData.id === id) {
                return{...data, qty: Number(qty)}
            }

            return data;
        })
        
        setListOrder(changedData);
        countSubTotal(changedData);    
    }

    const changeNote = (id: number, note: string) => {
        const changedData: Order[] = listOrder.map((data, index) => {
            if(data.foodData.id === id) {
                return{...data, note: note}
            }

            return data;
        })

        setListOrder(changedData)
    }

    const addToListOrder = (data: FoodData) => {

        const isPresent = listOrder.find((arrayData) => arrayData.foodData.id === data.id);
        let newListOrder = [];

        if(!isPresent) {
            const newData: Order = {
                foodData: data,
                qty: 1,
                note: "",
                price: data.price
            }
            newListOrder = [...listOrder, newData];
            
        } else {
            newListOrder = listOrder.map((order) => {
                if(order.foodData.id === isPresent.foodData.id) {
                    return {...order, qty: order.qty + 1}
                }

                return order;
            })
        }

        setListOrder(newListOrder);
        countSubTotal(newListOrder);
    }

    const removeOrder = (id: number) => {
        const changedData: Order[] = listOrder.filter((order) => {
                return order.foodData.id !== id
            })

        setListOrder(changedData)
        countSubTotal(changedData);
    }

    const countSubTotal = (listOrder: Order[]) => {
        let subTotal = 0;

        listOrder.forEach((item, index) => {
            subTotal = subTotal + (item.foodData.price * item.qty)
        })

        setSubTotal(subTotal)
    }

    const searchData = (keyword: string) => {
        let result = [];

        if(keyword.length === 0) {
            setListMenu(DummyData.FoodData);
        } else {
            result = listMenu.filter((data) => {
                return (data.foodName.toLowerCase()).includes(keyword);
            });

            setListMenu(result);
        }
    }

    return(
        <div className={`${appPage === "Dashboard" ? 'w-full h-full flex' : 'hidden'}`}>
            <div className={`h-full w-full md:w-3/5 bg-base-dark-bg-1 p-4 overflow-hidden`}>
                <div className="flex justify-end md:hidden text-white hover:cursor-pointer"
                onClick={setNavbarState}
                >
                    <MenuIcon />
                </div>
                <div className="flex justify-between flex-col md:flex-row md:items-center ">
                    <div className="p-0">
                            <div className="font-barlow font-semibold text-xl text-white">
                                Iqbal Resto
                            </div>
                            <div className="font-barlow text-white text-base mt-2 font-thin">
                                {currentDate}
                            </div>
                    </div>
                    <div className="mr-6 flex bg-form-bg-color border border-form-border-color rounded-md">
                            <div className={`mt-3 ml-2.5`}>
                                <SearchIcon/>
                            </div>
                           
                            <input className="placeholder:font-barlow placeholder:text-xs font-barlow placeholder:text-slate-400 
                            bg-form-bg-color w-full py-2 pl-2 pr-3 focus:outline-none text-slate-400 text-sm" 
                            placeholder="Search for food, coffe, etc.." 
                            type="text"
                            onChange={(e) => searchData(e.target.value)}
                            />
                    </div>
                </div>
                <div className="hidden md:sticky">
                    <ul className="mt-5 pl-[1px]">
                            <li className={`inline font-barlow font-semibold text-sm ${activeTab === "Food" ? "text-icon-color-primary" : "text-white"} hover:cursor-pointer`}
                            onClick={() => setActiveTab("Food")}
                            >Food
                            </li>
                            <li className={`inline pl-8 font-barlow font-semibold text-sm ${activeTab === "Drink" ? "text-icon-color-primary" : "text-white"} hover:cursor-pointer`}
                            onClick={() => setActiveTab("Drink")}
                            >Drink
                            </li>
                    </ul>
                </div>
                <div className="w-full border-[1px] border-form-border-color mt-4"></div>
                {
                    listMenu.length === 0 
                    ?
                    <div className="text-white font-barlow text-lg p-4 flex justify-center">
                        Menu Tidak Ditemukan
                    </div>
                    :
                    <div className="grid grid-cols-1 gap-3 p-4 h-5/6 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
                        {
                            
                            listMenu.map((data, index) => {
                                return(
                                    <CardComponent {...data} />
                                )
                            })
                        }
                    </div>
                }
            </div>
            <div className={`h-full w-0 bg-base-dark-bg-2 border-r-2 border-dark-line overflow-hidden md:w-2/5 md:p-4
            ${paymentStatus === true ? 'fixed right-margin-payment-on' : ''}
            `}>
                <div className="text-white font-barlow font-semibold text-xl">
                    Orders #34526
                </div>
                <div className="flex mt-2">
                    <div className={`font-barlow font-semibold text-sm px-[12px] py-[7px] rounded-lg hover:cursor-pointer
                        ${activeOrderState === "Dine In" ? "text-white bg-icon-color-primary" 
                        : "text-icon-color-primary border-dark-line border"}`}
                        onClick={() => setActiveOrderState("Dine In")}
                        >
                        Dine In
                    </div>
                    <div className={`ml-2 font-barlow font-semibold text-sm px-[12px] py-[7px] rounded-lg hover:cursor-pointer
                        ${activeOrderState === "To Go" ? "text-white bg-icon-color-primary" 
                        : "text-icon-color-primary border-dark-line border"}`}
                        onClick={() => setActiveOrderState("To Go")}
                        >
                        To Go
                    </div>
                    <div className={`ml-2 font-barlow font-semibold text-sm px-[12px] py-[7px] rounded-lg hover:cursor-pointer
                        ${activeOrderState === "Delivery" ? "text-white bg-icon-color-primary" 
                        : "text-icon-color-primary border-dark-line border"}`}
                        onClick={() => setActiveOrderState("Delivery")}
                        >
                        Delivery
                    </div>
                </div>
                <div className="flex justify-between py-4 text-white font-barlow font-semibold text-base">
                    <div>
                        Item
                    </div>
                    <div className="flex justify-between mr-4">
                        <div className="mr-8">
                            Qty
                        </div>
                        <div>
                            Price
                        </div>
                    </div>
                </div>
                <div className="w-full border-[1px] border-form-border-color"></div>
                <div className={`overflow-y-auto mt-1 ${paymentStatus === true ? 'h-4/6' : 'h-3/5'}`}>
 
                    {
                        listOrder.map((data, index) => {
                            return(
                                <div className="flex flex-col py-2">
                                    <div className="flex justify-between" /* untuk kotak  bagian atas*/>
                                        <div className="flex" /* untuk kotak  bagian atas sebelah kiri*/>
                                            <img className="w-[50px] h-[50px]" src={data.foodData.imagePath} alt="" />
                                            <div className="flex flex-col justify-center ml-2">
                                                <div className="text-white font-barlow font-medium text-sm">
                                                    {data.foodData.foodName}
                                                </div>
                                                <div className="text-text-light font-barlow font-medium text-xs">
                                                    $ {data.foodData.price}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center mr-2 relative" /** kotak bagian sebelah kanan */>
                                            <input type="number" 
                                            className="absolute w-[50px] h-[50px] bg-form-bg-color text-center right-[63px] 
                                            border-dark-line border-[2px] focus:outline-none rounded-lg font-barlow 
                                            text-white font-medium text-base"
                                            value={data.qty.toString().replace(/^0+/, '')}
                                            onChange={(event) => {
                                                changeQuantity(data.foodData.id, event.target.value)
                                            }}
                                            />
                                            <div className="font-barlow font-medium text-base text-white overflow-auto">
                                            $ {(data.price * data.qty).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex mt-4" /* untuk kotak  bagian bawah*/>
                                        <input type="text" className="h-[50px] bg-form-bg-color border-dark-line 
                                        border-[2px] focus:outline-none rounded-lg font-barlow text-text-lighter 
                                        text-sm font-regular pl-[14px] w-full mr-4"
                                        placeholder="Order Note..."
                                        spellCheck={false}
                                        onChange={(event) => changeNote(data.foodData.id, event.target.value)}
                                        />
                                        <div className="w-[50px] h-[50px] border-2 border-icon-color-primary rounded-[8px] 
                                        mr-1 flex items-center justify-center hover:cursor-pointer"
                                        onClick={() => {
                                            removeOrder(data.foodData.id)
                                        }}
                                        >
                                            <TrashIcon />
                                        </div>
                                    </div>
                                </div>
                            )
                        })

                    }
                </div>
                <div className={`pt-2 ${paymentStatus === true ? 'mt-3' : '' }`}>
                        <div className="flex justify-between">
                            <div className="font-barlow text-text-light text-sm">
                                Discount
                            </div>
                            <div className="text-white font-barlow font-medium text-base">
                                $ 0
                            </div>
                        </div>
                        <div className="flex justify-between mt-3">
                            <div className="font-barlow text-text-light text-sm">
                               Sub Total
                            </div>
                            <div className="text-white font-barlow font-medium text-base">
                                $ {subTotal.toFixed(2)}
                            </div>
                        </div>
                        <div className={`flex justify-center items-center bg-icon-color-primary h-[48px] text-white font-barlow 
                        rounded-lg mt-2 font-semibold text-sm ${paymentStatus === true ? 'hidden' : ''} hover:cursor-pointer`}
                        onClick={() => setPaymentStatus(true)}
                        >
                            Continue To Payment
                        </div>
                </div>
            </div>
            <div className={`h-full bg-base-dark-bg-2 p-4 flex flex-col justify-between overflow-hidden 
            ${paymentStatus === true ? 'fixed right-0 w-1/4' : 'hidden'}
            `}>
                <div className="">
                    <div className="text-white font-barlow font-semibold text-xl">
                        Payment
                    </div>
                    <div className="text-text-light font-barlow font-medium text-base mt-3">
                        2 Payment method available
                    </div>
                    <div className="w-full border-[1px] border-form-border-color mt-16"></div>
                    <div className="mt-2 font-barlow font-semibold text-xl text-white">
                        Payment Method
                    </div>
                    <div className="flex mt-2">
                        <div className={`flex flex-col items-center justify-center border-2 rounded-lg first-letter: mt-2 hover:cursor-pointer ${paymentMethod === "Credit Card" ? 'border-text-light' : 'border-dark-line'} relative p-2`}
                        onClick={() =>setPaymentMethod("Credit Card")}
                        >
                            <div className={`${paymentMethod === "Credit Card" ? 'absolute top-1 right-1' : 'hidden'}`}>
                                <CheckmateIcon />
                            </div>
                            <CreditCardicon color={`${paymentMethod === "Credit Card" ? 'white' : '#ABBBC2'}`}/>
                            <div className={`text-center font-barlow font-medium text-sm mt-1 ${paymentMethod === "Credit Card" ? 'text-white' : 'text-text-light'}`}>
                            Credit Card
                            </div>      
                        </div>
                        <div className={`flex flex-col relative ml-2 items-center justify-center border-2 rounded-lg mt-2 hover:cursor-pointer p-2 ${paymentMethod === "Cash" ? 'border-text-light' : 'border-dark-line'}`}
                        onClick={() => setPaymentMethod("Cash")}
                        >
                            <div className={`${paymentMethod === "Cash" ? 'absolute top-1 right-1' : 'hidden'}`}>
                                <CheckmateIcon />
                            </div>
                            <div>
                                <WalletIcon color={`${paymentMethod === "Cash" ? 'white' : '#ABBBC2'}`}/>
                            </div>
                            <div className={`px-3 font-medium text-sm font-barlow ${paymentMethod === "Cash" ? 'text-white' : 'text-text-light'}`}>
                                Cash
                            </div> 
                        </div>
                        <div className={`flex flex-col relative ml-2 items-center justify-center border-2 rounded-lg mt-2 hover:cursor-pointer py-2 px-5  ${paymentMethod === "Qris" ? 'border-text-light' : 'border-dark-line'}`}
                        onClick={() => setPaymentMethod("Qris")}
                        >
                            <div className={`${paymentMethod === "Qris" ? 'absolute top-1 right-1' : 'hidden'}`}>
                                <CheckmateIcon />
                            </div>
                            <div>
                                <QrisIcon color={`${paymentMethod === "Qris" ? 'white' : '#ABBBC2'}`}/>
                            </div>
                            <div className={`px-3 font-medium text-sm font-barlow ${paymentMethod === "Qris" ? 'text-white' : 'text-text-light'}`}>
                                QRIS
                            </div> 
                        </div>
                    </div>
                    <div>
                        <div className={`${paymentMethod !== 'Credit Card' ? 'hidden' : ''}`}>
                            <div className="py-4">
                                <span className="block text-white font-regular font-barlow text-sm">Cardholder Name</span>
                                <input type="text" 
                                className="w-full border-2 text-sm rounded-lg text-text-lighter font-barlow font-normal border-dark-line 
                                bg-form-bg-color py-3 focus:outline-none pl-3 mt-2"/>
                            </div>
                            <div className="">
                                <span className="block text-white font-regular font-barlow text-sm">Card Number</span>
                                <input type="text" 
                                className="w-full border-2 text-sm rounded-lg text-text-lighter font-barlow font-normal border-dark-line 
                                bg-form-bg-color py-3 focus:outline-none pl-3 mt-2"/>
                            </div>
                            <div className="flex justify-between mt-3 lg:mr-1">
                                <div>
                                    <div className="">
                                    <span className="block text-white font-regular font-barlow text-sm">Expiration Date</span>
                                    <input type="text" 
                                    className="w-full border-2 text-sm rounded-lg text-text-lighter font-barlow font-normal border-dark-line 
                                    bg-form-bg-color py-3 focus:outline-none pl-3 mt-2"/>
                                    </div>
                                </div>
                                <div>
                                    <div className="lg:ml-1">
                                        <span className="block text-white font-regular font-barlow text-sm">CVV</span>
                                        <input type="password"
                                        maxLength={3}
                                        className="w-full border-2 text-sm rounded-lg text-text-lighter font-barlow font-normal border-dark-line 
                                        bg-form-bg-color py-3 focus:outline-none pl-3 mt-2"/>
                                    </div>
                                </div>
                            </div>
                            <div className={`w-full border-[1px] border-form-border-color mt-5 ${activeOrderState !== 'Dine In' ? 'hidden' : ''}`}></div>
                        </div>
                        <div className={`mt-2 ${activeOrderState !== 'Dine In' ? 'hidden' : ''}`}>
                                <span className="block text-white font-regular font-barlow text-sm">Table No.</span>
                                <input type="number" 
                                className="w-1/2 border-2 text-sm rounded-lg text-text-lighter font-barlow font-normal border-dark-line 
                                bg-form-bg-color py-3 focus:outline-none pl-3 mt-2"/>
                        </div>
                    </div>
                </div>
                
                <div className={`pt-2 flex`}>
                        <div className={`flex justify-center items-center h-[48px] text-icon-color-primary font-barlow rounded-lg mt-2 
                        font-semibold text-sm w-full border-icon-color-primary border-2 mr-1 hover:cursor-pointer`}
                        onClick={() => setPaymentStatus(false)}
                        >
                            Cancel
                        </div>
                        <div className="flex justify-center items-center bg-icon-color-primary h-[48px] text-white font-barlow rounded-lg mt-2 
                        font-semibold text-sm w-full ml-1 hover:cursor-pointer"
                        onClick={() => setPaymentStatus(true)}
                        >
                            Confirm Payment
                        </div>
                </div>
            </div>
            <div className={`h-full w-payment-opacity opacity-60 bg-black absolute ${paymentStatus === false ? 'hidden' : ''}`}></div>
        </div>
    );
}    