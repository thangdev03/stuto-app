function Notes() {
    const notes = [
        {
            id: 1,
            content: "15/11: Họp N-Start"
        },
        {
            id: 2,
            content: "15/11: Họp N-Start Họp N-Start Họp N-Start Họp N-Start Họp N-Start"
        },
        // {
        //     id: 3,
        //     content: "15/11: Họp N-Start"
        // },
        // {
        //     id: 4,
        //     content: "15/11: Họp N-Start"
        // },
        // {
        //     id: 5,
        //     content: "15/11: Họp N-Start"
        // },
        // {
        //     id: 6,
        //     content: "15/11: Họp N-Start"
        // },
        // {
        //     id: 7,
        //     content: "15/11: Họp N-Start"
        // },
    ];
    
    return (
        <div className="fixed top-[490px] right-5 pt-6 pr-2 pl-6 pb-2 h-48 w-[340px] bg-boxBackground rounded-3xl">
            <h3 className="font-semibold text-lg">Lời nhắc</h3>
            <ul className="mt-3 max-h-28 overflow-y-auto text-sm">
                {
                    notes.map(note => 
                        <li className="mb-2 flex items-center" key={note.id}>
                            <input type="checkbox" id={`note-${note.id}`} 
                            className="mr-3 w-4 h-4 text-red-500 cursor-pointer shrink-0"/>
                            <label htmlFor={`note-${note.id}`} className="cursor-pointer">{note.content}</label>
                        </li>
                    )
                }
            </ul>
            <form action="#" method="post" className="mt-2 text-sm">
                <p className="mr-3 text-center w-4 float-start">+</p>
                <input 
                    type="text" 
                    placeholder="Thêm lời nhắc mới..." 
                    className="focus:outline-none"
                />
            </form>
        </div>
    );
}

export default Notes