'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


import ClientOnly from "./ClientOnly";
import { User } from "@prisma/client";
import { useState } from "react";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
  listingId: string
    currentUser: User
}

const HeartButton: React.FC<HeartButtonProps> = ({ 
  listingId,
  currentUser
}) => {

const {hasFavorited, toggleFavorite} = useFavorite({listingId, currentUser});

  return (
    <div 
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={
          hasFavorited ? 'fill-purple-500' : 'fill-neutral-500/70'
        }
      />
    </div>
   );
}
 
export default HeartButton;
