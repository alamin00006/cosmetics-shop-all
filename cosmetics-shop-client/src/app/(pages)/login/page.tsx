import AuthPage from "../../../components/login-signup";

export const metadata = {
  title: "Sharikana | Login - Fractional Property Investment For All",
};

const LoginPage = () => {
  return (
    <>
      <section className="bg-[#f1fbf9]">
        <div className="custom-container pt-20 ">
          <AuthPage />
        </div>
      </section>
    </>
  );
};

export default LoginPage;
