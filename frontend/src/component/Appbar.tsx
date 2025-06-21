import { Avatar } from "./Blogcard"


export const Appbar = () => {
    return <div className="flex justify-between  border-b px-10 py-4">
        <div className="flex flex-col justify-center font-bold">
            Medium
        </div>
        <div>
            <Avatar size="big" name="Asad" />
        </div>
    </div>
}