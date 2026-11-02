'use client'
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { Tuser } from "./types/type";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";


const UserCard = ({ user }: { user: Tuser }) => {
    const { name, email, _id } = user
    const router = useRouter()

    const handleDelete = async () => {
        console.log('from delete ', _id);
        const res = await fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE'
        })
        const result = await res.json()
        console.log(result);
        if (result?.deletedCount > 0) {
            router.refresh()
        }
    }

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('from edit ', _id);
        const forms = new FormData(e.currentTarget)
        const up = Object.fromEntries(forms)

        const res = await fetch(`http://localhost:5000/users/${_id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(up)
        })
        const result = await res.json()
        console.log(result);
        if (result?.modifiedCount > 0) {
            router.refresh()

        }
    }


    return (
        <div>
            <Card className="mx-auto w-full max-w-sm pt-0">
                <div className="" />
                <CardHeader>
                    <CardAction>
                        <h2>No Ation</h2>
                    </CardAction>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>{email}</CardDescription>
                </CardHeader>
                <CardFooter className="space-x-3">
                    <Link href={`/users/${_id}`} className="rounded-full text-center px-5 py-2 w-full bg-black/10">View Details</Link>

                    <Dialog>
                        <DialogTrigger render={<Button className='bg-amber-400 px-3 py-1' >Edit</Button>} />
                        <DialogContent className="sm:max-w-sm">
                            <form onSubmit={handleEdit}>
                                <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you&apos;re
                                        done.
                                    </DialogDescription>
                                </DialogHeader>
                                <FieldGroup>
                                    <Field>
                                        <Label htmlFor="name-1">Name</Label>
                                        <Input id="name-1" name="name" defaultValue={name} />
                                    </Field>
                                    <Field>
                                        <Label htmlFor="email-1">Username</Label>
                                        <Input id="email-1" type="email" name="email" defaultValue={email} />
                                    </Field>
                                </FieldGroup>
                                <DialogFooter>
                                    <DialogClose render={<Button variant="outline">Cancel</Button>} />
                                    <DialogClose render={<Button type="submit">Save changes</Button>} />
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <Button className='bg-indigo-300 px-3 py-1' variant='destructive' onClick={handleDelete}>Delete</Button>
                </CardFooter>
            </Card>

        </div>
    );
};

export default UserCard;