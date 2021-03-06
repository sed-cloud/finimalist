type MultiSelectProps = {
    text: string
    items: {
        checked: boolean
        text: string
    }[]
    callback: (itemName: string) => void;
}

const MultiSelect = ({ text, items, callback }: MultiSelectProps) => {
    console.log(items)
    return (
        <div className="dropdown ">
            <button tabIndex={0} className="
                transition-all 
                ease-in-out 
                durration-300

                bg-stone-200 
                text-stone-900
                px-4
                py-2
                font-['Poppins']
                font-bold
                rounded-xl

                

                hover:bg-stone-600
                hover:text-red-50
            ">{text}</button>
            <div tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-lg w-48 max-h-64 overflow-y-auto scrollbar">
                {items.map((item, index) => {
                    return (<button
                        className="
                        flex-1
                        grid
                        grid-cols-[2rem_1fr]
                        justify-items-start
                        p-2
                        cursor-pointer
                        rounded-xl
                        hover:bg-stone-200"
                        key={index} onClick={() => callback(item.text)}>
                        <input type="checkbox" checked={item.checked} className="checkbox" />
                        <span className="max-w-full whitespace-nowrap overflow-hidden text-ellipsis">{item.text}</span>
                    </button>)
                })}
            </div>
        </div>
    )
}

export default MultiSelect;