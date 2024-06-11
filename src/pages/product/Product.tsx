
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
import { useNavigate } from 'react-router-dom';
import {
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiShoppingBag,
    HiTable,
    HiUser,
    HiTrash,
    HiPencil,
    HiEye,
} from "react-icons/hi";

const Product = () => {
    const navigator = useNavigate();
    const [detail, setDetail] = useState([]);
    const [priceProduct, setPriceProduct] = useState(0);
    const [nameProduct, setNameProduct] = useState("");
    const [categoryProduct, setCategoryProduct] = useState("");
    const [descriptionProduct, setDescriptionProduct] = useState("");
    const [listProduct, setListProduct] = useState([]);

    const getProductDetail = (id: number) => {
 
        
        try {
            const res = axios.get("https://api.escuelajs.co/api/v1/products/" + id);
            res.then((res) => {
                setDetail(res.data);
                setNameProduct(res.data.title);
                setPriceProduct(res.data.price);
                setCategoryProduct(res.data.category.name);
                setDescriptionProduct(res.data.description);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchData = async (page?: number) => {
        try {
            const res = axios.get(`https://api.escuelajs.co/api/v1/products?offset=${(page - 1) * 10}&limit=10`);
            res.then((res) => {
                setListProduct(res.data);
                console.log(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleDetailProduct = (id: number)  => {
        // alert(id);
        navigator("/dashboard/products/" + id);
        // console.log(id);
    }
    const onAddProduct = () => {
        console.log("Add");
    }

    useEffect(() => {
        fetchData(0);
    }, []);
    return (
        <div className="mt-6 w-full">
                    <div className="py-6 flex justify-between pr-6">
                        <h1 className="text-3xl font-semibold text-gray-600">Product</h1>
                        <Button onClick={() => onAddProduct()}>Add</Button>
                    </div>
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <TableHead>
                                <TableHeadCell>Id</TableHeadCell>
                                <TableHeadCell>Product name</TableHeadCell>
                                <TableHeadCell>Color</TableHeadCell>
                                <TableHeadCell>Category</TableHeadCell>
                                <TableHeadCell>Price</TableHeadCell>
                                <TableHeadCell>
                                    <span className="sr-only">Edit</span>
                                </TableHeadCell>
                            </TableHead>
                            <TableBody className="divide-y">
                                {listProduct.map((item) => (
                                    <TableRow
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                        key={item.id}
                                    >
                                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {item.id}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {item.title}
                                        </TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>{item.category.name}</TableCell>
                                        <TableCell>$ {item.price}</TableCell>
                                        <TableCell className="flex gap-3">
                                            <Button onClick={() => handleDetailProduct(item.id)}>
                                                <HiEye className="h-4 w-4" />
                                            </Button>
                                            <Button href="#" color="warning">
                                                <HiPencil className="h-4 w-4" />
                                            </Button>
                                            <Button color="failure"><HiTrash className="h-4 w-4" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="flex overflow-x-auto sm:justify-center">
                            <div className="flex overflow-x-auto sm:justify-center">
                                {/* <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} /> */}
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default Product;