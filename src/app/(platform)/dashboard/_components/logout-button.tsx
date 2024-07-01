import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { Icons } from "@/components/icons"

export default function LogoutButton() {
  const Logout = async () => {
    "use server"
    const cookiesStore = cookies()
    const token = cookiesStore.get("token")
    if (token) {
      cookiesStore.delete("token")
      redirect("/")
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="submit">
                <Icons.Logout className="h-5 w-5 text-red-500 hover:text-red-700" />
                <span className="sr-only">Logout</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin untuk logout?</AlertDialogTitle>
          <AlertDialogDescription>
            Ketika anda logout, anda diharuskan login untuk kembali mengakses konten yang tersedia.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <form action={Logout}>
            <AlertDialogAction type="submit" className="bg-red-500 hover:bg-red-700">
              Logout
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
