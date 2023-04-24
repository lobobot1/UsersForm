import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login"
}

const Page = () => {
  return (
    <>
      <h1 className=" text-6xl font-bold text-white mb-10 ">Login</h1>
      <LoginForm />
    </>
  );
};

export default Page;
