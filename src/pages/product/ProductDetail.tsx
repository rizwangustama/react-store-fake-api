import axios from "axios";
import { Label, TextInput, Button, Select, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    const { id } = useParams<{ id: string}>();

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

    const handleReset = () => {
        setNameProduct("");
        setCategoryProduct(0);
        setPriceProduct(0);
        setDescriptionProduct("");

    }

    useEffect(() => {
        getHandleCategory();
        if (id) {
            getDetailProduct(id);
        }

    }, [id]);
    return (
        <>
            <div className="w-full mx-auto flex items-center justify-center pt-14">
                {/* <h1>Selamat Datang</h1> */}
                <form className="flex w-full flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="nameproduct" value="Name Product *" />
                        </div>
                        <TextInput value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} id="nameproduct" type="text" required shadow placeholder="Please input your name product" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="priceproduct" value="Category Product *" />
                        </div>
                        <Select id="category" required shadow value={categoryProduct} onChange={(e) => setCategoryProduct(e.target.value as any)}>
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
                        <TextInput value={priceProduct} onChange={(e) => setPriceProduct(e.target.value as any)} id="priceproduct" type="number" required shadow placeholder="Please input your price" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="descriptionproduct" value="Description Product *" />
                        </div>
                        <Textarea value={descriptionProduct} onChange={(e) => setDescriptionProduct(e.target.value)} id="descriptionproduct" rows={5} required shadow placeholder="Please input your description" />
                    </div>

                    <div className="flex gap-3">
                        <Button className="w-[120px]" type="submit">
                            Save
                        </Button>
                        <Button className="w-[120px]" color="warning" onClick={() => handleReset()}>Reset</Button>
                    </div>

                    <h1>ID Product : {id}</h1>
                    <h1>Nama Product : {nameProduct}</h1>
                    <h1>Category Product : {categoryProduct}</h1>
                    <h1>Price Product : {priceProduct}</h1>
                    <h1>Description Product : {descriptionProduct}</h1>

                </form>
            </div>
        </>
    );
};

export default ProductDetail;
