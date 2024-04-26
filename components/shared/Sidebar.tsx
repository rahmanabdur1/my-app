import Link from "next/link";


const Sidebar = () => {
    return (
        <div className="flex flex-col gap-2">
            <Link href='/dashbaord'>Dashboard</Link>
            <Link href='/mycards'>My Cards</Link>
            <Link href='/deposits'>Deposists</Link>
            <Link href='/transactions'>Transactions</Link>
        </div>
    );
};

export default Sidebar;