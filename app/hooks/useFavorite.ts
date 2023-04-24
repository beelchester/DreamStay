import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

interface IUseFavorite {
    listingId: string;
    currentUser?: User
}

const useFavorite = ({
    listingId, currentUser
}: IUseFavorite) => {
    const router = useRouter()

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if(!currentUser){
            return;
        }
        try {
           let request 

            if (hasFavorited){
                request = () =>  axios.delete(`/api/favorites/${listingId}`)
            }
            else{
                request = () =>  axios.post(`/api/favorites/${listingId}`)
            }

            await request() 
            router.refresh()
            toast.success('Success')
        } catch (error) {
           toast.error('Something went wrong') 
           console.log(error)
        }
    }, [
        currentUser,
        hasFavorited,
        listingId,
        router
    ]);
    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;
