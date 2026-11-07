
import { BookCover } from "../shared/BookCover"
import Link from "next/link"
import { formatDate } from "@/lib/format"
import { Book } from "@/lib/api";
import MyBooksCardBtn from "./MyBooksCardBtn";

const MyBooksCard = ({ book }: { book: Book }) => {

    const { author, category, createdAt, image, title, totalCopies, _id } = book

    return (
        <div>
            <article className="flex gap-4 items-center rounded-xl border bg-card p-4 shadow-sm">
                <div className="h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-36 sm:w-28">
                    <BookCover
                        src={image}
                        alt={title}
                        className="h-full w-full"
                    />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-1">

                    {book ? (
                        <Link
                            href={`/books/${_id}`}
                            className="line-clamp-1 text-xl font-semibold hover:underline"
                        >
                            {title}
                        </Link>
                    ) : (
                        <p className="text-lg font-semibold">This book is no longer listed</p>
                    )}
                    {book && (
                        <>
                            <p className="text-sm text-muted-foreground">
                                by {author}
                            </p>
                            <p className="text-blue-400 font-bold">
                                {category}
                            </p>
                            <p className="">
                                Created At: {formatDate(createdAt)}
                            </p>
                            <p className="text-sky-800">
                                Total Copies: {totalCopies}
                            </p>
                        </>
                    )}
                </div>
                <div className="">
                    <MyBooksCardBtn book={book} />
                </div>
            </article>
        </div>
    );
};

export default MyBooksCard;