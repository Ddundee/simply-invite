import React from "react";

export default async function Page({}: { params: Promise<{ id: string }> }) {
    return <div></div>;
}

// function NotFound() {
//     return (
//         <div className="my-9 flex w-full flex-col items-center justify-center space-y-3">
//             <h1>How&apos;d you get here?</h1>
//             <Link href={"/"}>
//                 <Button>Go Home</Button>
//             </Link>
//         </div>
//     );
// }
