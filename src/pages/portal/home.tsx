import { Avatar, Button, ButtonGroup, Card } from "flowbite-react";
import Cards from '../../components/Card';
import { useState, useEffect } from "react";
import axios from "axios";


const home = () => {

    const [data, setData] = useState<any>([]);

    const fetchData = async () => {
        try {
            const res = await axios.get("https://api.escuelajs.co/api/v1/products/?categoryId=1&offset=0&limit=3");
            setData(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div className="container">
                <section className="bg-white dark:bg-gray-900 h-screen flex">
                    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                        <div className="mr-auto place-self-center lg:col-span-7">
                            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Payments tool for software companies</h1>
                            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.</p>
                            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <Button>Get started</Button>
                                <Button color="gray">Live demo</Button></div>
                        </div>
                        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex items-center">
                            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" className="h-fit" alt="" sizes="" />
                        </div>
                    </div>
                </section>
            </div>

            <section className="container">
                <div className="max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16">
                <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white mb-8">Category Clothes</h1>
                    <div className="grid grid-cols-3 gap-6">
                        {data.map((item: any) => (
                            <Cards key={item.id} images={item.images[0]} title={item.title} price={item.price} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default home;
