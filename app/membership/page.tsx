import { redirect } from "next/navigation";
import { getSession } from "../_actions/getSession";
import MembershipItem from "./components/membership-item";
import Header from "../_components/ui/header";
import { prisma } from "../_lib/prisma";

const MembershipPage = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    return redirect("/auth/signin");
  }

  const memberships = await prisma.membership.findMany({});

  if (user) {
    return (
      <>
        <Header />

        <div className="flex h-fit w-full flex-col items-center justify-center max-[1170px]:mb-12 max-[1170px]:mt-8 max-[1170px]:min-h-screen max-sm:px-2">
          <div className="flex flex-col min-[1170px]:mt-32">
            <h2 className="mb-12 text-center text-2xl font-bold max-sm:mb-10 max-sm:mt-5">
              Adquira sua licença para cadastrar sua barbearia em nossa
              plataforma!
            </h2>
            <div className="flex h-full w-full flex-col items-center gap-10 min-[1170px]:flex-row min-[1170px]:gap-8 min-[1170px]:px-5">
              <MembershipItem
                membership={JSON.parse(JSON.stringify(memberships[0]))}
              />

              <MembershipItem
                membership={JSON.parse(JSON.stringify(memberships[2]))}
                premium={true}
              />

              <MembershipItem
                membership={JSON.parse(JSON.stringify(memberships[1]))}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
  return <h1>loading</h1>;
};
export default MembershipPage;
