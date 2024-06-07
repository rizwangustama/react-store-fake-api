import { FormEvent, useState } from "react";
import {
    Button,
    Checkbox,
    Label,
    TextInput,
    Toast,
    ToastToggle,
} from "flowbite-react";
import { HiFire, HiCheck } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notification, setNotification] = useState(false);
    const navigate = useNavigate();

    const onChangeEmail = (event: any) => {
        setEmail(event.target.value);
    };

    const onChanePassword = (event: any) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log(email, password);

        try {
            const response = await axios.post(
                "https://api.escuelajs.co/api/v1/auth/login",
                {
                    email,
                    password,
                }
            );

            console.log("Login successful:", response.data);
            setNotification(true);

            if (response?.data) {
                localStorage.setItem("token", response.data.access_token);
                // alert(localStorage.getItem("token"));
            }

            // window.location.replace("/dashboard");
            navigate("/dashboard");

            // Reset form
            setEmail("");
            setPassword("");

            setTimeout(() => {
                setNotification(false);
            }, 2000);
        } catch (error) {
            alert(error);
        }
    };
    return (
        <>
            {notification && (
                <Toast className="absolute top-4 right-4">
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                        <HiCheck className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        Item moved successfully.
                    </div>
                    <Toast.Toggle />
                    <ToastToggle />
                </Toast>
            )}

            <section>
                <div className="container flex justify-center h-screen items-center">
                    <form
                        className="flex max-w-md flex-col gap-4 w-6/12"
                        onSubmit={handleSubmit}
                    >
                        <h1>Welcome back,</h1>
                        <h1 className="text-3xl font-semibold">
                            Please Login With Application
                        </h1>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Your email" />
                            </div>
                            <TextInput
                                id="email1"
                                type="email"
                                value={email}
                                onChange={onChangeEmail}
                                placeholder="name@flowbite.com"
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Your password" />
                            </div>
                            <TextInput
                                value={password}
                                onChange={onChanePassword}
                                id="password1"
                                type="password"
                                required
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Login;
