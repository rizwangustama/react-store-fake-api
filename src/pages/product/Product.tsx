
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    Button,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    HiTrash,
    HiPencil,
    HiEye,
} from "react-icons/hi";
import ModalConfirmation from "../../components/ModalConfirmation";

interface Category {
    id: number;
    name: string;
    image: string;
}
interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
}

const Product = () => {
    const navigator = useNavigate();
    const [listProduct, setListProduct] = useState<Product[]>([]);
    const [isShow, setIsShow] = useState(Boolean);
    const [id, setId] = useState(0)


    const fetchData = async (page: number = 0) => {
        try {
            const offset = (page - 1) * 10;
            const res = axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=10`);
            res.then((res) => {
                setListProduct(res.data);
                console.log(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleDetailProduct = (id: number) => {
        navigator("/dashboard/products/view/" + id);
    }
    const onAddProduct = () => {
        console.log("Add");
        navigator('/dashboard/products/add');
    }

    const handleDetailEdit = (id: number) => {
        navigator("/dashboard/products/edit/" + id);
    }

    const handleOnShow = (id: number) => {
        // alert("Show");
        setId(id);
        setIsShow(true);

    }

    const handleOnClose = () => {
        // setIsShow(true);
        // alert("clouse");
        setIsShow(false);
    }

    const handleOnConfirm = (id: number) => {
        // alert(id);
        // alert("Memk");
        handleDeleteProduct(id);
    }

    const handleDeleteProduct = async (id:number) => {
        try {
            const res = await axios.delete('https://api.escuelajs.co/api/v1/products/' + id);
            console.log(res);
            await fetchData(0);
            setIsShow(false);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchData(0);
    }, []);

    return (
        <>
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
                        {listProduct.map((data) => (
                            <TableRow
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                key={data.id}
                            >
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {data.id}
                                </TableCell>
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" >
                                    {data.title}
                                </TableCell>
                                <TableCell>{data.title}</TableCell>
                                <TableCell>{data.category.name}</TableCell>
                                <TableCell>$ {data.price}</TableCell>
                                <TableCell className="flex gap-3">
                                    <Button onClick={() => handleDetailProduct(data.id)}>
                                        <HiEye className="h-4 w-4" />
                                    </Button>
                                    <Button color="warning" onClick={() => handleDetailEdit(data.id)}>
                                        <HiPencil className="h-4 w-4" />
                                    </Button>
                                    <Button onClick={() => handleOnShow(data.id)} color="failure"><HiTrash className="h-4 w-4" /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex overflow-x-auto sm:justify-center">
                    <div className="flex overflow-x-auto sm:justify-center">
                    </div>
                </div>
            </div>
        </div>

        {/* Confir */}
        <ModalConfirmation show={isShow} onClose={() => handleOnClose()} onConfirm={() => handleOnConfirm(id)}/>
        </>
    )
}

export default Product;