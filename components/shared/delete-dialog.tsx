'use client'

const DeleteDialog = ({id, action,
}:{
        id: string;
        action: (id: string) => Promise<{ success: boolean; message: string }>;
}) => {
        return(<>DELETE</>);
}

export default DeleteDialog