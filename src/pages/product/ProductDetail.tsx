import axios from "axios";
import { Label, TextInput, Button, Select, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Category {
    id: number;
    name: string;
    image: string;
}

const ProductDetail = () => {
    const [listCategory, setListCategory] = useState<Category[]>([]);
    const [nameProduct, setNameProduct] = useState("");
    const [categoryProduct, setCategoryProduct] = useState(0);
    const [priceProduct, setPriceProduct] = useState(0);
    const [descriptionProduct, setDescriptionProduct] = useState("");
    const { id, view } = useParams<{ id: string, view: string }>();
    const [isDisabled, setIsDisabled] = useState(Boolean);
    const [idProduct, setIdProduct] = useState("");
    const navigator = useNavigate();


    const getHandleCategory = () => {
        axios.get("https://api.escuelajs.co/api/v1/categories").then((res) => {
            setListCategory(res.data);
        })
    }

    const getDetailProduct = async (id: string) => {
        try {
            const res = await axios.get("https://api.escuelajs.co/api/v1/products/" + id);
            setNameProduct(res.data.title);
            setCategoryProduct(res.data.category.id);
            setPriceProduct(res.data.price);
            setDescriptionProduct(res.data.description);
        } catch (error) {
            console.log(error);
        }
    }

    const handleView = () => {
        // alert(view);
        if (view == 'view') {
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
        }
    }

    const handleReset = () => {
        setNameProduct("");
        setCategoryProduct(0);
        setPriceProduct(0);
        setDescriptionProduct("");

    }

    const saveProduct = async (e: any) => {
        e.preventDefault();
        try {
            if (view == 'view') {
                const body = {
                    title: nameProduct,
                    price: priceProduct,
                };
                const response = await axios.put(`https://api.escuelajs.co/api/v1/products/${idProduct}`, body);
                console.log(response.data);
            } else {
                const body = {
                    title: nameProduct,
                    price: priceProduct,
                    description : descriptionProduct,
                    categoryId: categoryProduct,
                    images : ["https://placeimg.com/640/480/any"]
                }
                const response = await axios.post("https://api.escuelajs.co/api/v1/products/", body);
                console.log(response.data);
            }
            navigator('/dashboard/products/');
        } catch (error) {
            // console.error(error);
            alert('An error occurred while updating the product.');
        }

    }

    const getIdParams = (id: string) => {
        setIdProduct(id);
    }

    const backToProduct = () => {
        navigator("/dashboard/products")
        // alert("Kemem")
    }

    useEffect(() => {
        handleView();
        getHandleCategory();
        if (id) {
            getIdParams(id);
            getDetailProduct(id);
        }

    }, [id]);
    return (
        <>
            <div className="w-full mx-auto flex items-center justify-center pt-14">
                {/* <h1>Selamat Datang</h1> */}
                <form onSubmit={saveProduct} className="flex w-full flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="nameproduct" value="Name Product *" />
                        </div>
                        <TextInput value={nameProduct} disabled={isDisabled} onChange={(e) => setNameProduct(e.target.value)} id="nameproduct" type="text" required shadow placeholder="Please input your name product" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="priceproduct" value="Category Product *" />
                        </div>
                        <Select id="category" required shadow value={categoryProduct} disabled={isDisabled} onChange={(e) => setCategoryProduct(e.target.value as any)}>
                            <option>-- Select Category --</option>
                            {listCategory.map((item: any) => {
                                return (
                                    <option value={item.id}>{item.name}</option>
                                )
                            })}
                        </Select>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="priceproduct" value="Price Product *" />
                        </div>
                        <TextInput value={priceProduct} disabled={isDisabled} onChange={(e) => setPriceProduct(e.target.value as any)} id="priceproduct" type="number" required shadow placeholder="Please input your price" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="descriptionproduct" value="Description Product *" />
                        </div>
                        <Textarea value={descriptionProduct} disabled={isDisabled} onChange={(e) => setDescriptionProduct(e.target.value)} id="descriptionproduct" rows={5} required shadow placeholder="Please input your description" />
                    </div>

                    <div className="flex gap-3">
                        {isDisabled ? (
                            <>
                                <Button className="w-[120px]" onClick={() => backToProduct()}>Back</Button>
                            </>
                        ) : ''}
                        <Button className="w-[120px]" type="submit" disabled={isDisabled}>
                            Save
                        </Button>
                        <Button className="w-[120px]" color="warning" disabled={isDisabled} onClick={() => handleReset()}>Reset</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ProductDetail;
