
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { getFavoriteListings } from "../actions/getFavoriteListings";

import FavoriteClient from "./FavoriteClient";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
              <div className="pt-[7.5rem]">
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
              <div className="pt-[7.5rem]">
      <FavoriteClient
        listings={listings}
        currentUser={currentUser}
      />
    </div>
    </ClientOnly>
  );
}
 
export default ListingPage;
