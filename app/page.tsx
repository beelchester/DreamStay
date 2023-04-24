import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "./components/ClientOnly";
import getListings, { IListingsParams } from "./actions/getListings";
import ListingCard from "./components/inputs/listings/ListingCard";
import { useSelector } from "react-redux";
import getCurrentUser from "./actions/getCurrentUser";

interface HomeProps {
        searchParams: IListingsParams
    }

const Home = async ({searchParams}: HomeProps) => {

const listings = await getListings(searchParams);
const currentUser = await getCurrentUser();

if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div 
          className="
            pt-[13.5rem]
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
            pb-5
          "
        >
        {listings.map((listing) => (
            <ListingCard
                key={listing.id}
                data={listing}
                currentUser = {currentUser}
            />
        )
        )}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;
