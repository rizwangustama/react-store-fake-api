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
        // setId(id);
        setOpenModal(true);
        setIsShowAddProduct(true);

        // getProductDetail(id);
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
            <div className="flex gap-6">
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
                            <Sidebar.Item href="#" icon={HiShoppingBag}>
                                Products
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

                <div className="mt-6 w-8/12">
                    <div className="mb-4">
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
                                                View
                                            </Button>
                                            <Button href="#" color="warning">
                                                Edit
                                            </Button>
                                            <Button color="failure">Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="flex overflow-x-auto sm:justify-center">
                            <div className="flex overflow-x-auto sm:justify-center">
                                <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Model */}
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Detail Product
                        </h3>
                        {!isShowAddProduct ? <img
                            src={detail.images}
                            alt="Hello World"
                            className="rounded-2xl"
                        /> :
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="file-upload" value="Upload file" />
                                </div>
                                <FileInput id="file-upload" />
                            </div>
                        }

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Name Product" />
                            </div>
                            <TextInput
                                id="email"
                                placeholder="name@company.com"
                                value={nameProduct}
                                onChange={(event) => setNameProduct(event.target.value)}
                                required
                                disabled={!isShowAddProduct}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="price" value="Price" />
                            </div>
                            <TextInput
                                id="price"
                                placeholder="$ 0.00"
                                value={priceProduct}
                                onChange={(event) => setPriceProduct(event.target.value)}
                                required
                                disabled={!isShowAddProduct}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="category" value="Category" />
                            </div>
                            <TextInput
                                id="category"
                                placeholder="name@company.com"
                                value={categoryProduct}
                                onChange={(event) => setCategoryProduct(event.target.value)}
                                required
                                disabled={!isShowAddProduct}
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="category" value="Category" />
                            </div>
                            <Textarea
                                id="category"
                                placeholder="name@company.com"
                                value={descriptionProduct}
                                onChange={(event) => setDescriptionProduct(event.target.value)}
                                required
                                disabled={!isShowAddProduct}
                                rows={8}
                            />
                        </div>

                        {isShowAddProduct ?   <Button>{ isShowAddProduct ? "Add Product" : "Update Product"}</Button> : ''}
                      

                        {/* description */}

                        {/* <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                            <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                                Lost Password?
                            </a>
                        </div> */}
                        {/* <div className="w-full">
                            <Button>Log in to your account</Button>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?&nbsp;
                            <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
                                Create account
                            </a>
                        </div> */}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Dashboard;
