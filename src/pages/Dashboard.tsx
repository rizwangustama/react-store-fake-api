import axios from "axios";
import {
    Sidebar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    Modal,
    Button,
    Label,
    TextInput,
    Textarea,
    Pagination,
    FileInput
} from "flowbite-react";
import { useEffect, useState } from "react";
import { BiBuoy } from "react-icons/bi";
import {
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiShoppingBag,
    HiTable,
    HiUser,
    HiViewBoards,
} from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";

function Dashboard() {
    const [listProduct, setListProduct] = useState([]);
    const [id, setId] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [isShowAddProduct, setIsShowAddProduct] = useState(false);

    const [detail, setDetail] = useState([]);
    const [priceProduct, setPriceProduct] = useState(0);
    const [nameProduct, setNameProduct] = useState("");
    const [categoryProduct, setCategoryProduct] = useState("");
    const [descriptionProduct, setDescriptionProduct] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = async (page: number) => {
        // alert(page);
        try {
            await setCurrentPage(page);
            await fetchData(page);
        } catch (error) {
            console.log(error);
        }

        // alert(page);
    }

    const onCloseModal = () => {
        setOpenModal(false);
        setIsShowAddProduct(false);
    };

    const fetchData = async (page?: number) => {
        try {
            const res = axios.get(`https://api.escuelajs.co/api/v1/products?offset=${(page - 1) * 10}&limit=10`);
            res.then((res) => {
                setListProduct(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchData(currentPage);
    }, []);
    const handleDetailProduct = (id: number) => {
        setId(id);
        setOpenModal(true);
        getProductDetail(id);
    };

    const onAddProduct = () => {
        setOpenModal(true);
        setIsShowAddProduct(true);
    };

    const getProductDetail = (id: number) => {
        try {
            const res = axios.get("https://api.escuelajs.co/api/v1/products/" + id);
            res.then((res) => {
                // console.log(res.data)
                setDetail(res.data);
                setNameProduct(res.data.title);
                setPriceProduct(res.data.price);
                setCategoryProduct(res.data.category.name);
                setDescriptionProduct(res.data.description);
                // console.log(detail)
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="flex">
                <Sidebar
                    aria-label="Sidebar with content separator example"
                    className="h-screen w-3/12"
                >
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="#" icon={HiChartPie}>
                                Dashboard
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiViewBoards}>
                                Kanban
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiInbox}>
                                Inbox
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiUser}>
                                Users
                            </Sidebar.Item>
                            <Sidebar.Item icon={HiShoppingBag}>
                                <Link to={"/dashboard/products"}> Products</Link>
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiArrowSmRight}>
                                Sign In
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiTable}>
                                Sign Up
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="#" icon={HiChartPie}>
                                Upgrade to Pro
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiViewBoards}>
                                Documentation
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={BiBuoy}>
                                Help
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>


                <div className="content w-9/12 px-7">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
