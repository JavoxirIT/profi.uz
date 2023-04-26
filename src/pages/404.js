import { Button, Result } from "antd";
import PageWrapperAuthorization from "components/PageWrapperAuthorization";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
const ErrorPage = () => {
  const router = useRouter();
  console.log("roter", router);
  const handleBack = (e) => {
    e.preventDefault();
    router.back();
  };
  useEffect(() => {
    router.prefetch("/");
  }, [router]);
  return (
    <PageWrapperAuthorization title={"404 sahifa topilmadi"}>
      <Result
        status="404"
        title="404"
        subTitle="Kechirasiz, siz tashrif buyurgan sahifa mavjud emas."
        extra={
          <>
            <Button type="primary">
              <a onClick={handleBack}> Qaytish</a>
            </Button>
            <Link href="/">Bosh sahifa</Link>
          </>
        }
      />
    </PageWrapperAuthorization>
  );
};
export default ErrorPage;
// Извините, страница, которую вы посетили, не существует.
