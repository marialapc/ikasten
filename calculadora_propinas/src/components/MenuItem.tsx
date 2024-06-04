import type { menuItem } from "../types"


type MenuItemProps = {
    item: menuItem
    addItem: () => void
}


export default function menuItems({item, addItem} : MenuItemProps) {
    return (
       <button className="border-2 border-teal-400 hover:bg-teal-200 w-full p-3 flex justify-between"
               onClick={() => addItem()}>


         <p>{item.name}</p>
         <p className="font-black">${item.price}</p>
       </button>
    )
}