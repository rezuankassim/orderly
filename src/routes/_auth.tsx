import Login from '@/components/illustration/login'
import Logo from '@/components/logo'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="grid h-full w-full grid-cols-2">
      <div className="relative flex flex-col">
        <div className="absolute -left-10 top-10 -z-10">
          <Login />
        </div>

        <div className="px-6 py-5">
          <Logo />
        </div>

        <div className="-mt-20 flex-1">
          <Outlet />
        </div>
      </div>

      <div className="flex flex-col border-10 border-white">
        <div className="rounded-4xl">
          <img
            src="/login.png"
            alt="login"
            className="h-96 w-full -scale-x-[1] rounded-t-4xl object-cover object-center"
          />
        </div>

        <div className="bg-secondary-300 flex h-full flex-col-reverse overflow-hidden rounded-b-4xl">
          <div className="mx-12 my-9 max-w-96">
            <p className="text-5xl text-white">
              Insights Tailored Just for You
            </p>
            <p className="text-secondary-0/70 mt-5">
              Receive personalized tips and recommendations based on your
              financial goals. Our insights features help you make informed
              decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
